import React from 'react';
import { Link } from 'react-router-dom'
const PostPreview = ({ post }) => {

    return (
        <Link to={"/post/"+post._id}>
            <div className="ui card">
                <div className="content">
                    <div className="header">{post.headline}</div>
                    <div className="meta">{post.creationDate}</div>
                    <div className="description">
                    <p>{post.body}</p>
                    </div>
                </div>
                <div className="extra content">
                    <i className="heart icon"></i>
                    { typeof post.likes.length === 'undefined' ? '0' : post.likes.length }
                </div>
            </div>
        </Link>
    );
};

export default PostPreview;