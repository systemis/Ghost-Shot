module.exports = (app) => {
    const passport         = require('passport');
    const passportLocal    = require('passport-local');
    const passportFb       = require('passport-facebook');
    const passportTwtiiter = require('passport-twitter');
    const userDM           = require('../model/user.js');

    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(new passportLocal.Strategy((username, password, done) => {
        userDM.login(username, password, (err, result) => {
            if(err) return done(err, null);

            const user = {
                username: username,
                email: result.email,
            }

            done(null, user);
        })
    }))

    passport.use(new passportFb.Strategy(
        {
            clientID: '506130339729926',
            clientSecret: '64a37c6a76585faba21ef8d4a8aaa238',
            callbackURL: 'http://localhost:3200/auth/fb',
            profileFields: ['email', 'displayName']
        },
        function(accessToken, refreshToken, profile, done){
            const ps = profile._json;
            ps.password = 'euw8yjbmcsdbjisadknsjknvjk'
            ps.username = ps.name;
            delete ps.name;
            userDM.findOrCreate(ps, (err, result) => {
                return done(null, result);
            })
        }
    ))

    passport.use(new passportTwtiiter.Strategy(
        {
            consumerKey: 'JEwImG5MD0KEORcqFQgrQvcbU',
            consumerSecret: 'VF6Hq1G4lAj8Rh2HPt1MD4oDTRJTe7eGwzZiY4q8pLOhehD01E',
            callbackURL: 'http://localhost:3200/auth/twitter'
        },
        function(accessToken, refreshToken, profile, done){
            profile = profile._json;
            console.log(profile);
            const ps = {
                id: profile.id,
                username: profile.screen_name
            };
            userDM.findOrCreate(ps, (err, result) => {
                return done(null, result);
            })
        }))

    passport.deserializeUser((user, done) => {
        done(null, user);
    })

    passport.serializeUser((user, done) => {
        done(null, user);
    })

    app.post(`/sign-up`, (req, res) => {
        const bundle = req.body.bundle;
        bundle.id     = '';
        bundle.avatar = 'https://gitlab.com/uploads/-/system/user/avatar/56386/tt_avatar_small.jpg';
        userDM.newUser(bundle, (err, result) => {
            return res.send({err, result});
        })
    })

    app.post('/sign-in', passport.authenticate('local', {
        successRedirect: '/home',
        failureRedirect: '/sign-in'
    }));

    app.get('/login/fb', passport.authenticate('facebook', {scope: ['email']}));
    app.get('/auth/fb', passport.authenticate('facebook', 
    {
         successRedirect: '/home', 
         failureRedirect: '/sign-in',
    }));

    app.get('/login/twitter', passport.authenticate('twitter', {scope: ['email']}));
    app.get('/auth/twitter' , passport.authenticate('twitter', 
    {
         successRedirect: '/home', 
         failureRedirect: '/sign-in',
    }));
}