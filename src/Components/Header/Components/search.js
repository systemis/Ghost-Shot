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

    findInServer(word){
        if(!word) return console.log(`Key word not underfind ${word}`);
        
        const nvSearchValue = this.state.search_value;
        appMG.search(word, (error, data) => {
            if(error) return console.log(error);

            // console.log(searchCookie.getCookie());
            data.map((item, index) => {
                nvSearchValue.forEach((value, idx, arr) => {
                    if(item.username === value.username){
                        data.splice(index, 1);
                    }
                })
            })
            
            this.setState({search_value: data});
        })
    }
    
    findInHistory(word){
        var history = searchCookie.getCookie();
        var data = [];
        
        // Find in history
        history.map((item, index) => {
            if(item.username.indexOf(word) >= 0){
                item.prv = 2;
                data.push(item);
            }   
        })

        console.log(history);
        console.log(data);

        // Set now search result before request to server 
        this.setState({search_value: data});
        
        // request to server to finding 
        this.findInServer(word);
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
            this.findInHistory(search_value);
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
        if(this.state.search_value.length !== nextState.search_value.length){
            var data = nextState.search_value;
            
            // Sort by priortive 
            for(var i = 0, length = data.length; i < length; i++){
                for(var j = length - 1; j > i; j--){
                    let prv1 = data[j].prv || 0;
                    let prv2 = data[j - 1].prv || 0
                    
                    if(prv1 > prv2){
                        console.log(data[j]);
                        console.log(data[j - 1]);
                    
                        let pg  = data[j];
                        data[j] = data[j - 1];
                        data[j - 1] = pg;
                    }
                }
            }

            this.setState({search_value: data});
        }
        
        return true;
    }
}

export default SearchComponent;