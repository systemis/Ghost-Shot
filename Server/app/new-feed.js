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
    
    get(req, cb){
        if(!req.isAuthenticated()) return cb(null, []);
        
        var clientInfo  = req.user; 
        var clientId    = clientInfo.id;
        var followings  = [...clientInfo.following, clientInfo.username]; 
        var posts       = [];
        
        if(followings.length <= 0) return cb(null, []);
        
        // Get all posts of followings;
        followings.forEach((following, index, arr) => {
        })
        
        var index = 0;
        var get = () => {
            if(index >= followings.length){
                if(posts.length <= 0) {
                    return cb(null, []);
                }
        
                this.sortByDate(posts, () => {
                    // post.splice(position, posts.length);
                    return cb(null, posts);
                });
            }else{
                const following = followings[index];
                userDM.findUserByName(following, (error, result) => {
                    if(!error){
                        result.posts.forEach((post, index2, arr2) => {
                            postDM.findById(post, (err, rs) => {
                                if(!err){
                                    posts.push(rs);
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