const io  = require('socket.io-client');
const url = 'http://localhost:3200/';
const socket = io.connect(url);

class socketMG{
    constructor(){
        console.log('connecting socket');
    }

    test(){
        console.log('testing');
        socket.emit('testing', {username: 'systemis'});
    }   

    sendNotification(data){
        console.log(`Sending a notification`);
        socket.emit(`SEND_NOTIFICATION`, data);
    }
}

module.exports = new socketMG();