import React, { Component } from 'react';
import {connect}            from 'react-redux';
import PostItem             from './post-item.js';
import image                from '../../image/ex-avatar.png';
import ex1                  from '../../image/ex-w-1.png';
import ex2                  from '../../image/ex-w-2.png';
import './Style/info-style.css';
class UserInfoPage extends Component {
    constructor(props){
        super(props);
        const username =  () => {
            if(this.props.clientInfo){
                return 'systemis'
            }

            return this.props.match.params.username
        }

        this.state = {
            username: username(),
            info:{
                username:  username(),
                follower: [11, 12],
                following: [22, 23],
                posts: [{
                    id: 'exavs',
                    value: ex1
                }, {
                    id: 'exasss',
                    value: ex2
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

    getInfoData(){

    }

    showFollowers(){
        console.log('Show follower');
    }

    showFollowing(){
        console.log('Show following');
    }
    
    componentWillMount() {
        this.getInfoData();
    }

    render() {
        return (
            <div className='user-info-page mobile'>
                <div className="layout">
                    <div className="show-info row">
                        <div className="show-user-avatar col-md-3 col-sm-3 col-xs-3">
                            <img src={image} alt="User avatar"/>
                        </div>
                        <div className="show-user-info col-md-9 col-sm-9 col-xs-9">
                            <div className="show-user-name show-btn-edit">
                                <div className="row">
                                    <ul className="tools-manager">
                                        <li className="show-username">
                                            {this.state.username}
                                            <i className="fa fa-pencil"></i>
                                        </li>
                                    </ul>        
                                </div>
                            </div>
                            <div className="show-about-env">
                                <div className="row">
                                    <ul className="tools-manager">
                                        <li>14 post</li>
                                        <li onClick={this.showFollowers}>
                                            <button>
                                                <strong>
                                                    {this.state.info.follower.length}
                                                </strong> Follower
                                            </button>
                                        </li>
                                        <li onClick={this.showFollowing}>
                                            <button>
                                                <strong>
                                                    {this.state.info.following.length}
                                                </strong> Following
                                            </button>
                                        </li>
                                    </ul>        
                                </div>
                            </div>
                            <div className="show-status">
                                <h4>Follow dream !</h4>
                            </div>
                        </div>
                    </div>
                    <div className="show-posts row">
                        {this.state.info.posts.map((post, index) => {
                            return <PostItem post={post} key={index} />
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(state => {
    return {
        screenVersion: state.screenVersion
    }
})(UserInfoPage);