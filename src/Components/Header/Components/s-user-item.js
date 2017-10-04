import React, { Component } from 'react';
class SearchUserItem extends Component {
    constructor(props){
        super(props);
    }

    onClick(e){
        var searchInputValue   = document.getElementById('input-search-app').value;
        var {info, history}    = this.props;
        
        history().add(info);

        return true;
    }

    render() {
        return (
            <a href={'/user/' + this.props.info.username} 
                onClick={this.onClick.bind(this)}>
                <div className="row user-item">
                    <div className="show-user-avatar col-md-3 col-sm-3 col">
                        <img 
                            src={this.props.info.avatar} 
                            alt="User avatar"/>
                    </div>
                    <div className="show-user-name col-md-9 col-sm-9 col">
                        {this.props.info.username}
                    </div>
                </div>
            </a>
        );
    }
}

export default SearchUserItem;