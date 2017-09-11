import React, { Component } from 'react';
import {connect}            from 'react-redux';
import PostCard             from '../../Components/Card/post-card.js';
import appMG                from '../../js/app.js';
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
                    id: '92043229',
                    user: {id: '999', username: 'systemis', avatar: exam},
                    status: 'Hello new day !', 
                    likes: [{id: 111}, {id: 112}],
                    comments: [
                        {id: 111, user: {username: 'systemis'}, comment: 'Hahaha, like it !', date: new Date().toLocaleDateString()},
                        {id: 111, user: {username: 'systemis'}, comment: 'Hahaha, like it !', date: new Date().toLocaleDateString()},
                        {id: 111, user: {username: 'systemis'}, comment: 'Hahaha, like it !', date: new Date().toLocaleDateString()},
                    ],
                    photos: [exW1, exW2]
                },

                {   
                    id: '92029',
                    user: {id: '999', username: 'systemis', avatar: exam},
                    status: 'Hello new day !', 
                    likes: [{id: 111}, {id: 112}],
                    comments: [
                        {id: 111, user: {username: 'systemis'}, comment: 'Hahaha, like it !', date: new Date().toLocaleDateString()},
                        {id: 111, user: {username: 'systemis'}, comment: 'Hahaha, like it !', date: new Date().toLocaleDateString()},
                        {id: 111, user: {username: 'systemis'}, comment: 'Hahaha, like it !', date: new Date().toLocaleDateString()},
                    ],
                    photos: [exW1, exW2]
                },


                {   
                    id: '204322329',
                    user: {id: '999', username: 'systemis', avatar: exam},
                    status: 'Hello new day !', 
                    likes: [{id: 111}, {id: 112}],
                    comments: [
                        {id: 111, user: {username: 'systemis'}, comment: 'Hahaha, like it !', date: new Date().toLocaleDateString()},
                        {id: 111, user: {username: 'systemis'}, comment: 'Hahaha, like it !', date: new Date().toLocaleDateString()},
                        {id: 111, user: {username: 'systemis'}, comment: 'Hahaha, like it !', date: new Date().toLocaleDateString()},
                    ],
                    photos: [exW1, exW2]
                }
            ]
        }
    }

    componentWillMount() {
        this.setState({posts: this.props.clientInfo.newfeed || []});
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

    shouldComponentUpdate(nextProps, nextState) {    
        console.log(nextProps.clientInfo);
        console.log(nextProps.clientInfo.newfeed);
        this.setState({posts: nextProps.clientInfo.newfeed});
        return true;
    }
}

export default connect(state => {
    return{
        screenVersion: state.screenVersion,
        clientInfo: state.clientInfo,
    }
})(HomePage);