import $ from 'jquery' 
class postsMG{
    findPostById(postId, fn){
        $.ajax({
            url: `/post/get/id/${postId}`, type: `POST`,
            success: data => fn(data.err, data.result),
            error: err => fn(JSON.stringify(err), null)
        })
    }
}

export default new postsMG();