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
        var index = 0;
        this.search_value_list.map((item, indexItem) => {
            if(item.username.indexOf(value.username) >= 0){
                index = 1;
            }
        })

        if(index === 0) {
            this.search_value_list.push(value);
            console.log('Add history success !');
            window.localStorage.setItem(`search_value_list`, JSON.stringify(this.search_value_list));
        }
    }

    getCookie(){
        return this.search_value_list;
    }
}

export default new SearchCookie();