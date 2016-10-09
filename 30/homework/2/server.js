const express = require('express');
const path = require('path');

const app = express();
const port = process.env.port || 1337;

users = [
    { name: 'Jane', age: 23 }, { name: 'John', age: 30 }, { name: 'Vasya', age: 25 },
    { name: 'Yvonne', age: 34 }, { name: 'Will', age: 18 }, { name: 'Jack', age: 26 }
];

app.get('/', function (req, res) {
    res.redirect('/users');
});

app.get('/users', function (req, res) {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/users/:id', function (req, res) {
    res.end(`name: ${users[req.params.id].name}, age: ${users[req.params.id].age}`)
});

app.listen(port, function () {
    console.log('App listening on port ' + port);
});