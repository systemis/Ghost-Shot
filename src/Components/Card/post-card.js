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
            isLike: false,
            likes: [],
            comments: [],
            countToShowComment: 3
        }
    }

    scroll(){
        const field = document.getElementById(`show-comments-group-${this.props.postInfo.id}`);
        field.scrollTop = field.scrollHeight;
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
        var old   = this.state.isLike;
        postMG.likeOrUnLike(this.props.postInfo.id, (error, result) => {
            if(error) return;

            console.log(result);
            this.setState({isLike: !old});
            this.setState({likes: result});
        })
    }

    postComment(e){
        e.preventDefault();
        
        const field   = document.getElementById(`post-comment-field-${this.props.postInfo.id}`);
        const comment = field.value;
        postMG.addNewComment(this.props.postInfo.id, comment, (error, result) => {
            if(error) {
                alert(`Có lỗi xảy ra: ${error}, vui long thử lại sau !`);
                return window.location.reload();
            }

            var old = this.state.comments;
            old.push({
                comment: comment, 
                user: {
                    id: this.props.clientInfo.id, 
                    username: this.props.clientInfo.username, 
                    avatar: this.props.clientInfo.avatar
                }
            })

            this.setState({comments: old});
            field.value = '';
        })
        
        return false;
    }

    componentWillMount() {
        console.log(this.props.postInfo.likes);
        this.setState({comments: this.props.postInfo.comments});
        this.setState({likes: this.props.postInfo.likes});
    }

    render() {
        var moreCommentBtn = () => {
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

        var styleForLikeBtn = {color: 'black'};
        if(this.state.isLike){
            styleForLikeBtn.color = 'red';
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
                        <li onClick={this.likePost.bind(this)}>
                            <i 
                                style={styleForLikeBtn}
                                className="fa fa-heart"></i>
                        </li>
                    </ul>
                </div>
                <div className="show-like-count">
                    <button 
                        className='show-user-like-btn'
                        onClick={this.showUserLiked.bind(this)}> 
                            {this.state.likes.length} like 
                    </button>
                </div>
                {moreCommentBtn()}
                <div 
                    className="show-comments"
                    id={`show-comments-group-${this.props.postInfo.id}`}>
                    <CommentRow comment={{
                            comment: this.props.postInfo.status,
                            user: {
                                username: this.props.postInfo.user.username, 
                            },
                        }
                    } />
                    {this.state.comments.map((comment, index) => {
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
        this.scroll();
        this.props.postInfo.likes.map((user, index) => {
            if(user.id === this.props.clientInfo.id){
                this.setState({isLike: true});
        }});
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(nextProps.clientInfo !== this.props.clientInfo || 
            nextProps.postInfo.id !== this.props.postInfo.id){
                nextState.likes.map((user, index) => {
                    if(user.id === nextProps.clientInfo.id){
                        this.setState({isLike: true});
                }
            })
        }

        this.render();
        this.scroll();
        return true;        
    }
}

export default connect(state => {
    return {
        screenVersion: state.screenVersion,
        clientInfo: state.userSelectedInfo,
    }
})(PostCard);