import rethinkdb from 'rethinkdb';

exports.getAuthors = (req, res) =>

    rethinkdb.db('test').table('authors').run(global.connection, (error, cursor) => {

        if (error) throw error;

        cursor.toArray((err, result) => {

            if (err) throw err;
            res.send(result);

        });

    });

exports.getAuthorsByName = (req, res) =>

    rethinkdb.table('authors').filter(rethinkdb.row('name').eq(req.params.name))
        .run(global.connection, (error, cursor) => {

            if (error) throw error;

            cursor.toArray((err, result) => {

                if (err) throw err;
                res.send(result);

            });

        });

exports.getActiveAuthors = (req, res) =>

    rethinkdb.table('authors').filter(rethinkdb.row('posts').count().gt(2))
        .run(global.connection, (error, cursor) => {

            if (error) throw error;

            cursor.toArray((err, result) => {

                if (err) throw err;
                res.send(result);

            });

        });

exports.getAuthorsById = (req, res) =>

    rethinkdb.table('authors').get(req.params.id).run(global.connection, (err, result) => {

        if (err) throw err;
        res.send(result);

    });

exports.postAuthors = (req, res) =>

    rethinkdb.table('authors').insert(req.body).run(global.connection, (err, result) => {

        if (err) throw err;
        res.send(result);

    });

exports.putAuthor = (req, res) =>

    rethinkdb.table('authors')
        .get(req.params.id)
        .update(req.body)
        .run(global.connection, (err, result) => {

            if (err) throw err;
            res.send(result);

        });
