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
const newFeedMG      = require('./Server/app/new-feed.js');
const socketMG       = require('./Server/app/socket/index.js');
const isEmail        = require('validator/lib/isEmail');
const app            = express();
const server         = http.Server(app);


app.use(express.static('build'));
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));
app.use(bodyParser.json({limit: `50mb`}));
app.use(bodyParser.urlencoded({limit: `50mb`, extended: true}));
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
require('./Server/app/search.js')(app);
require('./Server/route.js')(app);
require('./Server/app/user.js')(app);

// custom socket here .
new socketMG(server);

const PORT   = process.env.PORT || 3200;
server.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
})

function testThuatToan(){
    var arr = [[4, 233, 23, 787923, 32, 218987, 432, 390], [98923, 43247823, 7689], [89839, 47792], [67839]];
    var big = arr[0][0];
    var indexA = 0;
    
    var minHieu = () => {
        var min = big - arr[i][j];
        for(var i = 0, length = arr.length; i < length; i++){
            for(var j = 0; j < arr[i].length; j++){
                // if(big - arr[i][j] )
            }
        }
    }

    var get = () => {
        for(var i = 0, length = arr.length; i < length; i++){
            for(var j = 0; j < arr[i].length; j++){
                if(big < arr[i][j]){
                    let pg = big;
                    big = arr[i][j];
                    arr[i][j] = pg;
                }
            }
        }
    }

    get();
    console.log(big);
}

// function getInfo(){
//     userDM.findUserByName(`systemis`, (error, result) => {
//         return result;
//     })
// }

// async function make(){
//     await getInfo();
//     console.log('Geting');
// }

// function make(){
//     userDM.findUserByName('systemis')
//         .then((result) => {
//             console.log('Success: ' + result);
//         })
//         .catch((error) => {
//             console.log(error);
//         })
// }