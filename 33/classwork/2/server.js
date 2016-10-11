var restify = require('restify'),
    fs = require('fs');

var port = process.env.port || 1337;

// создание сервера 
var server = restify.createServer({
    name: 'myApp'
});
var users = [
    { name: 'Jane', age: 23 }, { name: 'John', age: 30 }, { name: 'Vasya', age: 25 },
    { name: 'Yvonne', age: 34 }, { name: 'Will', age: 18 }, { name: 'Jack', age: 26 }
];
server.use(restify.bodyParser({ mapParams: true }));
server.get('/users', function (req, res) {
    res.json(users);
});
server.post('/users', function (req, res) {
    users.push({ name: 'random user', age: 30 });
    console.log('User added');
});
server.listen(port, function () {
    console.log('server running on port ' + port);
});