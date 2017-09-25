import React, { Component } from 'react';
import $ from 'jquery';

class NotificationItem extends Component {
    render() {
        return (
            <div className="notification-item">
                <div className="row">
                    <div className="show-image col-md-2 col-sm-2 col-xs-2">
                        <img src={this.props.info.image} />
                    </div>
                    <div 
                        className="show-message col-md-10 col-sm-10 col-xs-10"
                        id={`notiItem-${this.props.id}`}>
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount() {
        $(`#notiItem-${this.props.id}`).append($.parseHTML(this.props.info.message));
    }
}

export default NotificationItem;