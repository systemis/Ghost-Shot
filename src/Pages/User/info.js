import React, { Component } from 'react';
import {connect}            from 'react-redux';
import PostItem             from './post-item.js';
import userMG               from '../../js/user.js';
import postsMG              from '../../js/posts.js';
import image                from '../../image/ex-avatar.png';
import ex1                  from '../../image/ex-w-1.png';
import ex2                  from '../../image/ex-w-2.png';
import './Style/info-style.css';
class UserInfoPage extends Component {
    constructor(props){
        super(props);
        const username =  () => {
            if(window.location.href.indexOf('home') === -1){
                return this.props.match.params.username  
            } 

            return;
        }

        this.state = {
            isExists: false, 
            clFollowing: [],
            userFollower: [],
            posts: [],
            info:{
                username:  username(),
                follower: [11, 12],
                following: [22, 23],
                avatar: '',
                posts: [{
                    id: 'exavs',
                    value: ex1
                }, {
                    id: 'exasss',
                    value: ex1
                }, {
                    id: 'exadsdsss',
                    value: ex2
                }, {
                    id: 'exaso77ss',
                    value: ex2
                }, {
                    id: 'exdsasss',
                    value: ex2
                }, {
                    id: 'exdasdadsdsdsss',
                    value: ex2
                }, {
                    id: 'exdasdaaasss',
                    value: ex2
                }, {
                    id: 'exdasdasa3ss',
                    value: ex2
                }, {
                    id: 'exdasdassdss',
                    value: ex2
                }],
            }
        }
    }

    getPostsInfo(postsId){
        var posts = [];
        postsId.map((id, index) => {
            postsMG.findPostById(id, (error, result) => {
                if(error) return index += 1;
                posts.push(result);
                if(index === postsId.length - 1){
                    this.setState({posts: posts});
                }
            })
        })
    }

    showFollowers(){
        console.log('Show follower');
    }

    showFollowing(){
        console.log('Show following');
    }


    followOrUnfollow(e){
        userMG.followOrUnfollow(this.props.info.username, (error, following) => {
            var userFollower = this.state.userFollower;
            var clFollowing  = this.state.clFollowing;

            if(following.length > clFollowing.length){
                userFollower.push(this.props.clientInfo.username);
            }else{
                userFollower.splice(clFollowing.indexOf(this.props.clientInfo.username, 1));
            }
            
            clFollowing = following;
            this.setState({clFollowing: following});
            this.setState({userFollower: userFollower});
        })
    }

    followBtn(){
        var text      = 'follow';
        var clientUS  = this.props.clientInfo.username;
        var userUS    = this.props.info.username;
        var following = this.state.clFollowing;

        if(!clientUS) return ;
        if(clientUS === userUS) return ;
        if(following.indexOf(userUS) >= 0) text = 'UnFollow';
        
        return (
             <span className="btn-follow-user">
                <button onClick={this.followOrUnfollow.bind(this)}> 
                        {text}
                </button>
            </span>
        )
    }

    editBtn(){
        userMG.isEdit(this.props.info.id, isEdit => {
            if(!isEdit){
                return document.getElementById('show-edit-btn').innerHTML = ''
            } 
            document.getElementById('show-edit-btn').innerHTML = '<i class="fa fa-pencil"></i>'
        })
    }

    componentWillMount() {
        if(window.location.href.indexOf('/user/') !== -1){
            const userName = this.props.match.params.username;
            userMG.findUserByName(userName, (err, result) => {
                if(err) {
                    return console.log(`Error when get user info by userName: ${err}`);
                }

                console.log(result);
                this.props.dispatch({type: `CHANGE_USER_SELECTED_INFO`, value: result});
            })
        }
    }

    render() {
        if(this.props.info.id === '0'){
            return (
                <div className="show-label-not-exists-user">
                    <h1 style={{textAlign: 'center', lineHeight: '100vh'}}>User not exists</h1>
                </div>
            )
        }

        return (
            <div className={`user-info-page mobile`}>
                <div className="layout">
                    <div className="show-info row">
                        <div className="show-user-avatar col-md-3 col-sm-3 col-xs-3">
                            <img src={this.props.info.avatar} alt="User avatar"/>
                        </div>
                        <div className="show-user-info col-md-9 col-sm-9 col-xs-9">
                            <div className="show-user-name show-btn-edit">
                                <div className="row">
                                    <ul className="tools-manager">
                                        <li className="show-username">
                                            <span className="show-name"> 
                                                {this.props.info.username} 
                                            </span>
                                            {this.followBtn()}
                                            <span id="show-edit-btn">
                                                {this.editBtn()}
                                            </span>
                                        </li>
                                    </ul>        
                                </div>
                            </div>
                            <div className="show-about-env">
                                <div className="row">
                                    <ul className="tools-manager">
                                        <li>
                                            <button>
                                                <strong>
                                                    {this.props.info.posts.length}
                                                </strong> Posts
                                            </button>
                                        </li>
                                        <li onClick={this.showFollowers}>
                                            <button>
                                                <strong>
                                                    {this.state.userFollower.length}
                                                </strong> Follower
                                            </button>
                                        </li>
                                        <li onClick={this.showFollowing}>
                                            <button>
                                                <strong>
                                                    {this.props.info.following.length}
                                                </strong> Following
                                            </button>
                                        </li>
                                    </ul>        
                                </div>
                            </div>
                            <div className="show-status">
                                <h4>{this.props.info.description}</h4>
                            </div>
                        </div>
                    </div>
                    <div className="show-posts row">
                        {this.state.posts.map((post, index) => {
                            return <PostItem post={post} key={index} />
                        })}
                    </div>
                </div>
            </div>
        );
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(nextProps.clientInfo.id !== this.props.clientInfo.id){
            this.setState({clFollowing: nextProps.clientInfo.following});
        }

        if(nextProps.info.id !== this.props.info.id){
            this.getPostsInfo(nextProps.info.posts);
            this.setState({userFollower: nextProps.info.follower});
        }

        return true;
    }
}

export default connect(state => {
    return {
        screenVersion: state.screenVersion,
        clientInfo: state.clientInfo,
        info: state.userSelectedInfo
    }
})(UserInfoPage);