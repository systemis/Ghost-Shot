const clientInfoReducer = (state = '', action) => {
    switch(action.type){
        case `CHANGE_CLIENT_INFO`:
            return action.value;
        default:
            return state;
    }
}

module.exports = {
    clientInfoReducer: clientInfoReducer
}