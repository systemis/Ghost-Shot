import React, { Component } from 'react';
import {connect}            from 'react-redux';
import PostCard             from '../../Components/Card/post-card.js';
import appMG                from '../../js/app.js';
import UserInfoField        from '../User/info.js';
import userMG               from '../../js/user.js';
import './Style/style-home.css';

class HomePage extends Component {
    constructor(props){
        super(props);
        this.state = {
            posts: []
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
                                    className='in-dialog'
                                    key={index} 
                                    postInfo={post} />
                        })}
                    </div>
                </div>
            </div>
        );
    }

    shouldComponentUpdate(nextProps, nextState) {    
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