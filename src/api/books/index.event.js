import rethinkdb from 'rethinkdb';

const onChanges = () => {

    rethinkdb.table('authors').changes().run(global.connection, (err, cursor) => {

        if (err) throw err;

        cursor.each((cursorError, row) => {

            if (cursorError) throw cursorError;
            console.log('===== CHANGE DETECTED ON AUTHORS =====');
            console.log(JSON.stringify(row, null, 2));

        });

    });

};

const listenAuthorEvents = () => {

    onChanges();

};

module.exports = {
    listenAuthorEvents
};
