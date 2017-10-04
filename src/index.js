import React         from 'react';
import ReactDOM      from 'react-dom';
import {Provider}    from 'react-redux';
import App           from './App';
import store         from './Redux/index.js';
import * as firebase from 'firebase';
import registerServiceWorker from './registerServiceWorker';


const config = {
    apiKey: "AIzaSyDeBvbiuPNcewuWxpnlVxaShJuUJFGuAPk",
    authDomain: "ghost-shot.firebaseapp.com",
    databaseURL: "https://ghost-shot.firebaseio.com",
    projectId: "ghost-shot",
    storageBucket: "ghost-shot.appspot.com",
    messagingSenderId: "336597251427"
  }
  
  
firebase.initializeApp(config);
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
, document.getElementById('root'));
