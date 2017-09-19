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

    findInServer(word, nvSearchValue){
        if(!word) return console.log(`Key word not underfind ${word}`);
        
        appMG.search(word, (error, data) => {
            if(error) return console.log(error);

            // console.log(searchCookie.getCookie());
            data = data.concat(nvSearchValue);
            console.log(data);
            this.setState({search_value: data});
        })
    }
    
    findInHistory(word){
        var history = searchCookie.getCookie();
        var data = [];
        
        // Find in history
        history.forEach((item, index, arr) => {
            if(item.username.toLowerCase().indexOf(word.toLowerCase()) >= 0){
                item.prv = 2;
                data.push(item);
            }   
        })

        // Set now search result before request to server 
        this.setState({search_value: data});
        
        // request to server to finding 
        this.findInServer(word, data);
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
                    let prv2 = data[j - 1].prv || 0;
                    if(prv1 > prv2){
                        let pg  = data[j];
                        data[j] = data[j - 1];
                        data[j - 1] = pg;
                    }
                }
            }
            
            for(var i = 0, length = data.length; i < length; i++){
                for(var j = i + 1; j < length; j++){
                    if(data[i].username === data[j].username){
                        data.splice(j, 1);
                        length -= 1;
                    }
                }
            }

            this.setState({search_value: data});
        }
        
        return true;
    }
}

export default SearchComponent;