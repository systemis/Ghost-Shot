// Search task 
const userDM = require('../model/user.js');
const postDM = require('../model/posts.js');
module.exports = app => {
    const findPeople = (word, clientInfo, searchResult, res) => {
        var userPrioritize = [];
        if(clientInfo){
            userPrioritize.push(clientInfo.username);
            userPrioritize = userPrioritize.concat(clientInfo.following);
        }   

        userDM.findUsersByName(word, (error, result) => {
            searchResult = searchResult.concat(result);
            
            searchResult.map((item, index) => {
                if(userPrioritize.indexOf(item.username) >= 0){
                    item.prv = 1;
                }

                if(clientInfo && clientInfo.username === item.username){
                    item.prv = 2;
                }
            })

            for(var i = 0, length = searchResult.length; i < length; i++){
                for(var j = length - 1; j > i; j--){
                    var prv1 = searchResult[j].prv || 0;
                    var prv2 = searchResult[j - 1].prv || 0;

                    if(prv1 > prv2){
                        const pg = searchResult[j];
                        searchResult[j] = searchResult[j - 1];
                        searchResult[j - 1] = pg;
                    }
                }
            }

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