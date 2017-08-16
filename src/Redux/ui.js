const dialogReducer = (state = '', action) => {
    switch(action.type){
        case 'CHANGE_DIALOG':
            return action.value;
        default:    
            return state;
    }
}

const callbacksResizeScreenReducer = (state = [], action) => {
    switch(action.type){
        case `ADD_CALLBACK_RESIZE_SCREEN`:
            return [...state, action.value];
        default:
            return state;
    }
}

module.exports = {
    dialogReducer: dialogReducer,
    callbacksResizeScreenReducer: callbacksResizeScreenReducer
}