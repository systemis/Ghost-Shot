import React, { Component } from 'react';
import {connect}            from 'react-redux';
import PostPhoto            from './post-photo.js';
import PostStatus           from './post-status.js';
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
        document.getElementById('dialog-field').classList.remove('show');
        this.props.dispatch({type: 'CHANGE_DIALOG', value: ''});
    }

    addPhoto(){

    }

    removePhoto(){

    }

    changeStatus(status){
        console.log(status);
    }

    componentWillMount() {
        this.setState({screens: [
            <PostPhoto 
                photo={this.state.photo}
                addPhoto={this.addPhoto.bind(this)}
                removePhoto={this.removePhoto.bind(this)}/>,
            <PostStatus 
                status={this.state.status}
                changeStatus={this.changeStatus.bind(this)}/>
        ]})        
    }

    render() {
        return (
            <div className="new-post-group">
                Post group
                <div className="child-group">
                    <div className="header row">
                        <div className="show-back-btn">
                            <button
                                className="back-btn-screen-new-post-group"
                                >
                                <span className="fa fa-chevron-left"></span>
                            </button>
                        </div>
                        <div className="show-title-label">
                            <p>Create new post </p>
                        </div>
                        <div className="show-exit-btn">
                            <button
                                className="exit-btn-new-post-group"
                                onClick={this.exitGroup.bind(this)}>
                                <span className="fa fa-times"></span>
                            </button>
                        </div>
                    </div>
                    <div className="main-layout">
                        {this.state.screens[this.state.index]}
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(state => {
    return {
        dialogInfo: state.dialogInfo
    }
})(PostGroup);