const pool = require('../config/database.js');
const tableName = 'UserData';
class userDM{
    constructor(){
        pool.query('CREATE TABLE IF NOT EXISTS`'+tableName+'` ( `id` VARCHAR(200) NOT NULL , `email` TEXT NULL , `username` TEXT NULL , `password` TEXT NULL , `phone` TEXT NULL , `avatar` TEXT NOT NULL, `follower` TEXT NULL, `following` TEXT NULL , `posts` TEXT NULL, `description` TEXT NULL, PRIMARY KEY (`id`)) ENGINE = InnoDB CHARSET=utf8 COLLATE utf8_general_ci', (err, result) => {
            console.log(`Error when create table ${tableName}: ${err}`);
        })
    }

    newUser(bundle, fn){
        const existsEmailError = () => fn('Email already exists!', null);
        const existsNamelError = () => fn('Username already exists!', null);
        const newUser = id => {
            bundle.id = id;
            bundle.follower  = `[]`;
            bundle.following = `[]`;
            bundle.posts     = `[]`;
            pool.query(`INSERT INTO ${tableName} SET ?`, bundle, (err, result) => {
                console.log('Error when new user with auth local: ' + err);
                fn(err, result);
            });
        }

        this.findUserByEmail(bundle.email, (error, result) => {
            if(!error) return existsEmailError();
            this.findUserByName(bundle.username, (err, rs) => {
                if(!err) return existsNamelError();
                bundle.id = Math.floor((Math.random() * 100000) + 1).toString();
                this.randomId(bundle.id, id => {
                    newUser(id);
                })
            })
        })
    }

    getAll(fn){
        pool.query(`SELECT * FROM ${tableName}`, (error, result) => {
            return fn(error, result);
        })
    }

    findOrCreate(bundle, fn){
        const newUser = id => {
            bundle.id = id;
            bundle.follower  = `[]`;
            bundle.following = `[]`;
            bundle.posts     = `[]`;
            pool.query(`INSERT INTO ${tableName} SET ?`, bundle, (err, result) => {
                if(err) {
                    console.log(err);
                    return fn(err, null);
                }

                this.findUserById(id, (error, rs) => {
                    delete rs['password'];
                    fn(error, rs);
                })
            });
        }

        this.findUserByName(bundle.username, (error, result) => {
            if(!error) {
                delete result['password'];
                return fn(null, result);
            }

            this.randomId(bundle.id, id => {
                newUser(id);
            })
        })
    }

    addNewPost(id, postId, fn){
        this.findUserById(id, (error, result) => {
            if(error) return fn(error, null);

            var posts = result.posts;
            posts.push(postId);
            posts = JSON.stringify(posts);
            pool.query(`UPDATE ${tableName} SET posts = ? WHERE id = ?`, [posts, id], (err, rs) => {
                return fn(err, rs);
            })
        })
    }


    // -------------------------> Find signle account 

    findUserById(id, fn){
        pool.query(`SELECT * FROM ${tableName} WHERE id = ?`, [id], (err, result) => {
            if(result.length <= 0) return fn('Not exists', null);
            result[0].follower  = JSON.parse(result[0].follower);
            result[0].following = JSON.parse(result[0].following);
            result[0].posts     = JSON.parse(result[0].posts);
            return fn(err, result[0]);
        });
    }
    
    findUserByEmail(email, fn){
        pool.query(`SELECT * FROM ${tableName} WHERE email = ?`, [email], (err, result) => {
            if(result.length <= 0) return fn('Not exists', null);
            result[0].follower  = JSON.parse(result[0].follower);
            result[0].following = JSON.parse(result[0].following);
            result[0].posts     = JSON.parse(result[0].posts);
            return fn(err, result[0]);
        });
    }

    findUserByName(username, fn){
        pool.query(`SELECT * FROM ${tableName} WHERE username = ?`, [username], (err, result) => {
            if(err || result.length <= 0) return fn('Not exists', null);
            result[0].follower  = JSON.parse(result[0].follower);
            result[0].following = JSON.parse(result[0].following);
            result[0].posts     = JSON.parse(result[0].posts);
            return fn(err, result[0]);
        });
    }

    // ----------------------------> Not signle - for many account 
    findUsersByName(keyWord, fn){
        var data  = [];
        this.getAll((error, result) => {
            if(error || result.length < 0) {
                return fn({error: null, result: []});
            }

            result.map((item, index) => {
                if(item.username.indexOf(keyWord) >= 0){
                    item.following = JSON.parse(item.following);
                    item.follower  = JSON.parse(item.follower);
                    item.posts     = JSON.parse(item.posts);
                
                    data.push(item);
                }
    
                if(index === result.length - 1){
                    console.log(`Get users by keyword ${data.length}`);
                    return fn(null, data);
                }
            })
        })
    }

    followOrUnfollow(usFollower, usBeFollow, fn){
        var setFOF = (fofChoice, fof, forDH, username, cb) => {
            var isAdd = -1;
            for(var i = 0, length = fof.length; i < length; i++) {
                if(fof[i] === forDH){
                    isAdd = i;
                    i = length;
                }
            }

            if(isAdd !== -1){
                fof.splice(isAdd, 1);
            }else{
                fof.push(forDH);
            }

            fof = JSON.stringify(fof);
            pool.query(`UPDATE ${tableName} SET ${fofChoice} = ? WHERE username = ?`, [fof, username], (error, result) => {
                if(error) return fn(error, null);
                
                cb(JSON.parse(fof));
            })
        }
        
        this.findUserByName(usBeFollow, (error, result) => {
            if(error) return fn(error, null);
            setFOF('follower', result.follower, usFollower, usBeFollow, fof1 => {
            })
        })
        
        this.findUserByName(usFollower, (err, rs) => {
            setFOF('following', rs.following, usBeFollow, usFollower,  fof2 => {
                return fn(null, fof2);
            }); 
        });
    }

    login(username, password, fn){
        this.findUserByName(username, (err, result) => {
            if(err) return fn('User not already exists', null);
            if(password !== result.password) return fn('Password is not correct!', null);

            delete result['password'];
            fn(null, result);
        })
    }
    
    randomId(defaultId, fn){
        var isAlreadyId = false
        do{
            this.checkAlreadyId(defaultId, bool => {
                isAlreadyId = bool;
                if(!bool){
                    return fn(defaultId);
                }else{
                    defaultId = Math.floor((Math.random() * 100000) + 1).toString();
                }
            })
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

    dropTable(fn){
        pool.query(`DROP TABLE ${tableName}`, (err, result) => {
            fn(err, result);
        })
    }
}

module.exports = new userDM();