import React, { useState } from 'react';
import axios from 'axios';

const PostForm = ({ setNewPost }) => {
    const[post, setPost] = useState({
        headline: "",
        body: "",
    })

    const handleChange = ({ currentTarget }) => {
        const {value, name} = currentTarget;
        setPost({...post, [name]: value})
        console.log(post);
    }

    const handleSubmit = async event => {
        event.preventDefault();
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
            <button className="ui button" type="submit">Créer</button>
        </form>
    );
};

export default PostForm;