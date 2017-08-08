import React, { Component } from 'react';
import $ from 'jquery';

class ToolsComponent extends Component {
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
                            onClick={this.onClickHeart}>
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
                </ul>
                <div id="notifis-group">
                
                </div>
            </div>
        );
    }
}

export default ToolsComponent;