import React, { Component } from 'react';
import $ from 'jquery';

class PhotoPostItem extends Component {
    onloadImage(e){
        e.preventDefault();
        const value    = $('#uploadFileItem1')[0].files[0];
        const formData = new FormData();
        formData.append('image', $('#uploadFileItem1')[0].files[0])
        console.log(formData);
        console.log(value);
        $.ajax({
            url: `/upload/image/imgur`,
            data: formData, 
            contentType: false,
            processData: false,
            type: 'POST',
            success: data => console.log(data),
            error: err => console.log(err)
        })
    }
    render() {
        return (
            <div className="photo-post-item">
                <form 
                    action="/upload/image/imgur"
                    method="POST"
                    encType="multipart/form-data"
                    onSubmit={this.onloadImage.bind(this)}
                    >
                        <input 
                            id="uploadFileItem1" 
                            type="file"
                            name="image"
                            // onChange={this.onloadImage}
                            />
                        <button>Submit</button>
                </form>
            </div>
        );
    }

    componentDidMount() {
    }
}

export default PhotoPostItem;