import React, { useState, useEffect } from 'react';
import PostPreview from '../PostPreview';

import PostAPI from "../../services/postAPI";
import PostForm from '../Forms/Post';

const PostList = () => {
    const[posts, setPosts] = useState(["bjr", "sv", "ouquoi"]);
    const[newPost, setNewPost] = useState(false);

    // Fetching all the post
    const fetchPosts = async () => {
        try {
            const dataPosts = await PostAPI.findAll();
            // console.log("DATA : ", dataPosts)
            setPosts(dataPosts);
        } catch(error) {
            console.log(error.reponse)
        }
    }

    // Fetching all the post when this component is first rendered
    useEffect(() => {
        fetchPosts();
    }, [])

    // If new post, fetching all the posts again
    useEffect(() => {
        if(newPost === true) {
            fetchPosts();
            setNewPost(false)
        }
    }, [newPost])

    return (
        <div>
            <h3>Ecrivez votre article !</h3>
            <PostForm setNewPost={setNewPost} />
            <h3>Listes des news</h3>
            {posts.length !== 'undefinied' 
            ? <div className="listPost">
                {posts.map((post, index) => 
                    <PostPreview key={index} post={post} />
                )}
            </div>
            : ''}
            
        </div>
    );
};

export default PostList;