import React, { Component } from 'react';
class ToolsComponent extends Component {
    constructor(props){
        super(props);
        this.state = {isShowNotifis: false}
    }

    onClickHeart(){
        this.setState({isShowNotifis: !this.state.isShowNotifis});
    }

    render() {
        const sss = () => {
            if(this.state.isShowNotifis){
                return (
                    <div id='notifis-group'>
                    
                    </div>
                )
            }
        }
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
                </ul>
                {sss()}
            </div>
        );
    }
}

export default ToolsComponent;