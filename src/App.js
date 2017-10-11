import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {connect}     from 'react-redux';
import * as firebase from 'firebase';
import $             from 'jquery';
import userMG        from './js/user.js';
import RouterCM      from './route.js';
import DialogField   from './Components/Dialog/dialog.js';
import Header        from './Components/Header/index.js';
import './Style/app.css';


var index = 0;
class App extends Component {
  constructor(props){
    super(props);
    this.state = {screenWidth: $(window).width()}
  }

  reSizeScreenWidthListener(){
    var screenWidth = $(window).width();
    var old         = this.state.screenWidth;
    if(screenWidth > 768 && old < 768){
      this.setState({screenWidth: screenWidth});
      this.props.dispatch({type: 'CHANGE_SCREEN_VERSION', value: 'desktop'});
    }else if(screenWidth < 768 && old > 768){
      this.setState({screenWidth: screenWidth});
      this.props.dispatch({type: 'CHANGE_SCREEN_VERSION', value: 'modile'});
    }

    this.props.callbacksResizeScreen.map((cb, index) => {
      cb();
    })
  }


  getClientInfo(){    
      const {dispatch} = this.props;
      userMG.getClientInfo((err, result) => {
        if(err) {
            dispatch({type: `CHANGE_USER_SELECTED_INFO`, value: ''});
            dispatch({type: `CHANGE_CLIENT_INFO`, value: ''});
            return;
        }

        dispatch({type: `CHANGE_USER_SELECTED_INFO`, value: result});
        dispatch({type: `CHANGE_CLIENT_INFO`, value: result});
      })
  }

  render() {
    return (
      <div id="App">
        <RouterCM />
        <Header />
        <DialogField />
      </div>
    );
  }

  componentDidMount() {
    this.getClientInfo();    
    firebase.initializeApp(this.props.firebaseConfig);
    window.onresize = this.reSizeScreenWidthListener.bind(this);
  }  

  shouldComponentUpdate(nextProps, nextState) {
    if(nextProps.clientInfo.id !== this.props.clientInfo && nextProps.clientInfo.username) {
      if(index !== 0) return;
      this.props.socket.onNewNotification(nextProps.clientInfo.username, data => {
        var clientInfo = nextProps.clientInfo;
        clientInfo.notifications.push(data);
        this.props.dispatch({
          type: `CHANGE_CLIENT_INFO`,
          value: {...clientInfo}
        })
      })

      index +=1;
    }  
    return true;
  }
}

export default connect(state => {
  return {
    screenVersion: state.screenVersion,
    callbacksResizeScreen: state.callbacksResizeScreen,
    clientInfo: state.clientInfo,
    firebaseConfig: state.firebaseConfig,
    socket: state.socket
  }
})(App);
