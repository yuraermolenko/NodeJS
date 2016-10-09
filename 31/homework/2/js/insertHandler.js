var mysql = require('mysql');
var pool = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'qwerrewqasdffdsa',
    database: 'test'
});

var path = require('path');

var insertItem= function (data, connection) {
    // форматирование запроса
    var sql = 'INSERT INTO `test_table` (name, info) VALUES (?, ?)'
    var inserts = [data.name, data.info];
    var sql = mysql.format(sql, inserts);

    // запрос к бд 
    return query = connection.query(sql, function (err, rows) {
        if (err) {
            console.log(err);
            return;
        }

        console.log('item inserted into database!');
       
    })
}

module.exports = {
    insertItem: function (data, connection) {
        // форматирование запроса
        var sql = 'INSERT INTO `test_table` (NAME, INFO) VALUES (?, ?)'
        var inserts = [data.name, data.info];
        var sql = mysql.format(sql, inserts);

        // запрос к бд 
        return query = connection.query(sql, function (err, rows) {
            if (err) {
                console.log(err);
                return;
            }

            console.log('item inserted into database!');
        })
    },
    addRow: function (req, res) {
       var self = this;
        pool.getConnection(function (err, connection) {
            var query = insertItem(req.body, connection);
            query.on('end', function () {
                res.end();
              
                connection.release();
            })
           
        });
    
    }
}