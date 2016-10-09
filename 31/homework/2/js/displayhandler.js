var mysql = require('mysql');
var pool = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'qwerrewqasdffdsa',
    database: 'test'
});

module.exports = {
    tableRows: '',
    displayItems: function (req, res) {
        self = this;
        pool.getConnection(function (err, connection) {

            var query = connection.query('SELECT * FROM `test_table`', function (err, rows) {
                if (err) console.log(err)

                // генерация рядов таблицы на основе полученных данных  
                var table_rows = rows.map((row) => {
                    return (` <tr>
                            <td>${row.name} </td>
                            <td>${row.info}</td>                            
                        </tr> `)
                })

                self.tableRows = table_rows.join(' ');

            });

            query.on('end', function () {

                res.render('index', { data: tableRows });
                connection.release();
            })

        })
    }
}