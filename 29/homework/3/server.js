const http = require('http');
const fs = require('fs');
const url = require('url');
const port = process.env.port || 1337;
var counter = 1;
const server = http.createServer().listen(port);

server.on('request', function (req, res) {
    var headers = req.headers;

    var text = '';
    for (var prop in headers) {
        text += `${prop}: ${headers[prop]};\n`
    }

    var file = `${counter}.txt`;
    counter++;

    fs.writeFile(`headers/${file}`, text, (err) => {
        if (err) throw err;

        console.log(`Request headers saved to  ${file}`)
    });


    var path = url.parse(req.url).pathname;

    if (path == '/index.html' || path == '/') {

        fs.readFile('index.html', function (err, data) {
            if (err) {
                console.error(err);
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.write('Not Found!');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(data.toString());
            }

            res.end();
        })
    }
    else if (path == '/test' && req.method == 'POST') {

        req.on('data', (data) => {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(JSON.stringify({ message: data.toString() }));
        });
    }
    else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('Resource not found');
    }
});
