import React, { Component } from 'react';
import userMG               from './js/user.js';

class RootRoute extends Component {
    handling(){
        userMG.getClientInfo((error, result) => {
            if(error){
                return window.location.href = '/sign-in'; 
            }else{
                return window.location.href = '/home'; 
            }
        })
    }
    
    render() {
        return (
            <div>{this.handling()}</div>
        )
    }
}

export default RootRoute;