const postsDM = require('../model/posts.js');
module.exports = app => {
    app.post(`/new/post/`, (req, res) => {
        console.log(req.user);
        console.log(req.body);
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

        console.log(user);
        console.log(post);
        postsDM.newPost(bundle, (error, result) => {
            console.log(error);
            console.log(result);

            res.send({err: error, result: result});
        })
    })
}