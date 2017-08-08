import React, { Component } from 'react';

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
                    </p>
                </div>
            </div>
        );
    }
}

export default SearchComponent;