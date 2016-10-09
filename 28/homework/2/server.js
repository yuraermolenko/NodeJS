const fs = require('fs');

var arr = new Uint16Array(10);
var buffer = Buffer.from(arr.buffer);

fs.open('test.txt', 'r', (err, fd) => {
    if (err) {
        console.error(err);
        return;
    }

   
    fs.read(fd, buffer, 0, 6, 10, function (err, bytes) {

        if (err) {
            console.error(err);
            return;
        }

        console.log(buffer.slice(0, bytes).toString());

    });

    fs.close(fd, function (err) {
        if (err) {
            console.error(err);
            return;
        }
    })

});