const pool = require('../config/database.js');
const tableName = 'UserData';
class userDM{
    constructor(){
        pool.query('CREATE TABLE IF NOT EXISTS`'+tableName+'` ( `id` VARCHAR(200) NOT NULL , `email` TEXT NULL , `username` TEXT NULL , `password` TEXT NOT NULL , `phone` TEXT NULL , `avatar` TEXT NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB CHARSET=utf8 COLLATE utf8_general_ci', (err, result) => {
            console.log(`Error when create table ${tableName}: ${err}`);
        })
    }

    newUser(bundle, fn){
        const existsEmailError = () => fn('Email already exists!', null);
        const existsNamelError = () => fn('Username already exists!', null);
        const createTable = id => {
            bundle.id = id;
            pool.query(`INSERT INTO ${tableName} SET ?`, bundle, (err, result) => {
                console.log(err);
                fn(err, result);
            });
        }

        this.checkAlreadyEmail(bundle.email, rs => {
            if(rs) return existsEmailError();
            this.checkAlreadyUserName(bundle.username, rs2 => {
                if(rs2) return existsNamelError();
                this.randomId(bundle.id, id => {
                    createTable(id);
                })
            })
        })
    }

    findOrCreate(bundle, fn){
        const createTable = id => {
            bundle.id = id;
            pool.query(`INSERT INTO ${tableName} SET ?`, bundle, (err, result) => {
                console.log(err);
                fn(err, result);
            });
        }

        this.findUserByName(bundle.username, (error, result) => {
            if(!error) return fn(null, result);
            this.randomId(bundle.id, id => {
                createTable(id);
            })
        })
    }


    findUserById(id, fn){
        pool.query(`SELECT * FROM ${tableName} WHERE id = ?`, [id], (err, result) => {
            if(result.length <= 0) return fn('Not exists', null);
            return fn(err, result[0]);
        });
    }
    
    findUserByEmail(email, fn){
        pool.query(`SELECT * FROM ${tableName} WHERE email = ?`, [email], (err, result) => {
            if(result.length <= 0) return fn('Not exists', null);
            return fn(err, result[0]);
        });
    }

    findUserByName(username, fn){
        pool.query(`SELECT * FROM ${tableName} WHERE username = ?`, [username], (err, result) => {
            if(result.length <= 0) return fn('Not exists', null);
            return fn(err, result[0]);
        });
    }

    login(username, password, fn){
        this.findUserByName(username, (err, result) => {
            if(err) return fn('User not already exists', null);
            if(password !== result.password) return fn('Password is not correct!', null);

            fn(null, result);
        })
    }
    
    randomId(defaultId, fn){
        var isAlreadyId = false
        var randomId    = () => {
            defaultId = Math.floor((Math.random() * 100000) + 1).toString();
        }


        if(!defaultId) {randomId();}
        do{
            this.checkAlreadyId(defaultId, bool => {
                isAlreadyId = bool;
                if(!isAlreadyId){
                    fn(defaultId);
                }
            })

            randomId();
        }while(isAlreadyId)
    }

    checkAlreadyId(id, fn){
        pool.query(`SELECT * FROM ${tableName} WHERE id = ?`, [id], (err, result) => {
            if(err || result.length <= 0){
                return fn(false);
            }

            return fn(true);
        })
    }

    checkAlreadyEmail(email, fn){
        pool.query(`SELECT * FROM ${tableName} WHERE email = ?`, [email], (err, result) => {
            if(err || result.length <= 0){
                return fn(false);
            }

            return fn(true);
        })
    }

    checkAlreadyUserName(username, fn){
        pool.query(`SELECT * FROM ${tableName} WHERE username = ?`, [username], (err, result) => {
            if(err || result.length <= 0){
                return fn(false);
            }

            return fn(true);
        })
    }

    dropTable(fn){
        pool.query(`DROP TABLE ${tableName}`, (err, result) => {
            fn(err, result);
        })
    }
}

module.exports = new userDM();