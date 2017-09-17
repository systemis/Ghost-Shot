module.exports = app => {
    app.post('/app/isAuthenticated/', (req, res) => {
        res.send(req.isAuthenticated());
    })

    app.post(`/get/info-app`, (req, res) => {
        res.send('Wellcome to GhostShot, it is a social network about photo. Systemis FAQ !');
    })
}