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
        socket.emit(`SEND_NOTIFICATION`, data);
    }

    onNewNotification(id, cb){
        socket.on(`ON_NOTIFICATION/${id}`, data => {
            console.log(data);
            cb(data);
        })
    }
}

module.exports = new socketMG();