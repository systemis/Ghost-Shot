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
        const addNewPost = post => {
            var odl = [...this.state.posts];
            odl.push(post);
            this.setState({posts: odl});
        }

        postsId.map((id, index) => {
            postsMG.findPostById(id, (error, result) => {
                if(!error){
                    addNewPost(result);
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

    componentWillMount() {
        if(window.location.href.indexOf('/user/') !== -1){
            const userName = this.props.match.params.username;
            userMG.findUserByName(userName, (err, result) => {
                if(err) {
                    return console.log(`Error when get user info by userName: ${err}`);
                }

                this.props.dispatch({type: `CHANGE_USER_SELECTED_INFO`, value: result});
            })
        }
    }

    render() {
        // if(this.props.info.id === '0'){
        //     return (
        //         <div className="show-label-not-exists-user">
        //             <h1 style={{textAlign: 'center', lineHeight: '100vh'}}>User not exists</h1>
        //         </div>
        //     )
        // }

        const editBtn = () => {
            userMG.isEdit(this.props.info.id, isEdit => {
                if(!isEdit) return;
                document.getElementById('show-edit-btn').innerHTML = '<i class="fa fa-pencil"></i>'
            })
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
                                            {this.props.info.username}
                                            <span id="show-edit-btn">
                                                {editBtn()}
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
                                                    {this.props.info.follower.length}
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
        if(nextProps.info && nextProps.info !== this.props.info){
            this.getPostsInfo(nextProps.info.posts);
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