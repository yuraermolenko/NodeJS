var express = require('express');
var app = express();
var bodyParser = require('body-parser'); 
var port = process.env.port || 1337;

var path = require('path');


// подключение модуля для обработки запросов 
var editHandler = require('./js/editHandler'); 
var displayHandler = require('./js/displayhandler');
var insertHandler = require('./js/insertHandler'); 
// установка генератора шаблонов 
app.set('views', './pages');
app.set('view engine', 'ejs');

// подгрузка статических файлов из папки pages 
app.use(express.static(path.join(__dirname, 'pages')));
app.use(bodyParser.json());
app.use(bodyParser.text()); 
// загрузить таблицу с элементами 
app.get('/', displayHandler.displayItems);
app.get('/addItem', function (req, res) {

    res.sendFile(path.join(__dirname, '/pages/addItem.html'));

});
app.post('/addItem', insertHandler.addRow); 
app.get('/check/:id', editHandler.checkItem);
app.get('/editItem/:id', editHandler.loadEditPage);
app.put('/edit/:id', editHandler.changeItem);
// обработка ошибок 
app.use(function (err, req, res, next) {
    if (err) console.log(err.stack);

    res.status(500).send('oops...something went wrong');
});

app.listen(port, function () {

    console.log('app listening on port ' + port);

}); 