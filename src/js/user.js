import $ from 'jquery';
class userMG{
    signIn(){

    }

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
}

export default new userMG();