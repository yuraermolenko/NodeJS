var events = require('events');
var emitter = new events.EventEmitter;

var time = 0;

emitter.on('tick', () => {   
    if (time !== undefined) {
        console.log(time++);
    }
});
emitter.on('error', (err) => {
    console.log(err.message) 
});
setInterval(() => {
    emitter.emit('tick');
}, 1000);