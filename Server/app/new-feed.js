const userDM = require('../model/user.js');
const postDM = require('../model/posts.js');
module.exports = app => {
    app.post('/new-feed/:position', (req, res) => {
        // if(!req.isAuthenticated()) return res.send({error: 'Not login', result: null});

        // var clientInfo = req.user; 
        // var clientId   = clientInfo.id;
        var followings  = ['systemis', 'numberjonhpham'];
        var posts       = [];
        var sortByDate  = () => {
            for(var i = 0, length = posts.length; i < length; i++){
                for(var j = length - 1; j > i; j--){
                    var date1 = posts[j].date;
                    var date2 = posts[j - 1].date;
                    
                    // console.log(posts[j].date);
                    // console.log(date1);
                    // console.log(date2);
                    if(date1 < date2){
                        var tg   = posts[j];
                        posts[j] = posts[j - 1];
                        posts[j - 1] = tg;
                    }
                }
            }

            console.log(posts);
            res.send({error: null, result: []});
        }        
        
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
                                sortByDate();
                            }
                        });
                    })

                    if(result.posts.length < 0 && index === followings.length - 1) {
                        sortByDate();
                    }
                }
            })
        })
    })
}