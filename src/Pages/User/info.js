import React, { Component } from 'react';
import {connect}            from 'react-redux';
import image                from '../../image/ex-avatar.png';
import './Style/info-style.css';
class UserInfoPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: this.props.match.params.username
        }
    }

    
    componentWillMount() {
        console.log(this.props.match.params.username);
    }

    render() {
        return (
            <div className='user-info-page'>
                <div className="layout">
                    <div className="show-info row">
                        <div className="show-user-avatar col-xs-3">
                            <img src={image} alt="User avatar"/>
                        </div>
                        <div className="show-user-info col-xs-3">
                            <div className="show-user-name show-btn-edit">
                                <ul className="tools-manager">
                                    <li>{this.state.username}</li>
                                    <li><i className="fa fa-pencil"></i></li>
                                </ul>                           
                            </div>
                            <div className="show-about-env">
                                
                            </div>
                        </div>
                    </div>
                    <div className="show-posts">
                    
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(state => {
    return {
        screenVersion: state.screenVersion
    }
})(UserInfoPage);