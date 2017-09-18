import React, { Component } from 'react';
import {connect}            from 'react-redux';
import PostCard             from '../../Components/Card/post-card.js';
import postMG               from '../../js/posts.js';

const mainLayoutStyle = {
    maxWidth: `600px`,
    margin: '0 auto',
    paddingTop: '2em'
}

class PostShow extends Component {
    constructor(props){
        super(props);
        this.state = {postInfo: ''}
    }

    componentWillMount(){
    }

    layout(){
        if(this.state.postInfo){
            return (
                <PostCard
                    className={'in-page'}
                    postInfo={this.state.postInfo} />
            )
        }

        return ;
    }

    render() {
        return (
            <div className="post-show-page">
                <div    
                    className='show-post-info row' 
                    style={mainLayoutStyle}>
                        {this.layout()}
                </div>
            </div>
        );
    }

    componentDidMount() {
        const postId = this.props.match.params.postId;
        postMG.findPostById(postId, (error, info) => {
            if(error) return console.log(error);
            
            console.log(postId);
            console.log(info);
            return this.setState({postInfo: info});
        })
    }
}

export default connect(state => {
    return {
        clientInfo: state.clientInfo
    }
})(PostShow);