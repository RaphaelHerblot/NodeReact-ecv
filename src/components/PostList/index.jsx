import React, { useState, useEffect } from 'react';
import PostPreview from '../PostPreview';
import ReactDOM from "react-dom";

import PostAPI from "../../services/postAPI";
import PostForm from '../Forms/Post';

const PostList = () => {
    const[posts, setPosts] = useState(["bjr", "sv", "ouquoi"]);
    const[newPost, setNewPost] = useState(false);

    const fetchPosts = async () => {
        try {
            const dataPosts = await PostAPI.findAll();
            // console.log("DATA : ", dataPosts)
            setPosts(dataPosts);
        } catch(error) {
            console.log(error.reponse)
        }
    }

    useEffect(() => {
        fetchPosts();
    }, [])

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
            <div className="listPost">
                {posts.map(post => 
                    <PostPreview key={post._id} post={post} />
                )}
            </div>
        </div>
    );
};

export default PostList;