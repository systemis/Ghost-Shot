const dialogReducer = (state = '', action) => {
    switch(action.type){
        case 'CHANGE_DIALOG':
            return action.value;
        default:    
            return state;
    }
}

module.exports = {
    dialogReducer: dialogReducer
}