var redux = require('redux');

const screenVersionReducer = (state = 'desktop', action) => {
    switch(action.type){
        case 'CHANGE_SCREEN_VERSION':
            return action.value;
        default:
            return state;
    }
}

const reducer = redux.combineReducers({
    screenVersion: screenVersionReducer
})

const store = redux.createStore(reducer);

store.subscribe(() => {
    console.log(store.getState().screenVersion);
})

export default store;