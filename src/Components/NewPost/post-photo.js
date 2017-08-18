import React, { Component } from 'react';
import PhotoItem            from './Components/photo.item.js';
import PhotoPostItem        from './Components/photo-post-item.js';

class PostPhotoGroup extends Component {
    render() {
        return (
            <div className="post-photo-group row">
                {this.props.photo.map((link, index) => {
                    return(
                        <PhotoItem 
                            key={index}
                            index={index + 1} 
                            link={link} />
                    )
                })}

                <div 
                    id="photo-post-group"
                    className="col-md-4 col-sm-4 col-xs-4">
                        <div className="child-photo-item">
                            <label 
                                id="dh-upload-image"
                                htmlFor="uploadFileItem1">
                                <i className="fa fa-plus" aria-hidden="true"></i>
                            </label>
                        </div>
                </div>
                
                <PhotoPostItem 
                    addPhoto={this.props.addPhoto}/>
            </div>
        );
    }

    componentDidMount() {
        const dhupLoadImage  = document.getElementById('dh-upload-image');
        const photoPostGroup = document.getElementById('photo-post-group');
        photoPostGroup.style.height    = photoPostGroup.clientWidth - 1 + 'px';
        dhupLoadImage .style.lineHeight = photoPostGroup.clientWidth - 1 + 'px';
        
    }
    
    shouldComponentUpdate(nextProps, nextState) {
        console.log(nextProps.photo);
        return true;
    }
}

export default PostPhotoGroup;