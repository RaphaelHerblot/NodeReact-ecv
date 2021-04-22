import React, { useState, useEffect } from 'react';
import Comment from '../Comment';
import CommentAPI from '../../services/commentAPI';
import CommentForm from '../Forms/Comment';

const CommentList = ({ postId }) => {
    const[comments, setComments] = useState([]);
    const[newComment, setNewComment] = useState(false);

    const fetchComments = async () => {
        try {
            const dataComments = await CommentAPI.findAllFromOnePost(postId);
            setComments(dataComments);
        } catch(error) {
            console.log(error.reponse)
        }
    }

    useEffect(() => {
        fetchComments();
    }, [])

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
                    <Comment key={comment._id} comment={comment} postId={postId}  />
                )}
                <CommentForm postId={postId} setNewComment={setNewComment} setComments={setComments} comments={comments} />
            </div>
        </div>
    );
};

export default CommentList;