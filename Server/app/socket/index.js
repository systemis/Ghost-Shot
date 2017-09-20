const userDM = require('../../model/user.js');
class Socket{
    constructor(server){
        this.socket = require('socket.io')(server);
        this.socket.on('connect', socket => {
            console.log(`Connect socket server success !`);
            socket.on('testing', data => {
            })
            
            socket.on(`SEND_NOTIFICATION`, data => {
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
                userDM.addNewNotification(data.receiveUser.username, data, (error, result) => {
                    if(error) {
                        return;
                    }
                    
                    console.log(data.sendUser.id);
                    this.socket.sockets.emit(`ON_NOTIFICATION/${data.receiveUser.username}`, data);
                })
            })
        })
    }
}

module.exports = Socket;