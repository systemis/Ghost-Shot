const userDM  = require('../model/user.js');
const postsDM = require('../model/posts.js');
module.exports = app => {
    app.post(`/new/post/`, (req, res) => {
        if(!req.isAuthenticated()) return res.send({err: 'Not login', result: null});

        const post   = req.body;
        const user   = req.user;
        const bundle = {
            status: post.status,
            photos: post.photos,
            date: post.date,
            user: {
                id: user.id,
                username: user.username,
                avatar: user.avatar,
            }
        }

        postsDM.newPost(bundle, (error, result) => {
            userDM.findUserById(user.id, (err, rs) => {
                if(!err){
                    user.posts = rs.posts;
                    res.send({err: error, result: result});
                }
            })
        })
    })

    app.post(`/post/get/id/:id`, (req, res) => {
        const postId = req.params.id;
        postsDM.findById(postId, (error, result) => {
            res.send({err: error, result: result});
        })
    })

    app.post(`/post/like-or-unlike/:id`, (req, res) => {
        if(!req.isAuthenticated()) return res.send({err: 'Not login!', result: null});
        
        const postId = req.params.id;
        const user   = {
            id: req.user.id,
            username: req.user.username,
            avatar: req.user.avatar
        }

        postsDM.likeOrUnLike(postId, user, (error, result) => {
            console.log(error);
            console.log(result);
            res.send({err: error, result: result});
        })
    })
}