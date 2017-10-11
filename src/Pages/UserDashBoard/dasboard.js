import React, { Component } from 'react';
import {connect}            from 'react-redux';

class UserDashBoard extends Component {
    render() {
        return (
            <div className="user-dashborad-page">
                User DashBoard of {this.props.info.username}
            </div>
        );
    }
}

export default connect(state => {
    return {
        info: state.userSelectedInfo
    }
})(UserDashBoard);