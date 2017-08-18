import React, { Component } from 'react';
import $ from 'jquery';

class PhotoPostItem extends Component {
    onloadImage(e){
        e.preventDefault();
        const value    = $('#uploadFileItem1')[0].files[0];
        const formData = new FormData();
        formData.append('image', $('#uploadFileItem1')[0].files[0])
        
        this.props.addPhoto('');
        $.ajax({
            url: `/upload/image/imgur`,
            data: formData, 
            contentType: false,
            processData: false,
            type: 'POST',
            success: data => this.props.addPhoto(data),
            error: err => console.log(err)
        })
    }
    
    render() {
        return (
            <div className="photo-post-item">
                <input 
                    id="uploadFileItem1" 
                    type="file"
                    name="image"
                    onChange={this.onloadImage.bind(this)}
                    />
            </div>
        );
    }

    componentDidMount() {
    }
}

export default PhotoPostItem;