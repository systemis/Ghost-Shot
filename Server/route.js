module.exports = app => {
    const path = require('path');
    const routeK0 = (req, res) => res.sendFile(path.resolve(__dirname, '../build/index.html'));
    const routeK1 = (req, res) => {
        console.log('User info: ' + JSON.stringify(req.user));
        if(!req.isAuthenticated()) {return res.redirect('/sign-in');}
        return res.sendFile(path.resolve(__dirname, '../build/index.html'));
    }

    const routeK2 = (req, res) => {
        if(req.isAuthenticated()) {return res.redirect('/home');}
        return res.sendFile(path.resolve(__dirname, '../build/index.html'));
    }

    app.get('/home', routeK1);
    
    app.get('/user/:username', routeK0);
    app.get('/post/:postId', routeK0);
    
    app.get('/sign-in', routeK2);
    app.get('/sign-up', routeK2);
}