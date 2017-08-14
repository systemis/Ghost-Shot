import React, { Component } from 'react';
import fbLogo from '../../image/Logo/logo-fb.png';
import ghLogo from '../../image/Logo/logo-gh.png';
import ttLogo from '../../image/Logo/logo-tt.png';
import './style.css';

class SignInPage extends Component {
    render() {
        return (
            <div className="sign-in-page">
                <div className="child-group">
                    <p className="header">
                        Sign in 
                    </p>
                    <div className="login-socialnetwork">
                        <div className="social-list">
                            <a href="/"><img src={fbLogo} alt="Facebook logo" className="logo-social"/></a>
                            <a href="/"><img src={ghLogo} alt="Github logo"   className="logo-social"/></a>
                            <a href="/"><img src={ttLogo} alt="Twitter logo"  className="logo-social"/></a>
                        </div>
                    </div>
                    <div className="login-normal">
                        <form action="/sign-in" method="POST">
                            <div className="main-layout">
                                <input 
                                    name="username"
                                    className="username-field"
                                    type="text" 
                                    placeholder="Type email or username here ..."/>
                                <br/>
                                <input 
                                    name="password"
                                    className="password-field"
                                    type="text" 
                                    placeholder="Type password here ..."/>
                            </div>
                            <div className="footer">
                                <button className="login-btn">Login</button>
                                <p>Don't have account, <a href="sign-up"> Create new account!</a></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default SignInPage;