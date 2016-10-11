var express = require('express');
var app = express();

var port = process.env.port || 1337;

var cookieParser = require('cookie-parser');
var session = require('express-session');

var path = require('path');
var bodyParser = require('body-parser');

var passwordHandler = require('./password_handler');
var signUpHandler = require('./signUpHandler');
var sessionHandler = require('./sessionHandler');

// создание store для сессии 
var sessionStore = sessionHandler.createStore();
// создание сессии 
app.use(cookieParser());
app.use(session({

    secret: 'secret',
    saveUninitialized: true,
    resave: true,
    store: sessionStore
}));



// middleware для обработки данных POST запросов 
var jsonParser = bodyParser.json();
app.use(jsonParser);


// маршрутизация 
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'))
});

// регистрация нового пользователя 
app.post('/signup', function (req, res) {
    var passwordHash = passwordHandler.encryptPassword(req.body.password);

    var newUser = {
        username: req.body.username,
        passwordHash: passwordHash
    }
    console.log(newUser)
    var query = signUpHandler.addUser(newUser);

    query.on('end', function () {
        res.redirect('/');
        console.log('new user registered');
    });

    query.on('error', function (err) {
        console.log('signup error!');
    });
});
app.listen(port, function () {
    console.log('app running on port ' + port);
})