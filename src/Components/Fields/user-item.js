import React, { Component } from 'react';
import {connect}            from 'react-redux';
import userMG               from '../../js/user.js';

// fof: Is follow if return 1 or cancel follow if return -1 

class UserItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            fof: -1
        }
    }

    followOrUnfollow(e){
        userMG.followOrUnfollow(this.props.data.username, (error, result) => {
            console.log(error);
            console.log(result);
        })
    }

    btnFOF(){
        if(this.props.data.id === this.props.clientInfo.id) return ;

    }

    render() {
        return (
            <div className="user-item-users-list-field row">
                <div className="show-avatar">
                    <img src={this.props.data.avatar} alt="User avatar"/>
                </div>
                <div className="show-username">
                    <p>{this.props.data.username}</p>
                </div>
                
                <div className="show-btn-follow">
                    <button className="btn-follow-user" onClick={this.followOrUnfollow.bind(this)}>
                        Follow
                    </button>
                </div>
            </div>
        );
    }
}

export default connect(state => {
    return {
        clientInfo: state.clientInfo
    }
})(UserItem);