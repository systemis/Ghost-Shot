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
    console.log(`Server is listening on ${PORT}`);
})