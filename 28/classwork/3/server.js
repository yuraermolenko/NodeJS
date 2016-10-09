const fs = require('fs');
process.argv[2] = "Hello";
process.argv[3] = "World";
var text = process.argv.slice(2).join(' ');

fs.writeFile('test.txt', text, (err) => {
    if (err) {
        console.error(err);
    }
    fs.readFile('test.txt', { encoding: 'utf-8' }, function (err, data) {
        if (err) {
            console.log(err)
        }
        else {
            console.log(data.toString())
        }
    }); 
});