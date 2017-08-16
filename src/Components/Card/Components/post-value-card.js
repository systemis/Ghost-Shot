import React, { Component } from 'react';

class PostValue extends Component {
    constructor(props){
        super(props);
        this.state = {indexValue: 0}
    }

    componentWillMount() {
    }

    render() {
        const postData = this.props.images;
        if(this.props.images.length > 1){
            var indexValue = this.state.indexValue;
            var changeIndex = value => {
                indexValue += value;
                if(indexValue < 0){
                    indexValue = postData.length - 1;
                }

                if(indexValue >= postData.length){
                    indexValue = 0;
                }

                this.setState({indexValue: indexValue});
            }

            return(
                <div className="multiple-image">
                    <span 
                        className="fa fa-chevron-circle-left btn-left-image" 
                        onClick={() => changeIndex(-1)}/>
                    <div
                        style={{backgroundImage: `url(${postData[indexValue]})`}}
                        alt="Image value" 
                        className="show-image-post"
                        id={`sh-show-value-${this.props.postId}-${indexValue}`}/>
                    <span 
                        className="fa fa-chevron-circle-right btn-right-image" 
                        onClick={() => changeIndex(-1)}/>
                </div>
            )
        }else{
            return (
                <img 
                    src={postData[0]}
                    alt="Image value" 
                    className="show-image-post"/>
            )
        }
    }

    componentDidMount() {
        const sh = document.getElementById(`sh-show-value-${this.props.postId}-${this.state.indexValue}`);
        sh.style.height = `${sh.clientWidth - 18}px`;
        console.log(sh.clientWidth);
    }
}

export default PostValue;