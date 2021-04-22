import axios from "axios";

function findAll() {
    return axios
    .get("http://localhost:3000/api/comment")
    .then(response => response.data.data)
}

function findOne(id) {
    return axios
    .get("http://localhost:3000/api/comment/"+ id)
}

function findAllFromOnePost(postId) {
    return axios
    .get("http://localhost:3000/api/comment/from-post/" + postId)
    .then(response => response.data.data)
}

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