const userDM    = require('../model/user.js');
const newFeedMG = require('./new-feed.js');
module.exports = app => {
    app.post(`/client/info/get`, (req, res) => {
        if(!req.isAuthenticated()) return res.send({err: 'Not login', result: null});
        newFeedMG.get(req, res, (error, posts) => {
            console.log(posts);
            res.send({err: null, result: req.user});
        })
    })

    app.post(`/user/isEdit/:userId`, (req, res) => {
        const userId = req.params.userId;
        if(!req.isAuthenticated()) return res.send(false);
        if(userId !== req.user.id) return res.send(false);

        res.send(true);
    })
    
    app.post(`/user/info/get/username/:username`, (req, res) => {
        const userName = req.params.username;

        userDM.findUserByName(userName, (error, result) => {
            if(error) return res.send({err: error, result: null});
            delete result['password'];
            res.send({err: error, result: result});
        })
    })

    app.post(`/user/follow-or-unfollow/:username`, (req, res) => {
        if(!req.isAuthenticated()) {
            return res.send({err: 'Not login', result: null});
        }

        const username = req.params.username;
        const follower = req.user.username;

        userDM.followOrUnfollow(follower, username, (error, result) => {
            req.user.following = result
            res.send({err: error, result: result})
        });
    })
}