// Search task 
const userDM = require('../model/user.js');
const postDM = require('../model/posts.js');
module.exports = app => {
    const findByWord = (word, entry) => {   
        
    }

    app.post('/search/:word', (req, res) => {
        var resultSearch = [];
        var cookies      = JSON.parse(req.body.cookie);
        var word         = req.params.word.toLowerCase();
        var fsWord       = word.substr(0, 1);
        var clientInfo   = {
            username: 'systemis',
            follower: ['Jobs Pham'],
            following: ['Tony']
        };

        if(cookies.length > 0) {
            for(cookie in cookies){
                if(cookie.keyWord.indexOf(word) >= 0){
                }
            }
        }else{
            userDM.findUsersByName(word, (error, result) => {
                res.send({error: null, result: result});
            })
        }
    })   
}