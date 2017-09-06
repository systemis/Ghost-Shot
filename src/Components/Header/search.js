import React, { Component } from 'react';

const userItem = props => {
    return (
        <div className="row user-item">
            <div className="show-user-avatar col-md-3 col-sm-3 col">
                <img src='https://instagram.fhan2-2.fna.fbcdn.net/t51.2885-19/s320x320/20214694_118717355423031_3296597273256919040_a.jpg' alt="User avatar"/>
            </div>
            <div className="show-user-name col-md-9 col-sm-9 col">
                Info
            </div>
        </div>
    )
}

class SearchComponent extends Component {
    onSearch(){
        var field = document.getElementById('input-search-app');
        field.style.textAlign = 'left';
        if(!field.value){
            field.style.textAlign = 'center';
        }
    }
    
    render() {
        return (
            <div className="search-group">
                <div className="child">
                    <p className="md">
                        <input 
                            id="input-search-app"
                            type="text" 
                            onChange={this.onSearch}
                            placeholder="Tìm Kiếm"/>
                        <span className="fa fa-search"></span>
                        <div className="show-result-field">
                            {userItem()} 
                            {userItem()} 
                            {userItem()} 
                            {userItem()} 
                            {userItem()} 
                            {userItem()} 
                            {userItem()} 
                            {userItem()} 
                            {userItem()} 
                        </div>
                    </p>
                </div>
            </div>
        );
    }
}

export default SearchComponent;