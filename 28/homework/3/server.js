const fs = require('fs');

var fileReadStream = fs.createReadStream('test.txt', { start: 10, end: 20 });

var fileWriteStream = fs.createWriteStream('output.txt');

fileReadStream.pipe(fileWriteStream);

fileWriteStream.on('finish', function () {
    console.log('data written to file output.txt');
});
