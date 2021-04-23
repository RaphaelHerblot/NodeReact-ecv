import axios from "axios";

// Find all comments
function findAll() {
    return axios
    .get("http://localhost:3000/api/comment")
    .then(response => response.data.data)
}

// Find one comment
function findOne(id) {
    return axios
    .get("http://localhost:3000/api/comment/"+ id)
}

// Find  all coments from a post
function findAllFromOnePost(postId) {
    return axios
    .get("http://localhost:3000/api/comment/from-post/" + postId)
    .then(response => response.data.data)
}

// Delete a comment
function deleteComment(id) {
    return axios
    .delete("http://localhost:3000/api/comment/"+ id)
}

export default {
    findAll,
    findOne,
    delete: deleteComment,
    findAllFromOnePost
}