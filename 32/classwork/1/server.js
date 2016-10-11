﻿var express = require('express');
var http = require('http');
var app = express();

var port = process.env.port || 1337;

// подключение модуля cookie-parser
var cookieParser = require('cookie-parser');

// если cookieParser принимает в качестве аргумента строку, она используется 
// для генерации  подписи cookie
app.use(cookieParser('this is a secret!!!'))

app.all('*', function (req, res) {

    res.cookie('cookie', `${req.url}`, {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        // создание cookie с подписью 
        signed: true
    })

    // доступ к подписанным cookie через свойство req.signedCookies
    res.end(req.signedCookies.cookie);

    console.log('Cookies: ', req.signedCookies)
})

app.listen(port, function () {
    console.log('app running on port ' + port);
})