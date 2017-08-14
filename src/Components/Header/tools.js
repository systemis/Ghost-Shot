import React, { Component } from 'react';
import ex from '../../image/logo.png';
import $  from 'jquery';
class ToolsComponent extends Component {
    constructor(props){
        super(props);
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
                    <li className="show-client-avatar">
                        <a href="/systemis">
                            <img src={ex} alt="User avatar"/>
                        </a>
                    </li>
                </ul>
                <div id='notifis-group'>
                    
                </div>
            </div>
        );
    }
}

export default ToolsComponent;