class SearchCookie{
    constructor(){
        this.search_value_list = window.localStorage.getItem('search_value_list') || [];
    }

    setCookie(value){ 
        this.search_value_list.push(value);
        window.localStorage.setItem(`search_value_list`, this.search_value_list);
    }

    getCookie(){
        return window.localStorage.getItem('search_value_list') || [];
    }
}

export default new SearchCookie();