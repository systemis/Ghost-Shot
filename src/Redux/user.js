//default value 
const postsMG = require('../js/posts.js');
const infoState = {
    id: '0',
    username: '',
    email: '',
    avatar: '',
    follower: [],
    following: [],
    description: '',
    newfeed: [],
    posts: [],
    notifications: []
}

const clientInfoReducer = (state = infoState, action) => {
    switch(action.type){
        case `CHANGE_CLIENT_INFO`:
            if(!action.value) return state;
            return action.value;
            break;
        default:
            return state;
    }
}

const userSelectedInfoReducer = (state = infoState, action) => {
    switch(action.type){
        case `CHANGE_USER_SELECTED_INFO`:
            if(!action.value) return state;
            
            return action.value;
            break;
        default:
            return state;
    }
}

module.exports = {
    clientInfoReducer: clientInfoReducer,
    userSelectedInfoReducer: userSelectedInfoReducer
}