import React, { Component } from 'react';

class SignUpPage extends Component {
    render() {
        return (
            <div className="sign-up-page">
                <div className="child-group">
                    <p className="header">
                        Sign up
                    </p>
                    <div className="login-normal">
                        <div className="main-layout">
                            <input 
                                className="username-field"
                                type="text" 
                                placeholder="Type username here ..."/>
                            <br/>
                            <input 
                                className="email-field"
                                type="text" 
                                placeholder="Type email here ..."/>
                            <br/>
                            <input 
                                className="password-field"
                                type="text" 
                                placeholder="Type password here ..."/>
                        </div>
                        <div className="footer">
                            <button className="login-btn">Sign up</button>
                            <p><a href="/sign-in"> Back </a></p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SignUpPage;