import React, { Component } from 'react';
import PhotoItem            from './Components/photo.item.js';
import PhotoPostItem        from './Components/photo-post-item.js';

class PostPhotoGroup extends Component {
    render() {
        return (
            <div className="post-photo-group">
                {this.props.photo.map((link, index) => {
                    <PhotoItem 
                            key={index} 
                            link={link} />
                })}
                <PhotoPostItem 
                    addPhoto={this.props.addPhoto}/>
            </div>
        );
    }
}

export default PostPhotoGroup;