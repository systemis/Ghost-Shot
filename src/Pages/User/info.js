import React, { Component } from 'react';
import {connect}            from 'react-redux';
import UserListField        from '../../Components/Fields/users-list-field.js';
import PostItem             from './post-item.js';
import userMG               from '../../js/user.js';
import postsMG              from '../../js/posts.js';
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
                // username:  username(),
                // follower: [11, 12],
                // following: [22, 23],
                // avatar: '',
                // posts: [{
                //     id: 'exavs',
                //     value: ex1
                // }, {
                //     id: 'exasss',
                //     value: ex1
                // }, {
                //     id: 'exadsdsss',
                //     value: ex2
                // }, {
                //     id: 'exaso77ss',
                //     value: ex2
                // }, {
                //     id: 'exdsasss',
                //     value: ex2
                // }, {
                //     id: 'exdasdadsdsdsss',
                //     value: ex2
                // }, {
                //     id: 'exdasdaaasss',
                //     value: ex2
                // }, {
                //     id: 'exdasdasa3ss',
                //     value: ex2
                // }, {
                //     id: 'exdasdassdss',
                //     value: ex2
                // }],
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
        const followers = this.props.info.follower;
        if(followers.length <= 0) return ;
        this.props.dispatch({
            type: `CHANGE_DIALOG`,
            value: {
                type: `user_list`,
                bundle: null,
                component: <UserListField data={followers} />
            }
        })
    }

    showFollowing(){
        const following = this.props.info.following;
        if(following.length <= 0) return ;
        this.props.dispatch({
            type: `CHANGE_DIALOG`,
            value: {
                type: `user_list`,
                bundle: null,
                component: <UserListField data={following} />
            }
        })
    }

    // nextCLF: next client following 
    updateUserFollower(nextCLF){
        var userInfo     = {...this.props.info};
        var clFollowing  = this.state.clFollowing;
        var userFollower = userInfo.follower;

        if(nextCLF.length > clFollowing.length){
            userFollower.push(this.props.clientInfo.username);
        }else{
            userFollower.splice(clFollowing.indexOf(this.props.clientInfo.username, 1));
        }

        userInfo.follower    = userFollower;
        this.setState({userFollower: userFollower});
        this.props.dispatch({type: `CHANGE_USER_SELECTED_INFO`, value: userInfo});
    }

    followOrUnfollow(e){
        userMG.followOrUnfollow(this.props.info.username, (error, following) => {
            if(error) return ;
            var clInfo = {...this.props.clientInfo};
            clInfo.following = following;

            this.props.dispatch({type: `CHANGE_CLIENT_INFO`, value: clInfo});
        })
    }

    btnFOF(){
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
        
        const showFollowing = () => {
            if(this.props.info.id !== this.props.clientInfo.id ){
                return this.props.info.following.length ;
            }else{
                return this.props.clientInfo.following.length
            }
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
                                            {this.btnFOF()}
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
                                        <li onClick={this.showFollowers.bind(this)}>
                                            <button>
                                                <strong>
                                                    {this.state.userFollower.length}
                                                </strong> Follower
                                            </button>
                                        </li>
                                        <li onClick={this.showFollowing.bind(this)}>
                                            <button>
                                                <strong>
                                                    {showFollowing()}
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

    shouldComponentUpdate(nextProps, nextState){
        // Do other something        
        if(nextProps.info.id !== this.props.info.id){
            this.getPostsInfo(nextProps.info.posts);
            this.setState({userFollower: nextProps.info.follower});
        }

        // Do something with client info 
        if(!nextProps.clientInfo.id) return true;
        if(nextProps.clientInfo.id !== this.props.clientInfo.id){
            this.setState({clFollowing: nextProps.clientInfo.following});
        }

        if(nextProps.clientInfo.following.length !== this.props.clientInfo.following.length){
            this.setState({clFollowing: nextProps.clientInfo.following});
            if(nextProps.clientInfo.id !== nextProps.info.id) {
                this.updateUserFollower(nextProps.clientInfo.following);
            }
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