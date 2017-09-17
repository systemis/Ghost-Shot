class SearchCookie{
    constructor(){
        this.search_value_list = window.localStorage.getItem('search_value_list');
        
        if(this.search_value_list){
            this.search_value_list = JSON.parse(this.search_value_list);
        }else{
            this.search_value_list = [];
        }
    }

    setCookie(value){ 
        
        this.search_value_list.push(value);
        window.localStorage.setItem(`search_value_list`, JSON.stringify(this.search_value_list));
    }

    getCookie(){
        return this.search_value_list;
    }
}

export default new SearchCookie();