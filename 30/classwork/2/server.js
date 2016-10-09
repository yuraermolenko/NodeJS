var express = require('express');
var path = require('path');

var app = express();

var port = process.env.port || 1337;
app.use(function (req, res, next) {
    console.log(`url: ${req.url}`);
    console.log(`method: ${req.method}`);
    next();
});
app.use(function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, function () {
    console.log('App listening on port ' + port);
});