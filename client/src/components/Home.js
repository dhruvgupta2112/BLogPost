import React from 'react'
import axios from "axios"
import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom";
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import CommentIcon from '@material-ui/icons/Comment';
import PostMenu from './PostMenu';
import { AuthContext } from '../helper/AuthContext';
import Avatar from '@mui/material/Avatar';

function Home() {
    let navigate = useNavigate();
    const {authState} = useContext(AuthContext);
    const [listOfPosts, setListOfPosts] = useState([]);
    const [listOfLikes, setListOfLikes] = useState([]);

    useEffect(()=>{
      axios.get("http://localhost:5000/posts", {
        headers: {accessToken: localStorage.getItem("accessToken")}
      }).then((response) => {
        console.log(response)
        if(response.data.error){
          navigate("/login");
        }
        else{
          setListOfPosts(response.data.listOfPosts);
          setListOfLikes(response.data.listOfLikes.map((obj) => {
            return obj.PostId;
          }));
        }
      })
    }, []);
  
  const submitLike = (PostId)=>{
    axios.post("http://localhost:5000/likes", {
      PostId: PostId
    }, {
      headers:{accessToken: localStorage.getItem('accessToken')}
    }).then((response)=>{
        if(response.data.error){
          alert("Please sign to like a post");
          navigate("/login");
        }
        else{
          setListOfPosts(listOfPosts.map((post) => {
            if(post.id === PostId){
              if(response.data.liked)
                return {...post, Likes: [...post.Likes, 0]};
              else{
                let arr = post.Likes;
                arr.pop();
                return {...post, Likes : arr};
              }
            }
            else return post;
          }));
          if(response.data.liked){
            setListOfLikes([...listOfLikes, PostId]);
          }
          else{
            setListOfLikes(listOfLikes.filter((id) => id !== PostId));
          }
        }
    })
  }

  return (
    <div className="home">
      {listOfPosts.map((value, key) => {
        return (
          <div key={key} className="post" >
            <div className="username"><Avatar>{value.username[0].toUpperCase()}</Avatar> <span className="usernamename">{value.username}  </span> {authState.username=== value.username && <span><PostMenu PostId={value.id}/></span>}</div>
            <div className="body" onClick={()=>{
            navigate(`/post/${value.id}`);
          }}>{value.postText}</div>
            <div className="postFeaturesContainer">
              <div className="postFeatures">
                <button onClick={() => {submitLike(value.id)}}><ThumbUpIcon color={listOfLikes.includes(value.id)?"primary":"inherit"} /></button>
                <button onClick={() => {navigate(`/post/${value.id}`)}}><CommentIcon /></button>
              </div>
              <div className="noOfLikes"><span style={{"color":"black"}}>{value.Likes.length}</span>likes</div>
            </div>
          </div>
        );
      })}
    </div>
  )
}

export default Home;
