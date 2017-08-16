module.exports = app => {
    app.post('/app/isAuthenticated/', (req, res) => {
        res.send(req.isAuthenticated());
    })
}