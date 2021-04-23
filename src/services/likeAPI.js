import axios from "axios";

// Find all likes
function findAll() {
    return axios
    .get("http://localhost:3000/api/like")
    .then(response => response.data.data)
}

// Find one like
function findOne(id) {
    return axios
    .get("http://localhost:3000/api/like/"+ id)
}

// Delete a like
function deleteLike(id) {
    return axios
    .delete("http://localhost:3000/api/like/"+ id)
}

export default {
    findAll,
    findOne,
    delete: deleteLike
}