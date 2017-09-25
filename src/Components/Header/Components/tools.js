import React, { Component } from 'react';
import {connect}            from 'react-redux';
import NewPostGroup         from '../../NewPost/new-post.js';
import NotificationItem     from './notification-item.js';
import appMG                from '../../../js/app.js';
import userMG               from '../../../js/user.js';
// import ex from '../../image/logo.png';
import $  from 'jquery';
class ToolsComponent extends Component {
    constructor(props){
        super(props);

        this.onClickHeart      = this.onClickHeart.bind(this);
        this.showDialogNewPost = this.showDialogNewPost.bind(this);
    }

    showNewNotification(){
        var notifications = this.props.clientInfo.notifications || [];
        var valueReturn   = '';
        notifications.forEach((item, index, arr) => {
            if(!item.seen){
                if(!valueReturn) valueReturn = 0;
                valueReturn ++;
            }
        })

        return valueReturn;
    }

    showDialogNewPost(){
        this.props.dispatch({
            type: `CHANGE_DIALOG`,
            value: {
                type: `NEW_POST`,
                component: <NewPostGroup />
            }
        })
    }

    onClickHeart(){
        $("#notifis-group").toggle('hiden');
        var clientInfo    = this.props.clientInfo;
        var notifications = clientInfo.notifications || [];
        notifications.forEach((item, index, arr) => {
            if(!item.seen){
                item.seen = true;
            }
        })

        this.props.dispatch({type: `CHANGE_CLIENT_INFO`, value: {...clientInfo}});
        userMG.updateNotification(notifications, (error, result) => {
            console.log(error);
            console.log(result);
        })
    }

    render() {
        return (
            <div className="tools-group">
                <ul className="tools-mananger">
                    <li>
                        <i  
                        id="btn-show-notifacation-dialog"
                        className="fa fa-heart"
                        style={{display: 'none'}}>
                            <span className="show-notifi-count"> 
                                {this.showNewNotification() || ''}
                            </span>
                        </i>
                    </li>
                    <li>
                        <a 
                        href={`/user/${this.props.clientInfo.username}`}
                        id="btn-goto-client-info-page"
                        style={{display: 'none'}}>
                            <i  className="fa fa-user"
                                aria-hidden="true" />
                        </a>
                    </li>
                    <li>
                        <button 
                            id="btn-create-new-post-dialog"
                            style={{display: 'none'}}>
                                <i className="fa fa-plus"></i>
                        </button>
                    </li>
                </ul>
                <div id='notifis-group'>
                    {this.props.clientInfo.notifications.map((notification, index) => {
                        index = this.props.clientInfo.notifications.length - 1 - index;
                        notification = this.props.clientInfo.notifications[index];
                        return <NotificationItem 
                                key={index}
                                id={index}
                                info={{
                                    image: notification.sendUser.avatar,
                                    message: notification.message
                                }} />
                    })}
                </div>
            </div>
        );
    }

    componentDidMount() {
        appMG.isLogin(isLogin => {
            if(!isLogin) return;
            
            var btnNewPost = document.getElementById('btn-create-new-post-dialog');
            var btnShowNTF = document.getElementById('btn-show-notifacation-dialog')
            var btnShowIFP = document.getElementById('btn-goto-client-info-page')
            
            btnNewPost.style.display = 'initial';
            btnShowNTF.style.display = 'initial';
            btnShowIFP.style.display = 'initial';
            
            btnShowNTF.addEventListener('click', () => {
                this.onClickHeart();
            })

            btnNewPost.addEventListener('click', () => {
                this.showDialogNewPost();
            })
        })
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log(nextProps.clientInfo.notifications)   
        return true;     
    }
}

export default connect(state => {
    return{
        dialogInfo: state.dialogInfo,
        clientInfo: state.clientInfo
    }
})(ToolsComponent);