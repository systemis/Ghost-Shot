const userDM = require('../model/user.js');
const postDM = require('../model/posts.js');
class NewFeedManager{
    sortByDate(posts, cb){
        // Sort by bundle sort arthorithnm
        console.log(posts);
        for(var i = 0, length = posts.length; i < length; i++){
            for(var j = length - 1; j > i; j--){
                var date1 = posts[j].date;
                var date2 = posts[j - 1].date;
                
                if(date1 > date2){
                    var tg   = posts[j];
                    posts[j] = posts[j - 1];
                    posts[j - 1] = tg;
                }
                
                if(i === length - 1){
                }
            }
        }
        
        return cb(null, posts);
    }
    
    get(req, res, cb){
        if(!req.isAuthenticated()) return cb(null, []);
        
        var clientInfo  = req.user; 
        var clientId    = clientInfo.id;
        var followings  = clientInfo.following; //['systemis', 'numberjonhpham'];
        var posts       = [];

        console.log(clientInfo);
        if(followings.length <= 0) return cb(null, []);
        
        // Get all posts of followings;
        followings.map((following, index) => {
            userDM.findUserByName(following, (error, result) => {
                if(!error){
                    result.posts.map((post, index2) => {
                        postDM.findById(post, (err, rs) => {
                            if(!err){
                                // console.log(result.posts);
                                posts.push(rs);
                            }
    
                            // console.log(rs);
                            if(index === followings.length - 1 && index2 === result.posts.length - 1){
                                console.log(`Sort by date task 1`);
                                this.sortByDate(posts, cb);
                            }
                        });
                    })
                    
                    if(result.posts.length < 0 && index === followings.length - 1) {
                        console.log(`Sort by date task 2`);
                        this.sortByDate(posts, cb);
                    }
                }
            })
        })
    }
}

module.exports = new NewFeedManager();