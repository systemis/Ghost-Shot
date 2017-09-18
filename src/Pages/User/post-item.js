import React, { Component } from 'react';
import {connect}            from 'react-redux';
import PostCard             from '../../Components/Card/post-card.js';
import exam from '../../image/ex-avatar.png';
class PostItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            detailsInfo: {
                id: this.props.post.id,
                user: {id: '999', username: 'systemis', avatar: exam},
                status: 'Hello new day !', 
                like: [111, 112], 
                comments: [
                    {id: 111, username: 'systemis', comment: 'Hahaha, like it !', date: new Date().toLocaleDateString()},
                    {id: 111, username: 'systemis', comment: 'Hahaha, like it !', date: new Date().toLocaleDateString()},
                    {id: 111, username: 'systemis', comment: 'Hahaha, like it !', date: new Date().toLocaleDateString()},
                    {id: 111, username: 'systemis', comment: 'Hahaha, like it !', date: new Date().toLocaleDateString()},
                    {id: 111, username: 'systemis', comment: 'Hahaha, like it !', date: new Date().toLocaleDateString()},
                ],
                images: [this.props.post.value]
            }
        }
    }

    getDetailsInfo(){
    }

    showPost(){
        var classNameId = `post-card-w-id-${this.props.post.id}`;
        this.props.dispatch({
            type: 'CHANGE_DIALOG', 
            value: { type: 'post', bundle: {type: `POST_ID`, idDom: classNameId}, component:
            <PostCard
                id={this.props.post.id} 
                postInfo={this.props.post}
                id={classNameId}
                className={`in-dialog`}/>
            }
        })
    }

    render() {
        return (
            <div 
                className='post-item-mini col-md-4 col-sm-4 col-xs-6'>
                <div className="child">
                    <div 
                        className="show-value"
                        id={`show-value-post-${this.props.post.id}`}
                        style={{backgroundImage: `url(${this.props.post.photos[0]})`}}>
                        <button
                            className="dh-btn"
                            onClick={this.showPost.bind(this)}>
                            <div className="show-env">
                                <p className="show-like-count">{this.props.post.likes.length} Like</p>
                                <p className="show-comment-count">{this.props.post.comments.length} Comment</p>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount() {
        const changeSize = () => {
            const showValueField        = document.getElementById(`show-value-post-${this.props.post.id}`);
            showValueField.style.height = `${document.getElementsByClassName('post-item-mini')[0].clientWidth}px`;
        }

        changeSize();
        this.props.dispatch({type: `ADD_CALLBACK_RESIZE_SCREEN`, value: changeSize})
    }
}

export default connect(state => {
    return {
        dialogInfo: state.dialogInfo
    }
})(PostItem);