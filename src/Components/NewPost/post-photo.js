import React, { Component } from 'react';
import {connect}            from 'react-redux';
import PhotoItem            from './Components/photo.item.js';
import PhotoPostItem        from './Components/photo-post-item.js';

class PostPhotoGroup extends Component {
    newHeight(){    
        const dhupLoadImage  = document.getElementById('dh-upload-image');
        const photoPostGroup = document.getElementById('photo-post-group');
        console.log(photoPostGroup.clientWidth)
        photoPostGroup.style.height     = photoPostGroup.clientWidth + 4 + 'px';
        dhupLoadImage .style.lineHeight = photoPostGroup.clientWidth + 4 + 'px';
    }

    render() {
        return (
            <div className="post-photo-group row">
                {this.props.photo.map((link, index) => {
                    return(
                        <PhotoItem 
                            key={index}
                            index={index} 
                            link={link} 
                            removeEvent={this.props.removePhoto}/>
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
        this.newHeight();
        this.props.dispatch({
            type: `ADD_CALLBACK_RESIZE_SCREEN`, 
            value: this.newHeight.bind(this)
        });
    }
    
    shouldComponentUpdate(nextProps, nextState) {
        console.log(nextProps.photo);
        return true;
    }
}

export default connect(state => {
    return {
        callbacksResizeScreen: state.callbacksResizeScreen
    }
})(PostPhotoGroup);