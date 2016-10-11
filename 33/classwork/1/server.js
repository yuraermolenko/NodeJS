var restify = require('restify'),
    fs = require('fs');
var bodyParser = require('body-parser');
var port = process.env.port || 1337;

// создание сервера 
var server = restify.createServer({
    name: 'myApp'
});

server.use(restify.bodyParser({ mapParams: true }));
// обработка get запроса 
server.get('/', function (req, res, next) {
    res.send(`${req.headers}`);

});

// обработка post запроса 
server.post('/', function (req, res, next) {
    res.send(`${req.body}`);

});

server.use(function () {
    res.send(404);
})

server.listen(port, function () {
    console.log('server running on port ' + port);
});