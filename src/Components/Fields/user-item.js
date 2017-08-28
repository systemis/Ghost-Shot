import React, { Component } from 'react';
import userMG               from '../../js/user.js';

class UserItem extends Component {
    follow(e){
        userMG.follow(this.props.data.username, (error, result) => {
            console.log(error);
            console.log(result);
        })
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
                    <button className="btn-follow-user" onClick={this.follow.bind(this)}>
                        Follow
                    </button>
                </div>
            </div>
        );
    }
}

export default UserItem;