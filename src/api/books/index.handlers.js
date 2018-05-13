import AUTHORS_TABLE_NAME from './index.const';

exports.getAuthors = (req, res, next) =>

    global.rethinkdb
        .table(AUTHORS_TABLE_NAME)
        .run()
        .then((result) => {

            res.data = result;
            next();

        })
        .catch(next);

exports.getAuthorsByName = (req, res, next) =>

    global.rethinkdb
        .table(AUTHORS_TABLE_NAME)
        .filter(global.rethinkdb.row('name').eq(req.params.name))
        .run()
        .then((result) => {

            res.data = result;
            next();

        })
        .catch(next);

exports.getActiveAuthors = (req, res, next) =>

    global.rethinkdb
        .table(AUTHORS_TABLE_NAME)
        .filter(global.rethinkdb.row('posts').count().gt(2))
        .run()
        .then((result) => {

            res.data = result;
            next();

        })
        .catch(next);

exports.getAuthorsById = (req, res, next) =>

    global.rethinkdb
        .table(AUTHORS_TABLE_NAME)
        .get(req.params.id)
        .run()
        .then((result) => {

            res.data = result;
            next();

        })
        .catch(next);

exports.postAuthors = (req, res, next) =>

    global.rethinkdb
        .table(AUTHORS_TABLE_NAME)
        .insert(req.body)
        .run()
        .then((result) => {

            res.data = result;
            next();

        })
        .catch(next);

exports.putAuthor = (req, res, next) =>

    global.rethinkdb
        .table(AUTHORS_TABLE_NAME)
        .get(req.params.id)
        .update(req.body)
        .run()
        .then((result) => {

            res.data = result;
            next();

        })
        .catch(next);
