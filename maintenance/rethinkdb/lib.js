import rethinkdbdash from 'rethinkdbdash';
import Promise from 'bluebird';
import utils from './utils';
import config from '../../config/config';
import authors from './fixtures-data';

const rethinkdb = rethinkdbdash(config.rethinkdb);

const BOOKSTORE_DATABASE_NAME = 'bookstore';

const dropExistingTable = () => {

    console.log('Check for existing database');

    return rethinkdb
        .dbList()
        .contains(BOOKSTORE_DATABASE_NAME)
        .run()
        .then((databaseExists) => {

            if (databaseExists) {

                console.log('Existing database found. Dropping...');
                return rethinkdb.dbDrop(BOOKSTORE_DATABASE_NAME).run().then(() => {

                    utils.success();

                });

            }

            console.log('No database found');
            return Promise.resolve();

        });

};

const createDatabase = () => {

    console.log(`Creating database ${BOOKSTORE_DATABASE_NAME}`);

    return rethinkdb.dbCreate(BOOKSTORE_DATABASE_NAME).run().then(() => {

        utils.success();

    });

};

const createTables = () => {

    console.log(`Creating tables into ${BOOKSTORE_DATABASE_NAME}`);

    const tables = [
        'authors'
    ];

    return Promise.map(
        tables,
        table => rethinkdb.db(BOOKSTORE_DATABASE_NAME).tableCreate(table).run()
    ).then(() => {

        utils.success();

    });

};

const drainPoolMaster = () => {

    return rethinkdb.getPoolMaster().drain().then(() => {

        utils.success();

    });

};

const insertAuthors = () => {

    console.log('Importing authors fixtures');

    return rethinkdb
        .db(BOOKSTORE_DATABASE_NAME)
        .table('authors')
        .insert(authors)
        .run()
        .then(() => {

            utils.success();

        });

};

module.exports = {
    drainPoolMaster,
    dropExistingTable,
    createDatabase,
    createTables,
    insertAuthors
};
