module.exports = app => {
    const path = require('path');
    const routeK1 = (req, res) => {
        console.log(req.user);
        if(!req.isAuthenticated()) {return res.redirect('/sign-in');}
        return res.sendFile(path.resolve(__dirname, '../build/index.html'));
    }

    const routeK2 = (req, res) => {
        if(req.isAuthenticated()) {return res.redirect('/home');}
        return res.sendFile(path.resolve(__dirname, '../build/index.html'));
    }

    app.get('/home', routeK1);
    app.get('/sign-in', routeK2);
    app.get('/sign-up', routeK2);
}