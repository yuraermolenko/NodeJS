var express = require('express');
var app = express();

var port = process.env.port || 1337;

var mysql = require('mysql');


var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'qwerrewqasdffdsa',
    database: 'test',
    port: 3306
});
app.use(function (req, res) {

    if (req.url == '/') {

        // подключение к базе данных
        connection.connect(function (err) {

            if (err) console.log(err.stack);

            console.log('connected as id ' + connection.threadId);
        });

        // запрос к базе данных 
        connection.query('SELECT NAME FROM `test_table` WHERE ID=1', function (err, rows) {

            if (err) console.log(err.stack);

            var data = rows[0].NAME;
            res.status(200).send(data);

            console.log('query to database successful');
        });

        res.on('finish', function () {

            // отключение от базы данных 
            connection.end(function (err) {

                if (err) console.log(err.stack);

                console.log('disconnected from database');
            });

        })

    }
});

app.listen(port, function () {

    console.log('app listening on port ' + port);

}); 