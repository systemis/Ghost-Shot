const $ = require('jquery') 
class userMG{
    signUp(email, username, password, fn){
        $.ajax({
            url: '/sign-up', type: 'POST', 
            data: {bundle: {email, username, password}}, 
            success: data => {
                console.log(data);
                return fn(data.err, data.result)
            },
            error: err => fn(JSON.stringify(err), null)
        })
    }

    getClientInfo(fn){
        $.ajax({
            url: `/client/info/get`, type: `POST`,
            success: data => {
                fn(data.err, data.result);
            },
            error: err => fn(JSON.stringify(err), null)
        })
    }

    followOrUnfollow(username, fn){
        $.ajax({
            url: `/user/follow-or-unfollow/${username}`, type: `POST`, 
            success: data => fn(data.err, data.result),
            error: err => fn(JSON.stringify(err), null)
        })
    }

    isEdit(id, fn){
        $.ajax({
            url: `/user/isEdit/${id}`, type: `POST`,
            success: isEdit => fn(isEdit),
            error: err => fn(false)
        })
    }

    findUserByName(username, fn){
        $.ajax({
            url: `/user/info/get/username/${username}`, type: `POST`,
            success: data => {
                fn(data.err, data.result);
            },
            error: err => fn(JSON.stringify(err), null)
        })
    }

    updateNotification(notifications, fn){
        $.ajax({
            url: `/update-notifications/`, type: `POST`, data: {notifications: JSON.stringify(notifications)},
            success: data  => fn(data.error, data.result),
            error:   error => fn(JSON.stringify(error), null)
        })
    }
}

module.exports =new userMG();