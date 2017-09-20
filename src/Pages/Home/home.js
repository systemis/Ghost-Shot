import React, { Component } from 'react';
import {connect}            from 'react-redux';
import PostCard             from '../../Components/Card/post-card.js';
import appMG                from '../../js/app.js';
import UserInfoField        from '../User/info.js';
import userMG               from '../../js/user.js';
import './Style/style-home.css';

class HomePage extends Component {
    render() {
        return (
            <div className="home-page">
                <UserInfoField clientInfo={true}/>
                <div className="layout">
                    <div className="show-posts">
                        {this.props.clientInfo.newfeed.map((post, index) => {
                            return <PostCard 
                                    key={index} 
                                    postInfo={post} />
                        })}
                    </div>
                </div>
            </div>
        );
    }

    shouldComponentUpdate(nextProps, nextState) {    
        return true;
    }
}

export default connect(state => {
    return{
        screenVersion: state.screenVersion,
        clientInfo: state.clientInfo,
    }
})(HomePage);