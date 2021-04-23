import React, { useState, useEffect } from 'react';
import Comment from '../Comment';
import CommentAPI from '../../services/commentAPI';
import CommentForm from '../Forms/Comment';

const CommentList = ({ postId, authenticatedUser }) => {
    const[comments, setComments] = useState([]);
    const[newComment, setNewComment] = useState(false);

    // Fetching all the comment of a post
    const fetchComments = async () => {
        try {
            const dataComments = await CommentAPI.findAllFromOnePost(postId);
            setComments(dataComments);
        } catch(error) {
            console.log(error.reponse)
        }
    }

    // Fetching all the comments of a post when component is first rendering
    useEffect(() => {
        fetchComments();
    }, [])

    // Fetching all the comments again when a new comment is added
    useEffect(() => {
        if(newComment === true) {
            fetchComments();
            setNewComment(false);
        }
    }, [newComment])

    return (
        <div>
            <div className="ui comments">
                <h3 className="ui dividing header">Comments</h3>
                {comments.map(comment => 
                    <Comment key={comment._id} comment={comment} postId={postId} authenticatedUser={authenticatedUser} fetchComments={fetchComments} />
                )}
                <CommentForm postId={postId} setNewComment={setNewComment} setComments={setComments} comments={comments} />
            </div>
        </div>
    );
};

export default CommentList;