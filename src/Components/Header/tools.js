import React, { Component } from 'react';
import NewPostGroup         from '../NewPost/new-post.js';
import {connect}            from 'react-redux';
// import ex from '../../image/logo.png';
import $  from 'jquery';
class ToolsComponent extends Component {
    constructor(props){
        super(props);
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
                            className="fa fa-heart"
                            onClick={this.onClickHeart.bind(this)}>
                            <span className="show-notifi-count"> 
                                1 
                            </span>
                        </i>
                    </li>
                    <li>
                        <a href="/explore">
                            <i className="fa fa-compass" aria-hidden="true" />
                        </a>
                    </li>
                    <li>
                        <button onClick={this.showDialogNewPost.bind(this)}>
                            <i className="fa fa-plus"></i>
                        </button>
                    </li>
                </ul>
                <div id='notifis-group'>
                    
                </div>
            </div>
        );
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