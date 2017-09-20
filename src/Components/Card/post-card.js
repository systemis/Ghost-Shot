import React, { Component } from 'react';
import {connect}            from 'react-redux';
import UserListField        from '../Fields/users-list-field.js';
import PostValueCard        from './Components/post-value-card.js';
import CommentRow           from './Components/comment-row.js';
import userMG               from '../../js/user.js';
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

    exitGroup(){
        this.props.dispatch({type: 'CHANGE_DIALOG', value: ''});
    }

    scroll(){
        const field     = document.getElementById(`show-comments-group-${this.props.postInfo.id}`);
        field.scrollTop = field.scrollHeight;
    }

    showUserLiked(){
        const usersLiked = this.state.likes;
        if(usersLiked.length <= 0) return ;
        this.props.dispatch({
            type: 'CHANGE_DIALOG',
            value: {
                type: 'user_list',
                bundle: null,
                component: <UserListField data={usersLiked}/>
            }
        })
    }

    // TO DO something for someone post when user loged in app 
    whenLogin(callBack){
        userMG.getClientInfo((error, result) => {
            if(error) {
                alert(`Bạn chưa đăng nhập, hãy đăng nhập để tiếp tục !`)
                return window.location.href = '/sign-in';
            }

            callBack();
        })
    }

    likeOrUnlikePost(){
        const like = () => {
            var old   = this.state.isLike;
            postMG.likeOrUnLike(this.props.postInfo.id, (error, result) => {
                if(error) return;

                if(!old === true){
                    const notification = {
                        type: `LIKE`,
                        sendUser: this.props.clientInfo,
                        receiveUser: this.props.postInfo.user
                    }

                    this.props.socket.sendNotification(notification);
                }

                this.setState({isLike: !old});
                this.setState({likes: result});
            })
        }

        this.whenLogin(like.bind(this));
    }

    postComment(e){
        e.preventDefault();
        const newCommnet = () => {
            const field   = document.getElementById(`post-comment-field-${this.props.postInfo.id}`);
            const comment = field.value;
            postMG.addNewComment(this.props.postInfo.id, comment, (error, comment) => {
                if(error) {
                    alert(`Có lỗi xảy ra: ${error}, vui long thử lại sau !`);
                    return window.location.reload();
                }

                var old = this.state.comments;
                old.push(comment);
                
                this.setState({comments: old});
                this.scroll();
                
                field.value = '';
            })
        }

        this.whenLogin(newCommnet.bind(this));
        return false;
    }

    componentWillMount() {
        this.setState({comments: this.props.postInfo.comments});
        this.setState({likes: this.props.postInfo.likes});
    }

    render() {
        // Custom to show more comment button 
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

        // Custom to show exit group if posts is showed in dialog 
        const exitGroup = () => {
            if(this.props.className !== 'in-dialog') return;
            
            return (
                <div className="show-exit-btn" style={{float: 'left', width: `10%`}}>
                    <button onClick={this.exitGroup.bind(this)}>
                        <span className="fa fa-times"></span>
                    </button>
                </div>
            )
        }

        // Comment list of post
        const commentsList = () => {
            var comments = [];
            var indexST  = this.state.comments.length - 1 - this.state.countToShowComment;
            if(indexST < 0) indexST = 0;
            for(var i = indexST; i < this.state.comments.length; i++) {
                comments.push(this.state.comments[i]);
            }
            
            return comments;
        }

        // Set color for like btn. Red if liked or black if did not like 
        const styleForLikeBtn = () => {
            if(this.state.isLike){
                return {
                    color: 'red'
                }
            }

            return {
                color: 'black'
            }
        }

        return (
            <div 
                className={`post-card ${this.props.className || ''}`}
                id={`postCard-${this.props.postInfo.id}-${this.props.className || ''}`}>
                <div className="header row">
                    <div className="show-user-info">
                        <img 
                            src={this.props.postInfo.user.avatar} 
                            alt="user avatar" 
                            className="show-user-avatar"/>
                        <a 
                            href={`/user/${this.props.postInfo.user.username}`}
                            className="show-user-username">
                            {this.props.postInfo.user.username}
                        </a>
                    </div>
                    {exitGroup()}
                </div>
                <div 
                    className="show-image"
                    onDoubleClick={this.likeOrUnlikePost.bind(this)}>
                    <PostValueCard 
                        inDialog={this.props.className || ''}
                        postId={this.props.postInfo.id}
                        images={this.props.postInfo.photos} />
                </div>
                <div className="show-tools">
                    <ul className='tools-manager-post-card'>
                        <li onClick={this.likeOrUnlikePost.bind(this)}>
                            <i 
                                style={styleForLikeBtn()}
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
                            },}} 
                        />
                    
                    {commentsList().map((comment, index) => {
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

        if(this.props.className === 'in-dialog'){
            var newHeight = () => {
                var childGroup = document.getElementById(`child-group-dialog`);
                var postCard   = document.getElementById(`postCard-${this.props.postInfo.id}-${this.props.className || ''}`);
                
                // Catch error when postCard did not load 
                if(!postCard) return;
                
                var height = (childGroup.clientHeight - postCard.clientHeight)/2+ 'px';
                childGroup.style.paddingTop = height;
            }

            newHeight();
            this.props.dispatch({type: `ADD_CALLBACK_RESIZE_SCREEN`, value: newHeight.bind(this)});
        }

        if(this.props.className === 'in-page'){

        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        this.scroll();
        return true;        
    }
}

export default connect(state => {
    return {
        screenVersion: state.screenVersion,
        clientInfo: state.clientInfo,
        socket: state.socket
    }
})(PostCard);