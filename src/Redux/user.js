const infoState = {
    id: '',
    username: '',
    email: '',
    avatar: '',
    follower: [],
    following: [],
    description: '',
    posts: []
}

const clientInfoReducer = (state = infoState, action) => {
    switch(action.type){
        case `CHANGE_CLIENT_INFO`:
            return action.value;
        default:
            return state;
    }
}

const usserSelectedInfoReducer = (state = infoState, action) => {
    switch(action.type){
        case `CHANGE_USER_SELECTED_INFO`:
            console.log(action.value);
            return action.value;
        default:
            return state;
    }
}

module.exports = {
    clientInfoReducer: clientInfoReducer,
    usserSelectedInfoReducer: usserSelectedInfoReducer
}