var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser'); 

var port = process.env.port || 1337;
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(function (req, res, next) {
    console.log(`url: ${req.url}`);
    console.log(`method: ${req.method}`);
    next();
});
app.get('/', function (req, res) {
    res.redirect('/test');
});
app.get('/test', function (req, res) {
    res.sendFile(path.join(__dirname, '/public/test.html'));
});

app.post('/test', function (req, res) {
    var data = req.body.data; 
    console.log(`POST request to ${req.url} : ${data}`);
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(data);
});
app.use(function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});
app.listen(port, function () {
    console.log('App listening on port ' + port);
});