const http = require('http');
const fs = require('fs');
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
    res.end(`Request headers saved to ${file}`);

}).listen(port);

console.log('server running on port ' + port);