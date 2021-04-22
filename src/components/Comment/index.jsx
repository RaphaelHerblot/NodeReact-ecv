import React from 'react';
import axios from 'axios';
import CommentAPI from '../../services/commentAPI'

const Comment = ({ comment, authenticatedUser, fetchComments }) => {

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

    const handleLike = async () => {
        try {
            const response = await axios.post(
                "http://localhost:3000/api/like/like-comment", {
                    author: authenticatedUser,
                    comment: comment._id
                })
            fetchComments();
        } catch(error) {
            console.log(error.response);
        }
    }

    // useEffect(() => {
    //     console.log("COMMENT : ", comment);
    // }, [])
    return (
        <div className={"comment-"+comment._id}>
            <a className="avatar">
                <img src="/images/jenny.jpg" />
            </a>
            <div className="content">
                <a className="author">{comment.author.givenName}</a>
                <div className="metadata">
                    <span className="date">{comment.creationDate}</span>
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
                <img className="like-comment" src="/images/plus.svg" onClick={handleLike} /><p>{comment.likes.length}</p>
            </div>
        </div>
    );
};

export default Comment;