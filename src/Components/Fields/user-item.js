import React, { Component } from 'react';

class UserItem extends Component {
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
                    <button className="btn-follow-user">
                        Follow
                    </button>
                </div>
            </div>
        );
    }
}

export default UserItem;