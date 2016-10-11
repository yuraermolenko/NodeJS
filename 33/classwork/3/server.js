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
server.put('/users/:index', function (req, res) {
    users[req.params.index] = { name: 'updated name', age: 'updated age' };
    console.log('User updated');
});

server.del('/users/:index', function (req, res) {
    users.splice(req.params.index, 1);
    console.log('User removed');
});

server.listen(port, function () {
    console.log('server running on port ' + port);
});