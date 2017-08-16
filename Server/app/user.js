const userDM = require('../model/user.js');
module.exports = app => {
    app.post(`/client/info/get`, (req, res) => {
        if(!req.isAuthenticated()) return res.send({err: 'Not login', result: null});
        const clientId     = req.user.id;
        res.send({err: null, result: req.user});
    })

    app.post(`/user/isEdit/:userId`, (req, res) => {
        const userId = req.params.userId;
        if(!req.isAuthenticated()) return res.send(false);
        if(userId !== req.user.id) return res.send(false);

        console.log(`Edit`);
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
}