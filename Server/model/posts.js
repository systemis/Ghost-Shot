const pool = require('../config/database.js');
const tableName = `PostsData`
class postsDM{
    constructor(){
        pool.query('CREATE TABLE IF NOT EXISTS`PostsData` ( `id` VARCHAR(200) NOT NULL , `user` TEXT NOT NULL , `status` TEXT NOT NULL , `photos` TEXT NOT NULL , `comments` TEXT NULL, `likes` TEXT NULL, `date` TEXT NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB CHARSET=utf8 COLLATE utf8_general_ci', (err, result) => {
            console.log(`Error when create table ${tableName}: ${err}`);
        })
    }

    newPost(bundle, fn){
        var bool = false;
        var createNewPost = data => {
            pool.query(`INSERT INTO ${tableName} SET ?`, data, (error, result) => {
                if(error) console.log(error);
                return fn(error, result);
            })
        }

        do{
            bundle.id = Math.floor((Math.random() * 2000) + 1).toString();
            this.findById(bundle.id, (error, result) => {
                if(error){
                    bool = false;         
                    bundle.user     = JSON.stringify(bundle.user);
                    bundle.photos   = JSON.stringify(bundle.photos);
                    bundle.comments = '[]';
                    bundle.likes    = '[]';
                    createNewPost(bundle);
                }else{
                    bool = true;
                }
            })
        }while(bool)
    }

    findById(id, fn){
        pool.query(`SELECT * FROM ${tableName} WHERE id = ?`, [id], (error, result) => {
            if(error || result.length <= 0) return fn('Not exists', null);
            return fn(null, result[0]);
        })
    }

    findByStatus(status, fn){
        pool.query(`SELECT * FROM ${tableName}`, (error, result) => {
            if(error || result.length <= 0) return fn('Not data', null);
            
            var rs = [];
            for(var i = 0, length = result.length; i < length; i++){
                if(result[i].status.indexOf(status) >= 0){
                    rs.push(result[i]);
                }

                if(i === length - 1){
                    return fn(null, rs);
                }
            }
        })
    }

    dropTable(){
        pool.query(`DROP TABLE ${tableName}`, (err, result) => {
            console.log(`Error when drop table ${tableName}: ${err}`);
        })
    }
}

module.exports = new postsDM();