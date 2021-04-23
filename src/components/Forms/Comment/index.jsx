import React, { useState } from 'react';
import axios from 'axios';

const CommentForm = ({ postId, setNewComment, setComments, comments }) => {
    const[comment, setComment] = useState({
        content: "",
        post: postId
    })

    const handleChange = ({ currentTarget }) => {
        const {value, name} = currentTarget;
        setComment({...comment, [name]: value})
    }

    const handleSubmit = async event => {
        event.preventDefault();

        try {
            await axios.post(
                "http://localhost:3000/api/comment", 
                comment
            );
            setNewComment(true);
        } catch(error) {
            console.log(error.response);
        }
    }

    return (
        <form className="ui reply form">
            <div className="field">
                <textarea value={comment.content} name="content" onChange={handleChange}></textarea>
            </div>
            <div className="ui blue labeled submit icon button" onClick={handleSubmit}>
                <i className="icon edit"></i> Commenter
            </div>
        </form>
    );
};

export default CommentForm;