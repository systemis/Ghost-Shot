import React, { Component } from 'react';
import './Style/style-footer.css';

class Footer extends Component {
    render() {
        return (
            <div className="footer-group">
                <span className="time"> 
                    Copyright  2017
                </span>
                <span className="developer">
                    Design and development by <a href="https://systemis-blog.herokuapp.com/">Systemis</a>
                </span>
            </div>
        );
    }
}

export default Footer;