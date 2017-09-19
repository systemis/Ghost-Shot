class SearchCookie{
    constructor(){
        this.search_value_list = this.getCookie();
    }

    setCookie(value){ 
        this.search_value_list.forEach((item, index, arr) => {
            if(item.username === value.username){
                this.search_value_list.splice(index, 1);
            }
        })

        this.search_value_list.push(value);
        window.localStorage.setItem(`search_value_list`, JSON.stringify(this.search_value_list));
    }

    getCookie(){
        var value = window.localStorage.getItem('search_value_list');
        if(!value || value === ''){
            return []
        }else{
            console.log(value);
            return JSON.parse(value);
        }
    }
}

export default new SearchCookie();