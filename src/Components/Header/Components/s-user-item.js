import React, { Component } from 'react';
import searchCookie         from '../../../js/cookie/search.js';

class SearchUserItem extends Component {
    constructor(props){
        super(props);
    }

    onClick(e){
        e.preventDefault();
        var searchInputValue  = document.getElementById('input-search-app').value;
        var usWasFined        = this.props.data;

        searchCookie.setCookie({keyWord: searchInputValue, info: usWasFined});
    }

    render() {
        return (
            <a href='/user/systemis' onClick={this.onClick.bind(this)}>
                <div className="row user-item">
                    <div className="show-user-avatar col-md-3 col-sm-3 col">
                        <img src='https://instagram.fhan2-2.fna.fbcdn.net/t51.2885-19/s320x320/20214694_118717355423031_3296597273256919040_a.jpg' alt="User avatar"/>
                    </div>
                    <div className="show-user-name col-md-9 col-sm-9 col">
                        Info
                    </div>
                </div>
            </a>
        );
    }
}

export default SearchUserItem;