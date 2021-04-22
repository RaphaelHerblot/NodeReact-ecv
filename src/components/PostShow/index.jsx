import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import PostAPI from '../../services/postAPI'
import CommentList from '../CommentList';
import axios from 'axios';
import authAPI from '../../services/authAPI';

const PostShow = (props) => {
    const[post, setPost] = useState([]);
    const[alreadyLiked, setAlreadyLiked] = useState("heart");
    const[authenticatedUser, setAuthenticatedUser] = useState([]);

    const fetchPost = async (idPost) => {
        try {
            const dataPost = await PostAPI.findOne(idPost);
            console.log("DATA : ", dataPost.data.data);
            setPost(dataPost.data.data);
        } catch(error) {
            console.log("Error : ", error.reponse)
        }
    }

    const fetchUser = async () => {
        try {
            const dataUser = await authAPI.findConnectedUser();
            console.log("User : ", dataUser)
            setAuthenticatedUser(dataUser);
        } catch(error) {
            console.log("Error : ", error.response)
        }
    }

    const handleDelete = async () => {
        try {
            await PostAPI.delete(post._id);
            props.history.push("/");

        } catch(error) {
            console.log("Error : ", error.reponse)
        }
    }

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

    const handleUpdate = () => {
        
    }

    useEffect(() => {
        fetchPost(props.match.params.id);
        fetchUser();
        console.log(props);
        console.log(post);
    }, [])

    useEffect(() => {
        console.log(post);
    }, [post])

    return (
        <div>
            {post.length !== 0
                ?  
                <div className="showPost">
                    <div className="ui raised card">
                        <div className="content">
                            <div className="header">{post.headline}</div>
                                <div className="meta">
                                    <span className="category"></span>
                                </div>
                            <div className="description">
                                <p>{post.body}</p>
                            </div>
                        </div>
                        <div className="extra content">
                            <div className="right floated author">
                                <img className="ui avatar image" src="/images/matt.jpg" /> {post.author.givenName}
                            </div>
                            <div>
                                {authenticatedUser === post.author._id 
                                    ? <div class="button-post">
                                        <button type="button" className="small ui red button" onClick={handleUpdate}>Modifier</button>
                                        <button type="button" className="small ui orange button" onClick={handleDelete}>Supprimer</button>
                                    </div>
                                    : ''
                                }
                            </div>
                            <div className="right floated likes">
                                {post.likes.length} <img src={"/images/"+alreadyLiked+".svg"} onClick={handleLike} />
                            </div>
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