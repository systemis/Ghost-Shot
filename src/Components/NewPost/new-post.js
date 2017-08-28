import React, { Component } from 'react';
import {connect}            from 'react-redux';
import PostPhoto            from './post-photo.js';
import PostStatus           from './post-status.js';
import postsMG              from '../../js/posts.js';
import './Style/new-post-style.css';

class PostGroup extends Component {
    constructor(props){
        super(props);
        this.state = {
            screens: [],
            index: 0,
            photo: [],
            status: '',
        }
    }

    exitGroup(){
        this.props.dispatch({type: 'CHANGE_DIALOG', value: ''});
    }

    addPhoto(link){
        var photos = [...this.state.photo];
        if(photos.length >= 1 && photos[photos.length - 1] === ''){
            photos.splice(photos.length - 1, 1);
        }
        
        this.setState({photo: [...photos, link]});
    }

    removePhoto(index){
        var photos = [...this.state.photo];
        photos.splice(index, 1);
        this.setState({photo: photos});
    }

    changeStatus(status){
        this.setState({status: status});
    }

    uploadPost(){
        const status = this.state.status;
        const photos = this.state.photo
        if(!status || photos.length <= 0){
            return alert('Một số thông tin còn thiếu, xin mời kiểm tra lại!');
        }

        postsMG.newPost(status, photos, (error, result) => {
            if(!error){
                window.location.reload();
            }
        })
    }

    render() {
        const mainLayout = () => {
            if(this.state.index === 0){
                return (
                    <PostPhoto 
                        photo={this.state.photo}
                        addPhoto={this.addPhoto.bind(this)}
                        removePhoto={this.removePhoto.bind(this)}/>
                )
            }else{
                return(
                    <PostStatus 
                        photo={this.state.photo}
                        status={this.state.status}
                        changeStatus={this.changeStatus.bind(this)}
                        uploadPost={this.uploadPost.bind(this)}/>
                )
            }
        }

        const dhScreenButton = () => {
            var photos = this.state.photo;
            var enTry  = {
                classGroup: '',
                classLabel: '',
                event: '',
            }

            var styleSheets = {
                color: () => {
                    if(photos.length <= 0 || !photos[photos.length - 1]) {
                        return 'gray';
                    }
                    return 'black'
                }
            }

            if(this.state.index === 0){
                enTry.classGroup = 'next-btn-screen-new-post-group';
                enTry.classLabel = 'fa fa-chevron-right';
                // enTry.event      = () => this.setState({index: 1});
                if(photos.length > 0 && photos[photos.length - 1]){
                    enTry.event      = () => this.setState({index: 1});
                }
            }else{
                enTry.classGroup = 'back-btn-screen-new-post-group';
                enTry.classLabel = 'fa fa-chevron-left';
                enTry.event      = () => this.setState({index: 0});
            }

            return (
                <button
                    className={enTry.classGroup}
                    onClick={enTry.event}
                    style={{color: styleSheets.color()}}>
                        <span className={enTry.classLabel}></span>
                </button>   
            )
        }

        return (
            <div className="new-post-group">
                Post group
                <div className="child-group">
                    <div className="header row">
                        <div className="show-exit-btn">
                            <button
                                className="exit-btn-new-post-group"
                                onClick={this.exitGroup.bind(this)}>
                                <span className="fa fa-times"></span>
                            </button>
                        </div>
                        <div className="show-title-label">
                            <p>Create new post </p>
                        </div>
                        <div className="show-back-btn">
                            {dhScreenButton()}
                        </div>
                    </div>
                    <div className="main-layout">
                        {mainLayout()}
                    </div>
                </div>
            </div>
        );
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }
}

export default connect(state => {
    return {
        dialogInfo: state.dialogInfo
    }
})(PostGroup);