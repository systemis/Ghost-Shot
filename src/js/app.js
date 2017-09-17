import $            from 'jquery';
import searchCookie from './cookie/search.js';
class appMG{
    isLogin(fn){
        $.ajax({
            url: `/app/isAuthenticated/`, type: `POST`,
            success: isLogin => fn(isLogin),
            error: err => fn(false)
        })
    }

    getNewFeed(position, cb){
        $.ajax({
            url: `/new-feed/${position}`, type: `POST`,
            success: data => {
                console.log(data);
                cb(data.error, data.result) 
            },
            error: err => cb(JSON.stringify(err), null)
        })
    }

    search(keyWord, cb){
        const cookie = searchCookie.getCookie();
        $.ajax({
            url: `/search`, type: `POST`,
            data: {word: keyWord},
            success: data => cb(data.error, data.result),
            error: err => cb(JSON.stringify(err), null)
        })
    }
}

export default new appMG();