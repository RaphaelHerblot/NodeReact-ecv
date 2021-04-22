import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import PostAPI from '../../services/postAPI'
import CommentList from '../CommentList';
import axios from 'axios';

const PostShow = (props) => {
    const[post, setPost] = useState([]);
    const[alreadyLiked, setAlreadyLiked] = useState("heart");

    const fetchPost = async (idPost) => {
        try {
            const dataPost = await PostAPI.findOne(idPost);
            console.log("DATA : ", dataPost.data.data);
            setPost(dataPost.data.data);
        } catch(error) {
            console.log("Error : ", error.reponse)
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

    useEffect(() => {
        fetchPost(props.match.params.id);
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
                                <button type="button" class="ui red button" onClick={handleDelete}>Supprimer</button>
                            </div>
                            <div className="right floated likes">
                                {post.likes.length} <img src={"/images/"+alreadyLiked+".svg"} />
                            </div>
                        </div>
                        <div className="listComments">
                            <CommentList postId={post._id}/>
                        </div>
                    </div>
                </div>
                : ""
            }
        </div>
    );
};

export default PostShow;