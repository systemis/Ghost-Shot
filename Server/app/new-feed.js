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
    
    get(req, res, position, cb){
        if(!req.isAuthenticated()) return cb(null, []);
        
        var clientInfo  = req.user; 
        var clientId    = clientInfo.id;
        var followings  = [...clientInfo.following, clientInfo.username]; 
        var posts       = [];

        if(followings.length <= 0) return cb(null, []);
        
        // Get all posts of followings;
        followings.map((following, index) => {
            userDM.findUserByName(following, (error, result) => {
                if(!error){
                    result.posts.map((post, index2) => {
                        postDM.findById(post, (err, rs) => {
                            if(!err){
                                posts.push(rs);
                            }
    
                            if(index === followings.length - 1 && index2 === result.posts.length - 1){
                                this.sortByDate(posts, () => {
                                    var data = [];
                                    posts.map((value, index) => {
                                        if(index < position) data.push(value);
                                    })
                                    
                                    cb(null, posts);
                                });
                            }
                        });
                    })
                    
                    if(result.posts.length < 0 && index === followings.length - 1) {
                        this.sortByDate(posts, () => {
                            post.splice(position, posts.length);
                            cb(null, posts);
                        });
                    }
                }
            })
        })
    }
}

module.exports = new NewFeedManager();