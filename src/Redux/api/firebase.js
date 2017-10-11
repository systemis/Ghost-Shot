const firebaseConfig  = {
    apiKey: "AIzaSyDeBvbiuPNcewuWxpnlVxaShJuUJFGuAPk",
    authDomain: "ghost-shot.firebaseapp.com",
    databaseURL: "https://ghost-shot.firebaseio.com",
    projectId: "ghost-shot",
    storageBucket: "ghost-shot.appspot.com",
    messagingSenderId: "336597251427"
}

const firebaseReducer = (state = firebaseConfig, action) => {
    return state;
}

module.exports = {
    firebaseReducer: firebaseReducer,
};