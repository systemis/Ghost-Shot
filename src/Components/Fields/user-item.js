import React, { Component } from 'react';
import {connect}            from 'react-redux';
import userMG               from '../../js/user.js';

// fof: Is follow if return 1 or cancel follow if return -1 

class UserItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            fof: -1,
            clFollowing: [], 
            info: '',
        }
    }

    getUserInfo(){
        userMG.findUserByName(this.props.data.username, (error, result) => {
            if(error) return ;
            this.setState({info: result});
        })
    }

    followOrUnfollow(cb){
        userMG.followOrUnfollow(this.props.data.username, (error, result) => {
            cb(result);
        })
    }

    btnFOF(){
        var bundleProperty = {};
        var clientUs       = this.props.clientInfo.username;
        var userUS         = this.props.data.username;

        if(userUS === clientUs) { return ; }
        if(this.state.clFollowing.indexOf(userUS) >= 0){
            bundleProperty.text = 'UnFollow';
        }else{
            bundleProperty.text = 'Follow';
        }
        
        bundleProperty.cb = following => {
            var clInfo = this.props.clientInfo;
            clInfo.following = following;
            
            this.setState({clFollowing: following});
            this.props.dispatch({type: `CHANGE_CLIENT_INFO`, value: clInfo});
        }

        return (
            <button 
                className="btn-follow-user" 
                onClick={() => this.followOrUnfollow(bundleProperty.cb.bind(this))}>
                    {bundleProperty.text}
            </button>
        )
    }

    componentWillMount() {
        this.setState({clFollowing: this.props.clientInfo.following});
        this.getUserInfo();        
    }

    render() {
        return (
            <div className="user-item-users-list-field row">
                <div className="show-avatar">
                    <img src={this.state.info.avatar} alt="User avatar"/>
                </div>
                <div className="show-username">
                    <p>{this.state.info.username}</p>
                </div>
                
                <div className="show-btn-follow">
                    {this.btnFOF()}
                </div>
            </div>
        );
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }
}

export default connect(state => {
    return {
        clientInfo: state.clientInfo
    }
})(UserItem);