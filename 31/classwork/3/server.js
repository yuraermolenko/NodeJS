var express = require('express');
var app = express();

var mysql = require('mysql');

var port = process.env.port || 1337;


// параметры соединеня с бд
var pool = mysql.createPool({
    connectionLimit: 50,
    host: 'localhost',
    user: 'root',
    password: 'qwerrewqasdffdsa',
    database: 'test',
    port: 3306
});


app.use(function (req, res) {

    if (req.url == '/') {

        pool.getConnection(function (err, connection) {

            // объект, который будет вставлен в базу данных
            var newItem = {
                name: 'item 3',
                info: 'another stuff'
            };

           
            var sql = 'INSERT INTO `test_table` (NAME, INFO) VALUES (?, ?)'
            var inserts = [newItem.name, newItem.info];

            connection.query(sql,inserts, function (err) {

                if (err) {
                    console.log(err);
                    return;
                };

                console.log('data inserted!');
                connection.query('SELECT * FROM ??', [`test_table`], function (err, rows) {

                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.write('<h1>Items in database: </h1>');

                    var responseData = rows.map((row,index) => {
                        return `<h3>${index} - ${row.name} - ${row.info}</h3>`
                    });

                    for (var i = 0; i < responseData.length; i++) {
                        res.write(responseData[i]);
                    }

                    res.end();
                    connection.release();
                });
            });
        });
    };
});


app.listen(port, function () {

    console.log('app listening on port ' + port);

}); 
