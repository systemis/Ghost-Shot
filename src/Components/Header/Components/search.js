import React, { Component } from 'react';
import SearchUserItem       from './s-user-item.js';
import searchCookie         from '../../../js/cookie/search.js';
import appMG                from '../../../js/app.js';

class SearchComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            rs_search: []
        }
    }
    
    onSearch(){
        var field  = document.getElementById('input-search-app');
        var search_value = field.value;

        // Set text aligin to left in input group 
        field.style.textAlign = 'left';
        
        if(!search_value){
            field.style.textAlign = 'center';
        }else{
            appMG.search(search_value, (error, result) => {
                error && console.log(error);
                console.log(result);
            })

            this.setState({search_value: [search_value]});
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
                            {this.state.rs_search.map((item, index) => {
                                console.log(index);
                                if(index == 0) {
                                    const rsDiv = document.getElementById('div-sh-rs-search');
                                    rsDiv.style.display = 'block';
                                }
                                return <SearchUserItem key={index} />
                            })}
                        </div>
                    </p>
                </div>
            </div>
        );
    }

    componentDidMount() {
        // Test api 
        // this.setState({rs_search: ['div']});
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log(nextState);
        return true;
    }
}

export default SearchComponent;