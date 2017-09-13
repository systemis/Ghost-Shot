module.exports = app => {
    app.post('/app/isAuthenticated/', (req, res) => {
        res.send(req.isAuthenticated());
    })

    app.post(`/get/info-app`, (req, res) => {
        res.send('Xin chao den voi app photo cua systemis ');
    })
}