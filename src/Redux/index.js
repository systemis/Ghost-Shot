var redux        = require('redux');
var uiReducers   = require('./ui.js');
var userReducers = require('./user.js');

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
    clientInfo: userReducers.clientInfoReducers
})

const store = redux.createStore(reducer);

store.subscribe(() => {
    console.log(store.getState().screenVersion);
})

export default store;