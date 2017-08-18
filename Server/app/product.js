module.exports = app => {
    app.post(`/new/post/`, (req, res) => {
        console.log(req.user);
        console.log(req.body);
    })
}