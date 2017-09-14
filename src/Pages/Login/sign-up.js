import React, { Component } from 'react';
import userMG               from '../../js/user.js';

class SignUpPage extends Component {
    signUp(e){
        e.preventDefault();
        const username = document.getElementById('username-field-signup').value;
        const password = document.getElementById('password-field-signup').value;
        const email    = document.getElementById('email-field-signup').value;
        userMG.signUp(email, username, password, (err, result) => {
            if(err){
                return alert(`Đang ký thất bại, lỗi: ${err}`);
                document.location.reload();
            }else{
                console.log('Dang ky thanh cong');
                alert('dang ky thanh cong');
                window.location.href = '/sign-in';
            }
        })
        return false;
    }

    render() {
        return (
            <div className="sign-up-page">
                <div className="child-group">
                    <p className="header">
                        Sign up
                    </p>
                    <div className="login-normal">
                        <form 
                            id="form-sign-up"
                            action="/" 
                            method="POST"
                            onSubmit={this.signUp}>
                            <div className="main-layout">
                                <input 
                                    id="username-field-signup"
                                    name="username"
                                    className="username-field"
                                    type="text" 
                                    placeholder="Type username here ..."/>
                                <br/>
                                <input 
                                    id="email-field-signup"
                                    name="email"
                                    className="email-field"
                                    type="text" 
                                    placeholder="Type email here ..."/>
                                <br/>
                                <input 
                                    id="password-field-signup"
                                    name="password"
                                    className="password-field"
                                    type="password" 
                                    placeholder="Type password here ..."/>
                            </div>
                            <div className="footer">
                                <button className="login-btn">Sign up</button>
                                <p><a href="/sign-in"> Back </a></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default SignUpPage;