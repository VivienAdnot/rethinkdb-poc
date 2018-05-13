import { AUTHORS_DATABASE_NAME, AUTHORS_TABLE_NAME } from './index.const';

const onChanges = () => {

    global.rethinkdb
        .db(AUTHORS_DATABASE_NAME)
        .table(AUTHORS_TABLE_NAME)
        .changes()
        .run((err, change) => {

            change.each((changeErr, { new_val }) => {

                console.log('===== CHANGE DETECTED ON AUTHORS =====');
                console.log(JSON.stringify(new_val));

            });

        });

};

const listenAuthorEvents = () => {

    onChanges();

};

module.exports = {
    listenAuthorEvents
};
