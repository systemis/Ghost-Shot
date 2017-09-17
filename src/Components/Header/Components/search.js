import React, { Component } from 'react';
import SearchUserItem       from './s-user-item.js';
import searchCookie         from '../../../js/cookie/search.js';
import appMG                from '../../../js/app.js';

class SearchComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            rs_search: [],
            search_value: []
        }
    }
    
    onSearch(){
        var field  = document.getElementById('input-search-app');
        var search_value = field.value;

        // Set text aligin to left in input group 
        field.style.textAlign = 'left';
        
        if(!search_value){
            field.style.textAlign = 'center';
            document.getElementById('div-sh-rs-search').style.display = 'none';
            this.setState({search_value: []});
        }else{
            appMG.search(search_value, (error, result) => {
                if(error) return console.log(error);
                this.setState({search_value: result});
            })
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
                            onChange={this.onSearch.bind(this)}
                            placeholder="Tìm Kiếm"/>
                        <span className="fa fa-search"></span>
                        <div 
                            className="show-result-field" 
                            id="div-sh-rs-search"
                            style={{display: 'none'}}>
                            {this.state.search_value.map((info, index) => {
                                console.log(index);
                                if(index == 0) {
                                    const rsDiv = document.getElementById('div-sh-rs-search');
                                    rsDiv.style.display = 'block';
                                }
                                return <SearchUserItem info={info} key={index} />
                            })}
                        </div>
                    </p>
                </div>
            </div>
        );
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log(nextState.search_value);
        return true;
    }
}

export default SearchComponent;