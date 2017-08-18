import React, { Component } from 'react';

class PhotoItem extends Component {
    render() {
        return (
            <div 
                className="photo-item"
                style={{backgroundImage: `url(${this.props.link})`}}>
                
            </div>
        );
    }
}

export default PhotoItem;