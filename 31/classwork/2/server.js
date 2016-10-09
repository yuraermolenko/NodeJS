var express = require('express');
var app = express();

var mysql = require('mysql');

var port = process.env.port || 1337;

// параметры соединеня с бд
var connection = mysql.createConnection({
    connectionLimit: 50,
    host: 'localhost',
    user: 'root',
    password: 'qwerrewqasdffdsa',
    database: 'test',
    port: 3306
});

app.use(function (req, res) {

    // подключение к базе данных
    connection.connect(function (err) {

        if (err) console.log(err.stack);

        console.log('connected as id ' + connection.threadId);
    });

    connection.query('SELECT * FROM `test_table`', function (err, rows, fields) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<table>');

        for (var i = 0; i < rows.length; i++) {
            res.write(`
				<tr>
					<td>${rows[i].id}</td>
					<td>${rows[i].name}</td>
                    <td>${rows[i].info}</td>
				</tr>
			`)
        };

        res.write('</table>');
        res.end();
    })
});

app.listen(port, function () {

    console.log('app listening on port ' + port);

}); 
