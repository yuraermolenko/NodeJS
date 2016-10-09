var express = require('express');
var app = express();
var port = process.env.port || 1337;

app.use(express.static('./public'));

app.listen(port, function () {
    console.log('App listening on port ' + port);
});