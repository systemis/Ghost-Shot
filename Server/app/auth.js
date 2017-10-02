module.exports = (app) => {
    const envServer        = `http://localhost:3200`
    const passport         = require('passport');
    const passportLocal    = require('passport-local');
    const passportFb       = require('passport-facebook');
    const passportTwtiiter = require('passport-twitter');
    const passportGithub   = require('passport-github2');
    const axios            = require('axios');
    const userDM           = require('../model/user.js');
    const dhAuth = {
        successRedirect: '/home', 
        failureRedirect: '/sign-in',
    }

    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(new passportLocal.Strategy((username, password, done) => {
        userDM.login(username, password, (err, result) => {
            if(err){
                return done(err, null);
            }
            
            return done(null, result);
        })
    }))


    // Config key from admin bill
    const clientIDFaceBook      = `506130339729926`, 
          clientSecretFaceBook  = `64a37c6a76585faba21ef8d4a8aaa238`,
          cbFaceBookAuth        = `${envServer}/auth/fb`,
          
          consumerKeyTwitter    = `JEwImG5MD0KEORcqFQgrQvcbU`, 
          consumerSecretTwitter = `VF6Hq1G4lAj8Rh2HPt1MD4oDTRJTe7eGwzZiY4q8pLOhehD01E`,
          cbTwitterAuth         = `${envServer}/auth/twitter`,
          
          clientIDGitHUb        = `c2adbee4e8bacb7fa9d0`,
          clientSecretGitHub    = `5d8dfb3c7f59922823977b3e23e6c041b33de8c6` 
          cbGitHubAuth          = `${envServer}/auth/github`;
          
    // Login with facebook 
    passport.use(new passportFb.Strategy(
        {
            clientID: clientIDFaceBook,
            clientSecret: clientSecretFaceBook,
            callbackURL: cbFaceBookAuth,
            profileFields: ['email', 'displayName']
        },
        function(accessToken, refreshToken, profile, done){
            profile     = profile._json;
            const ps = {
                id: profile.id, 
                username: profile.name,
                email: profile.email,
                avatar: `https://graph.facebook.com/${profile.id}/picture`
            }

            userDM.findOrCreate(ps, (err, result) => {
                return done(null, result);
            })
        }
    ))

    // Login with twitter 
    passport.use(new passportTwtiiter.Strategy(
        {
            consumerKey: consumerKeyTwitter,
            consumerSecret: consumerSecretTwitter,
            callbackURL: cbTwitterAuth
        },
        function(accessToken, refreshToken, profile, done){
            profile = profile._json;
            const ps = {
                id: profile.id,
                username: profile.screen_name,
                avatar: `https://twitter.com/${profile.screen_name}/profile_image?size=original`
            };
            
            userDM.findOrCreate(ps, (err, result) => {
                return done(null, result);
            })
        }
    ))
    
    // Login with github 
    passport.use(new passportGithub(
        {
            clientID: clientIDGitHUb,
            clientSecret: clientSecretGitHub,
            callbackURL: cbGitHubAuth
            //scope: ['user:email']
        },
        function(accessToken, refreshToken, profile, done){
            profile = profile._json;
            const ps = {
                id: profile.id,
                username: profile.login,
                avatar: profile.avatar_url
            }

            userDM.findOrCreate(ps, (err, result) => {
                return done(null, result);
            })
        }
    ))

    passport.deserializeUser((user, done) => {
        done(null, user);
    })

    passport.serializeUser((user, done) => {
        done(null, user);
    })

    app.post(`/sign-up`, (req, res) => {
        const bundle = req.body.bundle;
        const ps = {
            id: '',
            username: bundle.username,
            email:    bundle.email,
            password: bundle.password,
            avatar:   `https://gitlab.com/uploads/-/system/user/avatar/56386/tt_avatar_small.jpg`
        };
        
        userDM.newUser(ps, (err, result) => {
            return res.send({err, result});
        })
    })

    app.get(`/logout`, (req, res) => {
        if(!req.isAuthenticated()) return res.redirect('/');
        req.logout();
        return res.redirect('/')
    })

    app.post('/sign-in', passport.authenticate('local', dhAuth));

    app.get('/login/fb', passport.authenticate('facebook', {scope: ['email']}));
    app.get('/auth/fb', passport.authenticate('facebook', dhAuth));

    app.get('/login/twitter', passport.authenticate('twitter', {scope: ['email']}));
    app.get('/auth/twitter' , passport.authenticate('twitter', dhAuth));

    app.get('/login/github', passport.authenticate('github', {scope: ['user: email']}));
    app.get('/auth/github', passport.authenticate('github', dhAuth))
}