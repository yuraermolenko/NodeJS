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
var userHandler = require('./username_handler');
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



// авторизация пользователя 
app.post('/login', function (req, res) {

    var isValidPass = '';
    var isValidName = '';

    //----------------------------------------------
    // проверить имя пользователя 
    var checkNameQuery = userHandler.checkUsername(req.body.username);

    // обработка ошибок проверки имени пользователя 
    checkNameQuery.on('end', function () {
        if (isValidName != true) {
            res.status(404).send('wrong username');
        }
    })

    // обработка успешной проверки имени пользователя
    checkNameQuery.on('result', function (rows) {

        isValidName = true;

        // проверить пароль
        var checkPassQuery = passwordHandler.checkPassword(req.body.password);

        // обработка успешной проверки пароля
        checkPassQuery.on('result', function () {

            isValidPass = true;

            // залогинить пользователя
            if (isValidPass && isValidName) {

                req.session.isLoggedIn = true;
                req.session.userName = req.body.username;

                sessionStore.set(req.sessionID, req.session, function (err) {
                    if (err) {
                        console.log(err)
                        return;
                    } else {
                        console.log('session saved!');
                        res.send('user found')
                    }
                })
            }
        });
        // обработка ошибок проверки пароля 
        checkPassQuery.on('end', function () {
            if (isValidPass != true) {
                res.status(404).send('wrong password');
            }
        })


    })
    //----------------------------------------------

}); 


app.listen(port, function () {
    console.log('app running on port ' + port);
})