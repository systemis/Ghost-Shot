import React, { Component } from 'react';
import ex                   from '../../../image/ex-w-1.png';

class PhotoItem extends Component {
    render() {
        return (
            <div className="photo-item col-md-4 col-sm-4 col-xs-4">
                <div 
                    className="child-photo-item"
                    id={`show-image-uploaded-imgur${this.props.index}`}
                    style={{backgroundImage: `url(${ex})`}}>>
                </div>
            </div>
        );
    }

    componentDidMount() {
        const siItem = document.getElementById(`show-image-uploaded-imgur${this.props.index}`);
        siItem.style.height = siItem.clientWidth + 'px';
    }
}

export default PhotoItem;