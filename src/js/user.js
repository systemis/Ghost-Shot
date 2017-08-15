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
                fn(data.err, JSON.stringify(data.result));
            },
            error: err => fn(JSON.stringify(err), null)
        })
    }
}

export default new userMG();