import express from 'express';
import bodyParser from 'body-parser';
import rethinkdb from 'rethinkdb';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

let connection = null;

app.get('/', (req, res) => res.send({ serverLive: true }));

app.get('/authors', (req, res) =>

    rethinkdb.db('test').table('authors').run(connection, (error, cursor) => {

        if (error) throw error;

        cursor.toArray((err, result) => {

            if (err) throw err;
            res.send(result);

        });

    }));

app.get('/authors/:name', (req, res) =>
    rethinkdb.table('authors').filter(rethinkdb.row('name').eq(req.params.name))
        .run(connection, (error, cursor) => {

            if (error) throw error;

            cursor.toArray((err, result) => {

                if (err) throw err;
                res.send(result);

            });

        }));

app.get('/activeAuthors', (req, res) =>
    rethinkdb.table('authors').filter(rethinkdb.row('posts').count().gt(2))
        .run(connection, (error, cursor) => {

            if (error) throw error;

            cursor.toArray((err, result) => {

                if (err) throw err;
                res.send(result);

            });

        }));

app.get('/authorsById/:id', (req, res) =>
    rethinkdb.table('authors').get(req.params.id).run(connection, (err, result) => {

        if (err) throw err;
        res.send(result);

    }));

app.post('/authors', (req, res) =>
    rethinkdb.table('authors').insert(req.body).run(connection, (err, result) => {

        if (err) throw err;
        res.send(result);

    }));

app.put('/authors/:id', (req, res) =>
    rethinkdb.table('authors')
        .get(req.params.id)
        .update(req.body)
        .run(connection, (err, result) => {

            if (err) throw err;
            res.send(result);

        }));

rethinkdb.connect({ host: 'localhost', port: 28015 }, (error, conn) => {

    if (error) throw error;
    connection = conn;

    rethinkdb.table('authors').changes().run(connection, (err, cursor) => {

        if (err) throw err;

        cursor.each((cursorError, row) => {

            if (cursorError) throw cursorError;
            console.log('===== CHANGE DETECTED =====');
            console.log(JSON.stringify(row, null, 2));

        });

    });

    app.listen(8089);
    console.log('server listening on 8089, rdb connected on 28015');

});
