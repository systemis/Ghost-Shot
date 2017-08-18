import React, { Component } from 'react';
import PhotoPostItem        from './Components/photo-post-item.js';

class PostPhotoGroup extends Component {
    render() {
        return (
            <div className="post-photo-group">
                <PhotoPostItem />
            </div>
        );
    }
}

export default PostPhotoGroup;