var mysql = require('mysql');
var pool = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'qwerrewqasdffdsa',
    database: 'test'
});
var path = require('path');
var queries = {
    selectedRow: '',
    // поиск элемента по id 
    findItemById: function (id, connection) {
        var self = this;
        var query = connection.query('SELECT * FROM `test_table` WHERE id=?', [id], function (err, rows) {
            if (err) console.log(err);
            self.selectedRow = rows[0];
            console.log(self.selectedRow)
        })
        return query;
    },
    // редактирование элемента 
    updateItem: function (data, connection) {

        // форматирование запроса
        var sql = 'UPDATE `test_table` SET name=?, info=? WHERE id=?';
        var inserts = [data.name, data.info, data.id];
        sql = mysql.format(sql, inserts);

        var query = connection.query(sql, function (err) {
            if (err) {
                console.log(err)
            } else {
                console.log('database updated');
            }
        });
        return query;
    }
}
 
module.exports = {
    checkItem: (req, res) => {
        pool.getConnection(function (err, connection) {

            // запрос к бд 
            var query = queries.findItemById(req.params.id, connection);

            query.on('end', function () {
                var row = queries.selectedRow;
                console.log(row);
                if (row) {
                    res.end(`/editItem/${req.params.id}`);
                }
                else {
                    res.end('/');
                }
            })
    })
    },
    loadEditPage: function (req, res) {

        // подключение к бд
        pool.getConnection(function (err, connection) {

            // запрос к бд 
            var query = queries.findItemById(req.params.id, connection);

            query.on('end', function () {
                var row = queries.selectedRow;

                res.render('edit_item_page', {
                    id: row.id,
                    name: row.name,
                    info: row.info,                   
                });

                // завершение соединения 
                connection.release();
            });
        })

    },

    changeItem: function (req, res) {

        // подключение к бд
        pool.getConnection(function (err, connection) {
            // запрос к бд 
            var query = queries.updateItem(req.body, connection);

            query.on('end', function () {
                res.end('/');
                // завершение соединения 
                connection.release();

            });
        });
    }
}