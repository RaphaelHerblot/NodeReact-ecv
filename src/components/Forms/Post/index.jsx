import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PostForm = ({ setNewPost, currentPost, setIsUpdating, isUpdating }) => {
    const[post, setPost] = useState({
        headline: "",
        body: "",
    })

    const handleChange = ({ currentTarget }) => {
        const {value, name} = currentTarget;
        setPost({...post, [name]: value})
    }

    const handleSubmit = async event => {
        event.preventDefault();
        if(isUpdating !== true) {
            try {
                const response = await axios.post(
                    "http://localhost:3000/api/post", 
                    post
                );
                console.log(response);
                setNewPost(true);
            } catch(error) {
                console.log(error.response);
            }
        }

        else {
            try {
                const response = await axios.put(
                    "http://localhost:3000/api/post/"+currentPost._id, 
                    post
                );
                console.log(response);
                setNewPost(true);
                setIsUpdating(false);
            } catch(error) {
                console.log(error.response);
            }
        }

    }
    
    useEffect(() => {
        if(typeof currentPost !== 'undefined') {
            const tempPost = {
                headline: currentPost.headline,
                body: currentPost.body
            }
            setPost(tempPost);
        }
    }, [])

    return (
        <form className="ui form" onSubmit={handleSubmit}>
            <div className="field">
                <label>Titre de l'article</label>
                <input type="text" name="headline" value={post.headline} onChange={handleChange} placeholder="Titre" />
            </div>
            <div className="field">
                <label>Contenu de larticle</label>
                <textarea value={post.body} name="body" onChange={handleChange}></textarea>
            </div>
            <button className="ui button" type="submit">{isUpdating === true ? 'Modifier' : 'Créer'}</button>
        </form>
    );
};

export default PostForm;