module.exports = (app) => {
    const passport      = require('passport');
    const passportLocal = require('passport-local');
    const userDM        = require('../model/user.js');

    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(new passportLocal.Strategy((username, password, done) => {
        done(null, {username, password});
        
    }))

    passport.deserializeUser((user, done) => {
        done(null, user);
    })

    passport.serializeUser((user, done) => {
        const username = user.username;
        const password = user.password;
        userDM.login(username, password, (err, result) => {
            if(err) return done(err, null);

            const user = {
                username: username,
                email: result.email,
            }

            done(null, user);
        })
    })

    app.post('/sign-in', passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/sign-in'
    }));

    app.post(`/sign-up`, (req, res) => {
        const bundle = req.body.bundle;

        bundle.id     = '';
        bundle.avatar = 'https://gitlab.com/uploads/-/system/user/avatar/56386/tt_avatar_small.jpg';
        userDM.newUser(bundle, (err, result) => {
            return res.send({err, result});
        })
    })
}