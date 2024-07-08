import React, {useState} from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function CreatePost() {
    const Navigate = useNavigate();
    const [postText, setPostText] = useState("");

    function onSubmit(data){
        axios.post("http://localhost:5000/posts", {
          postText: postText
        }, {
          headers: {
            accessToken: localStorage.getItem('accessToken')
          }
        }).then((Response) => {
            setPostText("");
            console.log(Response.data);
          });
        Navigate("/");
    }   

    function changeText(event){
      setPostText(event.target.value);
    }
    
  return (
    <div className='createPostPage'>
            <form className="formContainer" onSubmit={onSubmit}>
                <textarea rows="5" id="inputCreatePost" name="postText" placeholder="whats happening today" value={postText} onChange={changeText} required/>
                <button type="submit">Post</button>
            </form>
    </div>
  )
}

export default CreatePost;
