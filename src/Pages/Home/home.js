import React, { Component } from 'react';
import {connect}            from 'react-redux';
import PostCard             from '../../Components/Card/post-card.js';
import UserInfoField        from '../User/info.js';
import userMG               from '../../js/user.js';
import exam  from '../../image/logo.png';
import exW1  from '../../image/ex-w-1.png';
import exW2  from '../../image/ex-w-2.png';
import './Style/style-home.css';

class HomePage extends Component {
    constructor(props){
        super(props);
        this.state = {
            posts: [
                {   
                    id: 92432029,
                    user: {id: '999', username: 'systemis', avatar: exam},
                    status: 'Hello new day !', 
                    likes: [111, 112], 
                    comments: [
                        {id: 111, username: 'systemis', comment: 'Hahaha, like it !', date: new Date().toLocaleDateString()},
                        {id: 111, username: 'systemis', comment: 'Hahaha, like it !', date: new Date().toLocaleDateString()},
                        {id: 111, username: 'systemis', comment: 'Hahaha, like it !', date: new Date().toLocaleDateString()},
                        {id: 111, username: 'systemis', comment: 'Hahaha, like it !', date: new Date().toLocaleDateString()},
                        {id: 111, username: 'systemis', comment: 'Hahaha, like it !', date: new Date().toLocaleDateString()},
                    ],
                    photos: [exW1, exW2]
                },

                {   
                    id: 92029,
                    user: {id: '999', username: 'systemis', avatar: exam},
                    status: 'Hello new day !', 
                    likes: [111, 112], 
                    comments: [
                        {id: 111, username: 'systemis', comment: 'Hahaha, like it !', date: new Date().toLocaleDateString()},
                        {id: 111, username: 'systemis', comment: 'Hahaha, like it !', date: new Date().toLocaleDateString()},
                        {id: 111, username: 'systemis', comment: 'Hahaha, like it !', date: new Date().toLocaleDateString()},
                        {id: 111, username: 'systemis', comment: 'Hahaha, like it !', date: new Date().toLocaleDateString()},
                        {id: 111, username: 'systemis', comment: 'Hahaha, like it !', date: new Date().toLocaleDateString()},
                    ],
                    photos: [exW1, exW2]
                },


                {   
                    id: 92043229,
                    user: {id: '999', username: 'systemis', avatar: exam},
                    status: 'Hello new day !', 
                    likes: [111, 112], 
                    comments: [
                        {id: 111, username: 'systemis', comment: 'Hahaha, like it !', date: new Date().toLocaleDateString()},
                        {id: 111, username: 'systemis', comment: 'Hahaha, like it !', date: new Date().toLocaleDateString()},
                        {id: 111, username: 'systemis', comment: 'Hahaha, like it !', date: new Date().toLocaleDateString()},
                        {id: 111, username: 'systemis', comment: 'Hahaha, like it !', date: new Date().toLocaleDateString()},
                        {id: 111, username: 'systemis', comment: 'Hahaha, like it !', date: new Date().toLocaleDateString()},
                    ],
                    photos: [exW1, exW2]
                }
            ]
        }
    }

    getClientInfo(){    
        const {dispatch} = this.props;
        userMG.getClientInfo((err, result) => {
            if(err) {
                dispatch({type: `CHANGE_CLIENT_INFO`, value: ''});
                dispatch({type: `CHANGE_USER_SELECTED_INFO`, value: ''});
                return;
            }

            dispatch({type: `CHANGE_CLIENT_INFO`, value: result});
            dispatch({type: `CHANGE_USER_SELECTED_INFO`, value: result});
        })
    }

    componentWillMount() {
        this.getClientInfo();
    }

    render() {
        return (
            <div className="home-page">
                <UserInfoField clientInfo={true}/>
                <div className="layout">
                    <div className="show-posts">
                        {this.state.posts.map((post, index) => {
                            return <PostCard 
                                        key={index} 
                                        postInfo={post} 
                                        isShowinDialog={false}/>
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(state => {
    return{
        screenVersion: state.screenVersion
    }
})(HomePage);