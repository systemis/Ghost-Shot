import React, { Component } from 'react';
import {connect}            from 'react-redux';
import Search               from './Components/search.js';
import Tools                from './Components/tools';
import logo from '../../image/logo.png';
import './Style/style-header.css';

class Header extends Component {
    render() {
        return (
            <div className="header-group">
                <div className="container">
                    <div className="logo-group">
                        <a className="child" href="/">
                            <img src={logo} alt="App logo" />
                            <span href="/"> Ghost Shot </span>
                        </a>
                    </div>
                    <Search />
                    <Tools />
                </div>
            </div>
        );
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log(nextProps.clientInfo)
        return true;        
    }
    
    shouldComponentUpdate(nextProps, nextState){
        console.log(nextProps.clientInfo)
        return true;        
    }
}

export default connect(state => {
    return {
        clientInfo: state.clientInfo
    }
})(Header);