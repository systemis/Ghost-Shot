'use strict'

const express        = require('express');
const expresssession = require('express-session');
const cookieParser   = require('cookie-parser');
const bodyParser     = require('body-parser');
const morgan         = require('morgan');
const path           = require('path');
const http           = require('http');
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

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '.', 'build/index.html'))
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Server listeinng on: ${PORT}`);
})