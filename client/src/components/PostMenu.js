import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export default function PostMenu(props) {
  const Navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const deletePost = ()=>{
    console.log(props.PostId)
    axios.delete(`http://localhost:5000/posts/${props.PostId}`, {
        headers: {accessToken: localStorage.getItem("accessToken")}
    }).then(()=>{
        console.log("Post Deleted");
        Navigate("/");
    })
  }

  return (
    <div>
      <Button
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}   
      >
       < MoreVertIcon style={{"color":"white"}} />
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={deletePost}><span style={{"color":"red"}}>Delete Post</span></MenuItem>
      </Menu>
    </div>
  );
}
