import React, { Component } from 'react';
import {connect}            from 'react-redux';
import ex                   from '../../../image/ex-w-1.png';

class PhotoItem extends Component {
    newHeight(){
        const siItem = document.getElementById(`show-image-uploaded-imgur${this.props.index}`);
        siItem.style.height = siItem.clientWidth + 'px';
    }

    render() {
        const progressBar = () => {
            if(this.props.link) return;

            return(
                <div 
                    className="show-progress-bar"
                    style={{textAlign: 'center'}}>
                    Progress bar
                </div>
            )
        }

        const removeGroup = () => {
            if(!this.props.link) return;
            const removeEvent = () => {
                this.props.removeEvent(this.props.index);
            }

            return(
                <div className="btn-remove-group">
                    <button onClick={removeEvent.bind(this)}>
                        <span className="fa fa-times"></span>
                    </button>
                </div>
            )
        }

        return (
            <div className="photo-item col-md-4 col-sm-4 col-xs-4">
                <div 
                    className="child-photo-item"
                    id={`show-image-uploaded-imgur${this.props.index}`}
                    style={{backgroundImage: `url(${this.props.link})`}}>
                        {progressBar()}
                        {removeGroup()}
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
    return{
        callbacksResizeScreen: state.callbacksResizeScreen
    }
})(PhotoItem);