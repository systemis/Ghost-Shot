import React, { Component } from 'react';
import UserItem             from './user-item.js';
import ex                   from '../../image/ex-avatar.png';

class UsersListField extends Component {
    constructor(props){
        super(props);
        this.state = {
            usersInfo: [
                {username: 'Systemis', avatar: ex, id: 'xx'},
                {username: 'Systemis', avatar: ex, id: 'xx'},
            ]
        }
    }

    render() {
        return (
            <div className="users-list-field">
                <div className="header">
                    Lượt thích 
                </div>
                {this.props.data.map((value, index) => {
                    return <UserItem key={index} data={value} />
                })}
            </div>
        );
    }
}

export default UsersListField;