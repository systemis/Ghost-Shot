// Search task 
const userDM = require('../model/user.js');
const postDM = require('../model/posts.js');
module.exports = app => {
    const findPeople = (word, clientInfo, searchResult, res) => {
        var userPrioritize = [];
        if(clientInfo){
            userPrioritize.push(clientInfo.user);
            userPrioritize = userPrioritize.concat(clientInfo.following);
        }   

        // Find by client's followings
        userPrioritize.map((username, index) => {
            if(username.indexOf('word') >= 0){
                userDM.findUserByName(username, (error, result) => {
                    if(!errot && result.length > 0){
                        searchResult.push(result);
                    }
                })
            }
        })

        userDM.findUsersByName(word, (error, result) => {
            searchResult = searchResult.concat(result);
            console.log(searchResult);
            res.send({error: null, result: searchResult});
        })
    }

    const findHastash = (word, clientInfo, searchInfo, res) => {

    }

    app.post('/search', (req, res) => {
        const word           = req.body.word;
        const clientInfo     = req.user;
        var   searchResult   = [];

        switch(word.substr(0, 1)){
            case '#':
                return findHastash(word, clientInfo, searchResult, res);
            default: 
                return findPeople(word, clientInfo, searchResult, res);
        }
    });
}