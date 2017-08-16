import React, { Component } from 'react';
import './Style/new-post-style.css';

class PostGroup extends Component {
    constructor(props){
        super(props);
        this.state = {
            index: 0,

        }
    }

    render() {
        return (
            <div className="new-post-group">
                Post group
                <div className="child-group">

                </div>
            </div>
        );
    }
}

export default PostGroup;