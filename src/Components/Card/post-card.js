import React, { Component } from 'react';
import {connect}            from 'react-redux';
import UserListField        from '../Fields/users-list-field.js';
import PostValueCard        from './Components/post-value-card.js';
import CommentRow           from './Components/comment-row.js';
import postMG               from '../../js/posts.js';
import './postcard-style.css';

class PostCard extends Component {
    constructor(props){
        super(props);
        this.state = {
            countToShowComment: 3
        }
    }

    showUserLiked(){
        this.props.dispatch({
            type: 'CHANGE_DIALOG',
            value: {
                type: 'user_list',
                component: <UserListField data={this.props.postInfo.likes}/>
            }
        })
    }

    likePost(){
        console.log(`someone just have liked post`);
    }

    postComment(e){
        e.preventDefault();
        console.log('Posting comment');
        const comment = document.getElementById(`post-comment-field-${this.props.postInfo.id}`).value;
        postMG.addNewComment(this.props.postInfo.id, comment, (error, result) => {
            console.log(error);
            console.log(result);
        })
        
        return false;
    }

    render() {
        const moreCommentBtn = () => {
            if(this.state.countToShowComment < this.props.postInfo.comments.length){
                return(
                    <button
                        className="more-comment-btn"
                        onClick={() => {
                            var old = this.state.countToShowComment;
                            old+=3;
                            this.setState({countToShowComment: old});
                        }}> 
                        Loading more comments 
                    </button>
                )
            }
        }

        return (
            <div className="post-card">
                <div className="show-user-info">
                    <img 
                        src={this.props.postInfo.user.avatar} 
                        alt="user avatar" 
                        className="show-user-avatar"/>
                    <a 
                        href={`/${this.props.postInfo.user.username}`}
                        className="show-user-username">
                        {this.props.postInfo.user.username}
                    </a>
                </div>
                <div className="show-image">
                    <PostValueCard 
                        postId={this.props.postInfo.id}
                        isShowInDialog={this.props.isShowInDialog}
                        images={this.props.postInfo.photos} />
                </div>
                <div className="show-tools">
                    <ul className='tools-manager-post-card'>
                        <li onClick={this.likePost}>
                            <i className="fa fa-heart"></i>
                        </li>
                    </ul>
                </div>
                <div className="show-like-count">
                    <button 
                        className='show-user-like-btn'
                        onClick={this.showUserLiked.bind(this)}> 
                            {this.props.postInfo.likes.length} like 
                    </button>
                </div>
                <div className="show-comments">
                    {moreCommentBtn()}
                    <CommentRow comment={{
                            comment: this.props.postInfo.status,
                            user: {
                                username: this.props.postInfo.user.username, 
                            },
                        }
                    } />
                    {this.props.postInfo.comments.map((comment, index) => {
                        if(index >= this.state.countToShowComment){ return; }
                        return (
                            <CommentRow comment={comment} key={index} />
                        )
                    })}
                </div>
                <div className="show-post-comment-field">
                    <form 
                        action="/"
                        className="form-post-comment-post"
                        onSubmit={this.postComment.bind(this)}>
                        <input 
                            type="text"
                            className="post-comment-field"
                            id={`post-comment-field-${this.props.postInfo.id}`}
                            placeholder="Thêm bình luận"/>
                    </form>
                </div>
            </div>
        );
    }

    componentDidMount() {
    }
}

export default connect(state => {
    return {
        screenVersion: state.screenVersion
    }
})(PostCard);