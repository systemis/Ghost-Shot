import React, { Component } from 'react';

class PhotoItem extends Component {
    render() {
        return (
            <div 
                className="photo-item"
                style={{
                    width: '120px',
                    height: '120px',
                    backgroundSize: 'cover',
                    backgroundImage: `url(${this.props.link})`
                }}>
                
            </div>
        );
    }
}

export default PhotoItem;