import React, { Component } from 'react';
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
                            <span href="/"> Exchange instargram </span>
                        </a>
                    </div>
                    <Search />
                    <Tools />
                </div>
            </div>
        );
    }
}

export default Header;