import React, { Component } from 'react';
import PostPhoto from './post-photo.js';
import PostStatus from './post-status.js';
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
                    <div className="header">
                        
                    </div>
                    <div className="main-layout">
                        {this.state.screens[this.state.index]}
                    </div>
                </div>
            </div>
        );
    }
}

export default PostGroup;