import React from 'react';
import axios from 'axios';
import CommentAPI from '../../services/commentAPI'

const Comment = ({ comment, authenticatedUser, fetchComments }) => {

    // Handling the delete of a comment
    const handleDelete = async () => {
        const commentContainer = document.querySelector('.comment-'+comment._id)
        commentContainer.innerHTML = "";
        console.log(commentContainer);
        try {
            await CommentAPI.delete(comment._id);
        } catch(error) {
            console.log("Error : ", error.reponse)
        }
    }

    // Handling the like of a comment
    const handleLike = async () => {
        try {
            await axios.post(
                "http://localhost:3000/api/like/like-comment", {
                    author: authenticatedUser,
                    comment: comment._id
                })
            fetchComments();
        } catch(error) {
            console.log(error.response);
        }
    }

    return (
        <div className={"comment comment-"+comment._id}>
            <div className="avatar">
                <img src="/images/jenny.jpg" alt={comment.author.givenName} />
            </div>
            <div className="content">   
                <a className="author" href="#">{comment.author.givenName}</a>
                <div className="metadata">
                    <span className="date">{comment.creationDate.split('T')[0]}</span>
                </div>
                <div className="text">
                    {comment.content}
                </div>
            </div>
            <div className="action-comment">
                {authenticatedUser === comment.author._id 
                    ? <p className="delete-comment" onClick={handleDelete}>Supprimer</p>
                    : ''
                }
                <img className="like-comment" src="/images/plus.svg" onClick={handleLike} alt="Click to like" /><p>{comment.likes.length}</p>
            </div>
        </div>
    );
};

export default Comment;