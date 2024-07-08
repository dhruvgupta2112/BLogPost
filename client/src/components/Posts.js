import React,{useEffect, useState, useContext} from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios"
import { AuthContext } from '../helper/AuthContext';
import PostMenu from "./PostMenu";
import Avatar from '@mui/material/Avatar';
import DeleteIcon from '@material-ui/icons/Delete';

function Posts() {
    let {id} = useParams();
    const {authState} = useContext(AuthContext);
    let [postObject, setPostObject] = useState({});
    let [isCmtLoaded, setIsCmtLoaded] = useState(false);
    let [isPstLoaded, setIsPstLoaded] = useState(false);
    let [comments, setComments] = useState([]);
    let [newComment, setNewComment] = useState("");
    const monthName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]


    useEffect(()=>{
      setIsCmtLoaded(false);
      setIsPstLoaded(false);
        axios.get(`http://localhost:5000/posts/byId/${id}`).then((response) => {
            // console.log(response.data);
            setPostObject(response.data);
            setIsPstLoaded(true);
        })

        axios.get(`http://localhost:5000/comments/${id}`).then((response) => {
          setComments(response.data);
          setIsCmtLoaded(false);
      })
    }, [id]);

    const addComment = () => {
      if(newComment.length === 0){
        alert('comment cannot be empty')
        return;
      }
      axios.post(`http://localhost:5000/comments`, {
        commentBody: newComment,
        PostId: id
      }, {
        headers: {
          accessToken: localStorage.getItem("accessToken")
        }
      }).then((response) => {
        if(response.data.error){
          console.log(response.data.error);
        }
        else{
          setComments([response.data, ...comments]);
          setNewComment("");
        }
      })
    }
    const deleteComment = (id) => {
       axios.delete(`http://localhost:5000/comments/${id}`, {
          headers: { accessToken: localStorage.getItem("accessToken") },
        }).then(()=>{
          console.log("post deleted");
          setComments(comments.filter((comment)=>{
            return comment.id !== id;
          }));
        })
    };
  return (
    <div className="postPage" >
      <div className="leftSide">
        <div className="post" id="individual">
        <div className="username"><Avatar  style={{"zIndex":"0"}} >{isCmtLoaded && postObject.username[0].toUpperCase()}</Avatar> <span class="usernamename">{postObject.username}  </span> {authState.username=== postObject.username && <span><PostMenu PostId={postObject.id}/></span>}</div>
        <div className="body">{postObject.postText}</div>
      </div>
      <div className="dateAndTime">{isPstLoaded && postObject.createdAt.substr(11,5)}|{isPstLoaded && monthName[Number(postObject.createdAt.substr(5, 2))]} {isPstLoaded && Number(postObject.createdAt.substr(8,2))},{isPstLoaded && postObject.createdAt.substr(0, 4)}</div>
      </div>
      <div className='rightSide'>
        <div className='addCommentContainer'>
          <div className="leftSideOfComments"><Avatar style={{"marginTop":"15px", "zIndex":"-1"}} fontSize='large'>{authState.username[0] && authState.username[0].toUpperCase()}</Avatar></div>
          <div className="rightSideOfComments">
          <input name="comment" value={newComment} type="text" placeholder='Post your comment' autoComplete='off' onChange={(event)=>{
            setNewComment(event.target.value);
          }}/>
          <button className='postBtn' onClick={addComment}>Post</button>
          </div>
        </div>
        <div className='listOfComments'>
          {comments.map((value, key)=>{
            return (<div key={key} className="comment addCommentContainer">
              <div className="leftSideOfComments"><Avatar style={{"marginTop":"0px"}} fontSize='large'>{authState.username[0].toUpperCase()}</Avatar></div>
              <div className="rightSideOfComments">
                <div style={{"fontWeight":"600"}}>{value.username}</div>
                <div className="commentBody">{value.commentBody}</div>
              </div>
              {authState.username===value.username && <button className="deleteBtn" onClick={() => {
                        deleteComment(value.id);
                      }}><DeleteIcon /></button>}
            </div>);
          })}
        </div>
      </div>
    </div>
  )
}

export default Posts
