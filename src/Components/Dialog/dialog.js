import React, { Component } from 'react';
import {connect}            from 'react-redux';

class DialogField extends Component {
    constructor(props){
        super(props);
        this.state = {}
    }

    exitDialog(){       
        this.props.dispatch({type: 'CHANGE_DIALOG', value: ''});
    }

    newHeight(){
        document.getElementById('dialog-field').style.height = 
        document.getElementById('main-layout').clientHeight + 90 + 'px';
    }

    mainLayout(){
        if(!this.props.dialogInfo){return ;}

        return this.props.dialogInfo.component;
    }

    componentWillMount(){

    }

    render() {
        return (
            <div id="dialog-field">
                <div className="layout">
                    <button 
                        className="exit-btn"
                        onClick={this.exitDialog.bind(this)}> 
                        <i className="fa fa-times"></i>
                    </button>
                    <br/>
                    <div className="child">
                        {this.mainLayout()}
                    </div>
                </div>
            </div>
        );
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log(nextProps.dialogInfo);
        if(nextProps.dialogInfo){
            document.getElementById('dialog-field').classList.add('show');
            this.newHeight();     
            this.props.dispatch({type: `ADD_CALLBACK_RESIZE_SCREEN`, value: this.newHeight});
        }

        return true;        
    }
}

export default connect(state => {
    return {
        screenVersion: state.screenVersion,
        dialogInfo: state.dialogInfo
    }
})(DialogField);