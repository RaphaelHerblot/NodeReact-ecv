import axios from "axios";

function findAll() {
    return axios
    .get("http://localhost:3000/api/post")
    .then(response => response.data.data)
}

function findOne(id) {
    return axios
    .get("http://localhost:3000/api/post/"+ id)
}

function deletePost(id) {
    return axios
    .delete("http://localhost:3000/api/post/"+ id)
}

export default {
    findAll,
    findOne,
    delete: deletePost
}