import React, { Component } from 'react';
import {connect}            from 'react-redux';

class PostStatusGroup extends Component {
    changeStatus(){
        const value = document.getElementById('input-status-field-create-post').value;
        this.props.changeStatus(value);
    }

    newHeight(){
        const childGroup = document.getElementById('child-group-post-status');
        const imageGroup = document.getElementsByClassName('show-image-post-status')[0];
        childGroup.style.height = imageGroup.clientWidth + 'px';
    }

    render() {
        return (
            <div className="post-status-group">
                <div id="child-group-post-status" className="row">
                    <div className="show-image-post-status col-md-3 col-sm-3 col-xs-3">
                        <div 
                            className="child-group-show-imageselected"
                            style={{backgroundImage: `url(${this.props.photo[0]})`}}>

                        </div>
                    </div>
                    <div className="show-input-status-field col-md-9 col-sm-9 col-xs-9">
                        <textarea 
                            name="status-post" 
                            placeholder="Bạn muốn gởi gì đến mọi người "
                            onChange={this.changeStatus.bind(this)}
                            id="input-status-field-create-post">
                        </textarea>
                    </div>
                </div>
                <div className="show-btn-upload">
                    <button 
                        id="new-post-btn"
                        onClick={() => this.props.uploadPost()}>
                            Upload
                    </button>
                </div>
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
}

export default connect(state => {
    return {
        callbacksResizeScreen: state.callbacksResizeScreen
    }
})(PostStatusGroup);