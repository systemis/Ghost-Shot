import $ from 'jquery' 
class postsMG{
    findPostById(postId, fn){
        $.ajax({
            url: `/post/get/id/${postId}`, type: `POST`,
            success: data => fn(data.err, data.result),
            error: err => fn(JSON.stringify(err), null)
        })
    }

    newPost(status, photos, fn){
        $.ajax({
            url: `/new/post/`, type: `POST`,
            data: {
                status: status,
                photos: photos,
                date: new Date().toLocaleString()
            },
            success: data => {
                console.log(data)
                if(!data.err){
                    window.location.reload();
                }

                fn(data.err, data.result);
            },
            error: err => {
                fn(err, null);
            }
        })
    }
}

export default new postsMG();