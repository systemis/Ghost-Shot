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
        document.getElementById('main-layout') .clientHeight + 90 + 'px';
    }

    setPaddingForChildGroup(id){
        var newHeight = () => {
            var childGroup = document.getElementById(`child-group-dialog`);
            var postCard   = document.getElementById(id);
        
            if(!postCard) return;
            var height = (childGroup.clientHeight - postCard.clientHeight)/2+ 'px';
            console.log(height);
            childGroup.style.paddingTop = height;
        }

        // do{
        //     console.log(document.getElementById(id));
        //     if(document.getElementById(id)){
        //         newHeight();     
        //         this.props.dispatch({type: `ADD_CALLBACK_RESIZE_SCREEN`, value: newHeight});
        //     }
        // }while(document.getElementById(id) === null);

        // setTimeout(() => {
        //     console.log(document.getElementById(id));
        //     newHeight();
        //     this.props.dispatch({type: `ADD_CALLBACK_RESIZE_SCREEN`, value: newHeight});
        // }, 3000);
    }

    compriseToHandlerWithBundle(){
        const dialogInfo = this.props.dialogInfo
        const bundle     = dialogInfo.bundle;
        
        if(!bundle) return;
        switch(bundle.type){
            case `POST_ID`:
                return this.setPaddingForChildGroup(bundle.idDom);
            default: 
                return;
        }
    }

    mainLayout(){
        if(!this.props.dialogInfo){return ;}

        return this.props.dialogInfo.component;
    }

    componentWillMount(){
        
    }

    render() {
        if(this.props.dialogInfo) this.compriseToHandlerWithBundle();
        return (
            <div id="dialog-field">
                <div className="layout">
                    <button 
                        className="exit-btn"
                        onClick={this.exitDialog.bind(this)}> 
                        <i className="fa fa-times"></i>
                    </button>
                    <div 
                        className="child" 
                        id="child-group-dialog">
                            {this.mainLayout()}
                    </div>
                </div>
            </div>
        );
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(nextProps.dialogInfo && nextProps.dialogInfo !== this.props.dialogInfo){
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