'use strict'

const express        = require('express');
const expresssession = require('express-session');
const cookieParser   = require('cookie-parser');
const bodyParser     = require('body-parser');
const morgan         = require('morgan');
const path           = require('path');
const http           = require('http');
const userDM         = require('./Server/model/user.js');
const app            = express();
const server         = http.Server(app);


app.use(express.static('build'));
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(expresssession({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))

require('./Server/app/auth.js')(app);
app.get('/sign-in', (req, res) => {
    res.sendFile(path.resolve(__dirname, '.', 'build/index.html'))
});

app.get('/sign-up', (req, res) => {
    console.log('d');
    res.sendFile(path.resolve(__dirname, '.', 'build/index.html'))
});

app.get('/home', (req, res) => {
    console.log('d' + req.user);
    res.send(req.isAuthenticated() + ' ' + req.user);
})

const PORT = process.env.PORT || 3200;
server.listen(PORT, () => {
    console.log(`Server listeinng on: ${PORT}`);
    // userDM.newUser({id: '', email: 'sss', username: 'sysstemis', password: 'ddd', avatar: 'ddd'}, (err, result) => {
    //     console.log(err);
    // });

    // userDM.dropTable((result, err) => console.log(result));
})