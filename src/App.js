import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {connect}    from 'react-redux';
import $            from 'jquery';
import userMG       from './js/user.js';
import RootRoute    from './root.js';
import HomePage     from './Pages/Home/home.js';
import SignInPage   from './Pages/Login/sign-in.js';
import SignUpPage   from './Pages/Login/sign-up.js';
import UserInfoPage from './Pages/User/info.js';
import DialogField from  './Components/Dialog/dialog.js';
import Header       from './Components/Header/index.js';
import Footer       from './Components/footer/index.js';
import './Style/app.css';

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

  
  componentWillMount() {
    this.getClientInfo();    
  }

  render() {
    return (
      <div id="App">
        <Router>
          <div id="main-layout">
            <Route path='/' exact    component={RootRoute} />
            <Route path='/home'      component={HomePage} />
            <Route path='/sign-in'   component={SignInPage} />
            <Route path='/sign-up'   component={SignUpPage} />
            <Route path='/user/:username' component={UserInfoPage} />
            <Footer />
          </div>
        </Router>
        <Header />
        <DialogField />
      </div>
    );
  }

  componentDidMount() {
    window.onresize = this.reSizeScreenWidthListener.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }
}

export default connect(state => {
  return {
    screenVersion: state.screenVersion,
    callbacksResizeScreen: state.callbacksResizeScreen,
    clientInfo: state.clientInfo,
  }
})(App);
