import React from 'react';
import { Link } from 'react-router-dom'
const PostPreview = ({ post }) => {

    return (
        <Link to={"/post/"+post._id}>
            <div class="ui card">
                <div class="content">
                    <div class="header">{post.headline}</div>
                    <div class="meta">{post.creationDate}</div>
                    <div class="description">
                    <p>{post.body}</p>
                    </div>
                </div>
                <div class="extra content">
                    <i class="check icon"></i>
                    {/* {post.likes.length} */}
                </div>
            </div>
        </Link>
    );
};

export default PostPreview;