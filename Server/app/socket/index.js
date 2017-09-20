const userDM = require('../../model/user.js');
class Socket{
    constructor(server){
        this.socket = require('socket.io')(server);
        this.socket.on('connect', socket => {
            console.log(`Connect socket server success !`);
            socket.on('testing', data => {
                console.log(data);
            })
        })

        this.socket.on(`SEND_NOTIFICATION`, data => {
            console.log(data);
            
            data.date = new Date().toLocaleDateString();
            switch(data.type){
                case `LIKE`:
                    data.message = `${data.sendUser.username} have liked your post`
                    break;
                case `FOLLOW`:
                    data.message = `${data.sendUser.username} have followed you.`
                default: 
                    data.message = `${data.sendUser.username} have send you a notification.`
            }
            
            if(data.sendUser.username === data.receiveUser.username) return;

            userDM.addNewNotification(data.receiveUser, data, (error, result) => {
                if(error) return;
                
                io.socket.emit(`sendNotification/${data.receiveUser.username}`, data);
            })
        })
    }
}

module.exports = Socket;