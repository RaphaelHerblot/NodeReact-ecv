import React from 'react';

const Comment = ({ comment }) => {

    // useEffect(() => {
    //     console.log("COMMENT : ", comment);
    // }, [])
    return (
        <div className="comment">
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
        </div>
    );
};

export default Comment;