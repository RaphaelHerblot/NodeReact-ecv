import React, { useState, useEffect } from 'react';
import CommentList from '../CommentList';
import PostForm from '../Forms/Post';

import axios from 'axios';
import authAPI from '../../services/authAPI';
import PostAPI from '../../services/postAPI'


const PostShow = (props) => {
    const[post, setPost] = useState([]);
    const[alreadyLiked, setAlreadyLiked] = useState("heart");
    const[authenticatedUser, setAuthenticatedUser] = useState([]);
    const[newPost, setNewPost] = useState(false);
    const[isUpdating, setIsUpdating] = useState(false);

    // Fetching the post by its ID
    const fetchPost = async (idPost) => {
        try {
            const dataPost = await PostAPI.findOne(idPost);
            console.log("DATA : ", dataPost.data.data);
            setPost(dataPost.data.data);
        } catch(error) {
            console.log("Error : ", error.reponse)
        }
    }

    // Fetching the user
    const fetchUser = async () => {
        try {
            const dataUser = await authAPI.findConnectedUser();
            console.log("User : ", dataUser)
            setAuthenticatedUser(dataUser);
        } catch(error) {
            console.log("Error : ", error.response)
        }
    }

    // Deleting a post
    const handleDelete = async () => {
        try {
            await PostAPI.delete(post._id);
            props.history.push("/");

        } catch(error) {
            console.log("Error : ", error.reponse)
        }
    }

    // Handling like and unlike of a post
    const handleLike = async () => {
        try {
            const response = await axios.post(
                "http://localhost:3000/api/like/like-post", {
                    author: authenticatedUser,
                    post: post._id
                })
            console.log(response);
            fetchPost(post._id);
            if(alreadyLiked === "heart") {
                setAlreadyLiked("heart-like");
            } else {
                setAlreadyLiked("heart");
            }
        } catch(error) {
            console.log(error.response);
        }
    }

    // Setting the isUpdating variable to true to open the update form element
    const handleUpdate = () => {
        setIsUpdating(true);
    }

    // Fetching the post and user connected
    useEffect(() => {
        fetchPost(props.match.params.id);
        fetchUser();
    }, []);

    useEffect(() => {
        if(newPost === true) {
            fetchPost(props.match.params.id);
            setNewPost(false);
        }   
    }, [newPost]);

    // When updating, update form opens and show element display none;
    useEffect(() => {
        if(post.length !== 0) {
            const contentContainer = document.querySelector('.main-content');
            const updateContainer = document.querySelector('.update-content');
            contentContainer.classList.toggle('active');
            updateContainer.classList.toggle('active');
        }
    }, [isUpdating]);

    return (
        <div>
            {post.length !== 0
                ?  
                <div className="showPost">
                    <div className="ui raised card">
                        <div className="main-content active">
                            <div className="content">
                                <div className="header"><h4>{post.headline}</h4></div>
                                    <div className="meta">
                                        <span className="category"></span>
                                    </div>
                                <div className="description">
                                    <p>{post.body}</p>
                                </div>
                            </div>
                            <div className="extra content">
                                <div className="author">
                                    <img className="ui avatar image" src="/images/matt.jpg" alt={post.author.givenName} /> {post.author.givenName + " " + post.author.familyName}
                                </div>
                                <div className="likes">
                                    {post.likes.length} <img src={"/images/"+alreadyLiked+".svg"} onClick={handleLike} alt="Click to like" />
                                </div>
                                {authenticatedUser === post.author._id 
                                    ? <div className="button-post">
                                        <button type="button" className="small ui orange button" onClick={handleUpdate}>Modifier</button>
                                        <button type="button" className="small ui red button" onClick={handleDelete}>Supprimer</button>
                                    </div>
                                    : ''
                                }
                            </div>
                        </div>
                        <div className="update-content">
                            <PostForm setNewPost={setNewPost} currentPost={post} setIsUpdating={setIsUpdating} isUpdating={isUpdating} />
                        </div>
                        <div className="listComments">
                            <CommentList postId={post._id} authenticatedUser={authenticatedUser} />
                        </div>
                    </div>
                </div>
                : ""
            }
        </div>
    );
};

export default PostShow;