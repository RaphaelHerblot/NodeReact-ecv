import axios from "axios";

// Find all post
function findAll() {
    return axios
    .get("http://localhost:3000/api/post")
    .then(response => response.data.data)
}

// Find one post
function findOne(id) {
    return axios
    .get("http://localhost:3000/api/post/"+ id)
}

// Delete a post
function deletePost(id) {
    return axios
    .delete("http://localhost:3000/api/post/"+ id)
}

export default {
    findAll,
    findOne,
    delete: deletePost
}