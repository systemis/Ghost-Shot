// Search task 
const userDM = require('../model/user.js');
const postDM = require('../model/posts.js');
module.exports = app => {
    const findByHastash = hastash => {
        console.log('hastash');
    }

    const findFriend  = (client, cookie, word) => {
        var clUS      = client.username;
        var follower  = client.follower;
        var following = client.following;
        var rlrsvl    = [];

        // console.log(clUS);
        // console.log(follower);
        // console.log(following);

        const findInCookie = () => {
            if(cookie.length <= 0) return findFollowing();
            for(var i = 0, length = cookie.length; i < length; i++){
                if(cookie[i].toLowerCase().indexOf(word) >= 0){
                    console.log(cookie[i]);
                }

                if(i === length - 1){
                    findFollowing();
                }
            }
        }

        const findFollowing = () => {
            for(var i = 0, length = following.length; i < length; i++){
                if(following[i].toLowerCase().indexOf(word) >= 0){
                    console.log(following[i]);
                }

                if(i === length - 1){
                    findFollower();
                }
            }
        }

        const findFollower = () => {
            for(var i = 0, length = follower.length; i < length; i++){
                if(follower[i].toLowerCase().indexOf(word) >= 0){
                    console.log(follower[i]);
                }

                if(i === length - 1){
                    findPeople(word);
                }
            }
        }

        // Run 
        findInCookie();
    }

    const findPeople = (username, cookie) => {
        console.log('username');
    }

    const findLocation = (location, cookie) => {
        console.log('location');
    }

    app.post('/search/:word', (req, res) => {
        const ckSearch = req.body.cookie;
        const word     = req.params.word.toLowerCase();
        const fW       = word.substr(0, 1);
        const clUS     = {
            username: 'systemis',
            follower: ['Jobs Pham'],
            following: ['Tony']
        };

        var hastashAreSearched   = [];
        var peopleAreSearched    = [];
        var locationsAreSearched = [];

        for(var i = 0, length = ckSearch.length; i < length; i++){
            switch(ckSearch[i].substr(0, 1)){
                case `#`: 
                    hastashAreSearched8.push(ckSearch[i]);
                    break;
                case `!`:
                    locationsAreSearched.push(ckSearch[i]);
                    break;
                default:
                    peopleAreSearched.push(ckSearch[i]);
                    break;
            }
        }

        if(req.isAuthenticated()) clUS = req.user.username;
        switch(fW){
            case `#`:
                findByHastash(word);
                break;
            case `!`:
                findLocation(word);
                break;
            default: 
                if(clUS){
                    findFriend(clUS, peopleAreSearched, word);
                }else{
                    findPeople(word, peopleAreSearched);
                }
                break;
        }

        res.send(word);
    })   
}