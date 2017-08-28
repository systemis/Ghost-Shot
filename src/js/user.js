import $ from 'jquery';
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

    follow(username, fn){
        $.ajax({
            url: `/user/follow/${username}`, type: `POST`, 
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
}

export default new userMG();