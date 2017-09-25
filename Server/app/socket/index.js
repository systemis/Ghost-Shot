const userDM = require('../../model/user.js');
class Socket{
    constructor(server){
        this.socket = require('socket.io')(server);
        this.socket.on('connect', socket => {
            socket.on('testing', data => {
            })
            
            socket.on(`SEND_NOTIFICATION`, data => {
                data.date = new Date().toLocaleDateString();
                data.seen = false;
                
                switch(data.type){
                    case `LIKE`:
                        data.message = `<a href='/user/${data.sendUser.username}'> ${data.sendUser.username} </a> have liked your post`
                        break;
                    case `FOLLOW`:
                        data.message = `<a href='/user/${data.sendUser.username}'> ${data.sendUser.username} </a> have followed you.`
                        break;
                    default: 
                        data.message = `<a href='/user/${data.sendUser.username}'> ${data.sendUser.username} </a> have send you a notification.`
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