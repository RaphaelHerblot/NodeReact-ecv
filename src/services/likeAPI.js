import axios from "axios";

function findAll() {
    return axios
    .get("http://localhost:3000/api/like")
    .then(response => response.data.data)
}

function findOne(id) {
    return axios
    .get("http://localhost:3000/api/like/"+ id)
}

function deleteLike(id) {
    return axios
    .delete("http://localhost:3000/api/like/"+ id)
}

export default {
    findAll,
    findOne,
    delete: deleteLike
}