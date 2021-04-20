import React, { useState, useEffect } from 'react';
import PostPreview from '../PostPreview';
import ReactDOM from "react-dom";

import PostAPI from "../../services/postAPI";

const PostList = () => {
    const[posts, setPosts] = useState(["bjr", "sv", "ouquoi"]);
    const[isLoaded, setIsLoaded] = useState(false);
    const[posti, setPosti] = useState("LOOOOOOOOOOOOOOOL");

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
        if(posts.length !== 0) {
            console.log("MDRRRRRRRRRRRR")
            const listPost = document.querySelector(".listPost");
        }
        console.log(posts);
        console.log(posts.length);
        {posts.map(post => 
            // console.log(post.headline)  
            <div>lolilol</div>
            // <PostPreview post={post} />
        )}
    }, [posts])

    return (
        <div>
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