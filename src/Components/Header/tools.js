import React, { Component } from 'react';
import NewPostGroup         from '../NewPost/new-post.js';
import {connect}            from 'react-redux';
import appMG                from '../../js/app.js';
// import ex from '../../image/logo.png';
import $  from 'jquery';
class ToolsComponent extends Component {
    constructor(props){
        super(props);

        this.onClickHeart      = this.onClickHeart.bind(this);
        this.showDialogNewPost = this.showDialogNewPost.bind(this);
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
                                <span className="show-notifi-count"> 1 </span>
                        </i>
                    </li>
                    <li>
                        <a href="/explore">
                            <i className="fa fa-compass" aria-hidden="true" />
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
                    
                </div>
            </div>
        );
    }

    componentDidMount() {
        appMG.isLogin(isLogin => {
            if(!isLogin) return;
            
            var btnNewPost = document.getElementById('btn-create-new-post-dialog');
            var btnShowNTF = document.getElementById('btn-show-notifacation-dialog')
            btnNewPost.style.display = 'initial';
            btnShowNTF.style.display = 'initial';
            
            btnShowNTF.addEventListener('click', () => {
                this.onClickHeart();
            })

            btnNewPost.addEventListener('click', () => {
                this.showDialogNewPost();
            })
        })
    }
}

// <li className="show-client-avatar">
//                         <a href="/systemis">
//                             <img src={ex} alt="User avatar"/>
//                         </a>
//                     </li>

export default connect(state => {
    return{
        dialogInfo: state.dialogInfo
    }
})(ToolsComponent);