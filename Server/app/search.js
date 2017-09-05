// Search task 
const userDM = require('../model/user.js');
const postDM = require('../model/posts.js');
module.exports = app => {
    const findByHastash = hastash => {
        console.log('hastash');

    }

    const findFriend  = (client, word) => {
        var clUS      = client.username;
        var follower  = client.follower;
        var following = client.following;

        // console.log(clUS);
        // console.log(follower);
        // console.log(following);

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
        findFollowing();
    }

    const findPeople = username => {
        console.log('username');
    }

    const findLocation = location => {
        console.log('location');
    }

    app.post('/search/:word', (req, res) => {
        const clUS  = {
            username: 'systemis',
            follower: ['Jobs Pham'],
            following: ['Tony']
        };
        const word  = req.params.word.toLowerCase();
        const fW    = word.substr(0, 1);

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
                    findFriend(clUS, word);
                }else{
                    findPeople(word);
                }
                break;
        }

        res.send(word);
    })   
}