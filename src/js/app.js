import $ from 'jquery';
class appMG{
    isLogin(fn){
        $.ajax({
            url: `/app/isAuthenticated/`, type: `POST`,
            success: isLogin => fn(isLogin),
            error: err => fn(false)
        })
    }
}