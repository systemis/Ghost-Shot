var redux        = require('redux');
var uiReducers   = require('./ui.js');
var userReducers = require('./user.js');
var socketMG     = require('./api/socket.js');

const screenVersionReducer = (state = 'desktop', action) => {
    switch(action.type){
        case 'CHANGE_SCREEN_VERSION':
            return action.value;
        default:
            return state;
    }
}

const reducer = redux.combineReducers({
    screenVersion: screenVersionReducer,
    dialogInfo: uiReducers.dialogReducer,
    callbacksResizeScreen: uiReducers.callbacksResizeScreenReducer,
    clientInfo: userReducers.clientInfoReducer,
    userSelectedInfo: userReducers.userSelectedInfoReducer,

    // For api here 
    socket: () => socketMG
})

const store = redux.createStore(reducer);
store.subscribe(() => {
})

export default store;