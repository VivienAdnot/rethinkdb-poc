import express from 'express';
import bodyParser from 'body-parser';
import rethinkdb from 'rethinkdb';
import { run } from './bootstrap';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => res.send({ serverLive: true }));

rethinkdb.connect({ host: 'localhost', port: 28015 }, (error, connection) => {

    if (error) throw error;
    global.connection = connection;

    run(app);

    app.listen(8089);
    console.log('server listening on 8089, rdb connected on 28015');

});
