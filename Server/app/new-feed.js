const userDM = require('../model/user.js');
const postDM = require('../model/posts.js');
class NewFeedManager{
    sortByDate(posts, cb){
        // Sort by bundle sort arthorithnm
        for(var i = 0, length = posts.length; i < length - 1; i++){
            for(var j = length - 1; j > i; j--){
                var date1 = Date.parse(posts[j].date);
                var date2 = Date.parse(posts[j - 1].date);

                if(date1 > date2){
                    var tg   = posts[j];
                    posts[j] = posts[j - 1];
                    posts[j - 1] = tg;
                }
            }
        }

        cb();
    }
    
    get(req, cb, position = new Date().toLocaleString()){
        if(!req.isAuthenticated()) return cb(null, []);
        
        // Config data to get 
        var lengthPost  = 0;
        var lastTime    = 0;
        var clientInfo  = req.user; 
        var clientId    = clientInfo.id;
        var followings  = [...clientInfo.following, clientInfo.username]; 
        var posts       = [];
        
        if(followings.length <= 0) return cb(null, []);
        
        // Get all posts of followings;
        followings.forEach((following, index, arr) => {
        })
        
        var index = 0;
        
        var runAl = () => {
            console.log(lengthPost);

            if(posts.length <= 0) {
                return cb(null, []);
            }
    
            this.sortByDate(posts, () => {
                // post.splice(position, posts.length);
                return cb(null, posts);
            });
        }
        
        var get = () => {
            if(index >= followings.length){
                runAl();
            }else{
                const following = followings[index];
                userDM.findUserByName(following, (error, result) => {
                    if(!error){
                        result.posts.forEach((post, index2, arr2) => {
                            postDM.findById(post, (err, rs) => {
                                if(!err){
                                    if(Date.parse(rs.date) <= Date.parse(position)){
                                        posts.push(rs);
                                        lengthPost += 1;
                                    }
                                }
    
                                if(index2 === result.posts.length - 1){
                                    index++;
                                    get();
                                }
                            });
                        })
    
                        if(result.posts.length <= 0){
                            index++;
                            get();
                        }
                    }else{
                        index++;
                        get();
                    }
                })
            }
        }

        get();
    }
}

module.exports = new NewFeedManager();