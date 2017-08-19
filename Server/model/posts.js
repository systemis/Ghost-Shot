const pool = require('../config/database.js');
const tableName = `PostsData`
class postDM{
    constructor(){
        pool.query('CREATE TABLE IF NOT EXISTS`PostsData` ( `id` VARCHAR(200) NOT NULL , `user` TEXT NOT NULL , `status` TEXT NOT NULL , `photos` TEXT NOT NULL , `comments` TEXT NULL, `likes` TEXT NULL, `date` TEXT NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB CHARSET=utf8 COLLATE utf8_general_ci', (err, result) => {
            console.log(`Error when create table ${tableName}: ${err}`);
        })
    }

    dropTable(){
        pool.query(`DROP TABLE ${tableName}`, (err, result) => {
            console.log(`Error when drop table ${tableName}: ${err}`);
        })
    }
}

module.exports = new postDM();