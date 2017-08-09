import React, { Component } from 'react';

class CommentRow extends Component {
    render() {
        return (
            <div className="comment-row">
                <div 
                    className="post-comment-row" >
                    <a 
                        href={`/${this.props.comment.username}`}
                        className="show-username">
                        {this.props.comment.username}
                    </a>
                    <span className="show-comment">
                        {this.props.comment.comment}
                    </span>
                </div>
            </div>
        );
    }
}

export default CommentRow;