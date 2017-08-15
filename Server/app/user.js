const userDM = require('../model/user.js');
module.exports = app => {
    app.post(`/client/info/get`, (req, res) => {
        if(!req.isAuthenticated()) return res.send({err: 'Not login', result: null});

        const clientId = req.user.id;
        userDM.findUserById(clientId, (err, result) => {
            return res.send({err: err, result: result});
        })
    })
}