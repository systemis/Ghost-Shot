import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import logo from './logo.svg';

class App extends Component {
  componentWillMount(){
    console.log(this.props.screenVersion);
  }

  render() {
    return (
      <Router>
        <div className="App">
        </div>
      </Router>
    );
  }
}

export default connect(state => {
  return {
    screenVersion: state.screenVersion
  }
})(App);
