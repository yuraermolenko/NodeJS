
const http = require('http');
const fs = require('fs');
const url = require('url');
const port = process.env.port || 1337;

http.createServer(function (req, res) {

    console.log(req.method);
    console.log(req.url);

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
    else if (path == '/test' && req.method == 'GET') {
        console.log(`Request: method = ${req.method}, path = ${path}`);
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(JSON.stringify({ message: "Hello World!" }));
    }
    else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('Resource not found');
    }

}).listen(port);

console.log('server running on port ' + port);
