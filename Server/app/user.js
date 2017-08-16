const userDM = require('../model/user.js');
module.exports = app => {
    app.post(`/client/info/get`, (req, res) => {
        if(!req.isAuthenticated()) return res.send({err: 'Not login', result: null});

        const clientId = req.user.id;
        req.user.follower  = JSON.parse(req.user.follower);
        req.user.following = JSON.parse(req.user.following);
        req.user.posts     = JSON.parse(req.user.posts);
        res.send({err: null, result: req.user});
    })

    app.post(`/user/info/get/username/:username`, (req, res) => {
        const userName = req.params.username;

        userDM.findUserByName(userName, (error, result) => {
            if(error) return res.send({err: error, result: null});

            delete result['password'];
            result.follower  = JSON.parse(result.follower);
            result.following = JSON.parse(result.following);
            result.posts     = JSON.parse(result.posts);
            res.send({err: error, result: result});
        })
    })
}