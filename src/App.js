import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import Header    from './Components/Header/index.js';
import Footer    from './Components/footer/index.js';
import './Style/app.css';

class App extends Component {
  constructor(props){
    super(props);
  }

  componentWillMount(){
  }

  render() {
    return (
      <div id="App">
        <Header />
        <Router>
          <div className="main-layout">

          </div>
        </Router>
        <Footer />
      </div>
    );
  }
}

export default connect(state => {
  return {
    screenVersion: state.screenVersion
  }
})(App);
