import { myAxios, privateAxios } from "./helper"

// create post function
export const createPost=(postData)=>{
    // console.log(postData)
    // console.log('/user/${postData.userId}/category/${postData.categoryId}/posts');
    // back sticks - beacuse we used dynamic data in URL.
    return privateAxios.post(`/user/${postData.userId}/category/${postData.categoryId}/posts`,postData).then((response)=>response.data);
    // return privateAxios.post('/user/2/category/3/posts',postData).then((response)=>response.data);
};

// get all post
export const loadAllPosts=(pageNumber, pageSize)=>{
    return myAxios.get(`/posts?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=addedDate&sortDir=desc`).then((response)=>response.data)
}

// load single post of given id
export const loadPost=(postId)=>{
    return myAxios.get("/posts/"+postId).then((response)=>response.data)
}

// for new comment 
export const createComment=(comment, postId)=>{
    return privateAxios.post(`/post/${postId}/comments`,comment)
}

// upload image/file 
export const uploadPostImage =(image,postId)=>{
    let formData = new FormData()
    formData.append("image",image)
    return privateAxios.post(`/post/image/upload/${postId}`,formData,{
        headers:{
            'Content-Type':'multipart/form-data'
        }
    }).then((response)=>response.data)
}

// get category wise post
export const loadPostCategoryWise=(categoryId)=>{
    return privateAxios.get(`/category/${categoryId}/posts`).then((res)=>res.data)
}

// load post user wise
// export const loadPostUserWise = (userId)=>{
//     return privateAxios.get(`/user/${userId}/posts`).then((resp)=>resp.data)
// }
export function loadPostUserWise(userId){
    return privateAxios.get(`/user/${userId}/posts`).then((resp)=>resp.data)
}

// delete post
export function deletePostService(postId){
    return privateAxios.delete(`/posts/${postId}`).then((resp)=>resp.data)
}