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
                        <div className="child">
                            <label htmlFor="uploadFileItem1">Choose a file</label>
                        </div>
                </div>
                
                <PhotoPostItem 
                    addPhoto={this.props.addPhoto}/>
            </div>
        );
    }

    componentDidMount() {
        document.getElementById('photo-post-group').style.height = 
        document.getElementById('photo-post-group').clientWidth - 1 + 'px';
        
    }
    
    shouldComponentUpdate(nextProps, nextState) {
        console.log(nextProps.photo);
        return true;
    }
}

export default PostPhotoGroup;