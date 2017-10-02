const userDM = require('../../model/user.js');
const postDM = require('../../model/posts.js');
class Socket{
    constructor(server){
        this.socket = require('socket.io')(server);
        this.socket.on('connect', socket => {
            // Handle when someone have already sended a notification to server
            socket.on(`SEND_NOTIFICATION`, data => {
                data.date = new Date().toLocaleDateString();
                data.seen = false;
                
                var sendUs;
                var receiveUs;
                // Catch error when get username of send-user and receive-user
                try{
                    // Username of user which sended this notification 
                    sendUs    = data.sendUser.username;
                    receiveUs = data.receiveUser.username;
                }catch(e){
                    console.log('Error, when get username of send-user and receive-user', e);
                    sendUs    = '';
                    receiveUs = '';
                }   

                /* TO DO: handle to send html string to client
                ** Action: like, follow, notification from admin 
                */
                switch(data.type){
                    case `LIKE`:
                        var postId   = data.data.postId;
                        var postInfo = '';

                        postDM.findById(postId, (error, result) => {
                            if(error) {
                                console.log(`Error when find post by id `)
                                postInfo = `<img src='underfined' />`
                            }else{
                                postInfo = `<img src='${result.image}' /> `
                            }
                        })
                        // postDM.find
                        
                        data.message = `<a href='/user/${sendUs}'> ${sendUs} </a> have liked your post ${postInfo}`
                        break;
                    case `FOLLOW`:
                        data.message = `<a href='/user/${sendUs}'> ${sendUs} </a> have followed you.`
                        break;
                    default: 
                        data.message = `<a href='/user/${sendUs}'> ${sendUse} </a> have send you a notification.`
                }
                
                if(data.sendUser.username === data.receiveUser.username) return;
                userDM.addNewNotification(data.receiveUser.username, data, (error, result) => {
                    if(error) {
                        return;
                    }

                    this.socket.sockets.emit(`ON_NOTIFICATION/${receiveUs}`, data);
                })
            })
        })
    }
}

module.exports = Socket;