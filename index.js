'use strict'

const express        = require('express');
const expresssession = require('express-session');
const cookieParser   = require('cookie-parser');
const bodyParser     = require('body-parser');
const morgan         = require('morgan');
const path           = require('path');
const http           = require('http');
const userDM         = require('./Server/model/user.js');
const postsDM        = require('./Server/model/posts.js');
const app            = express();


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
require('./Server/app/product.js')(app);
require('./Server/app/app.js')(app);
require('./Server/app/image.js')(app);
require('./Server/app/user.js')(app);
require('./Server/app/search.js')(app);
require('./Server/route.js')(app);

const server = http.Server(app);
const PORT   = process.env.PORT || 3200;
server.listen(PORT, () => {
    // console.log(new Date());
    // console.log('2017-09-10T04:26:32.719Z' > '2017-09-10T04:26:49.021Z');
    // console.log(Date.parse('19:02:54, 3/9/2017'));
    // console.log(`Server listeinng on: ${PORT}`);
    // userDM.newUser({id: '', email: 'sss', username: 'sysstemis', password: 'ddd', avatar: 'ddd'}, (err, result) => {
    //     console.log(err);
    // });

    // userDM.dropTable((result, err) => console.log(result));
    // postsDM.dropTable();
    // postsDM.newPost({
    //     status: 'Hello',
    //     photos: [],
    //     date: new Date().toLocaleString()
    // }, (error, result) => {
    //     console.log(error);
    //     console.log(result);
    // })

    // postsDM.findByStatus('Hello', (error, result) => {
    //     console.log(error);
    //     console.log(result);
    // })
    
    // userDM .dropTable((error, result) => console.log(error));
    // postsDM.dropTable((error, result) => console.log(error));

    // userDM.followOrUnfollow('Jobs Pham', 'systemis', (error, result) => {
    //     console.log(error);
    //     console.log(result);
    // })

    // console.log('Sun Sep 10 2017 11:34:30 GMT+0700 (+07)' < 'Sun Sep 10 2017 11:40:44 GMT+0700 (+07)');

    // var posts = [4, 5, 2, 1, 3, -2, 0, 28, 32, 29, 84, 32, 992, 23, 82, 77983, 32647678, 327678324, 43876821, 43782, 73285467, 4376, 232, 345, 9212, 3726663, 66637, 48878231, 4239197364, 8, 7];
    // var length = posts.length;
    // for(var i = 0; i < length - 1; i++){
    //     for(var j = length - 1; j > i; j--){
    //         if(posts[j] < posts[j - 1]){
    //             var tg   = posts[j];
    //             posts[j] = posts[j - 1];
    //             posts[j - 1] = tg;
    //         }
    //     }

    //     if(i === length - 2){
    //         console.log('Return ');
    //         console.log(posts);
    //     }
    // }
})