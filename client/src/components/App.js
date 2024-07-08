import './App.css';
import Home from "./Home";
import CreatePost from './CreatePost';
import Posts from "./Posts";
import Login from "./Login";
import SignUp from "./SignUp";
import PageNotFound from './PageNotFound';
import {AuthContext} from "../helper/AuthContext"
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import {useState, useEffect} from "react";
import axios from "axios";
import AccountsMenu from "./AccountsMenu";

function App() {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false
  });

  useEffect(() => {
    axios.get("http://localhost:5000/auth" , {headers: {
      "accessToken" : localStorage.getItem("accessToken")
    }}).then((Response)=>{
      if(Response.data.error){
        setAuthState({
          username: "",
          id: 0,
          status: false
        });
      }
      else{
        setAuthState({
          username: Response.data.username,
          id: Response.data.id,
          status: true
        });
      }
    })
  }, [])
  return (  
    <div className="App">
      <AuthContext.Provider value={{authState, setAuthState}}>
      <Router>
      <div className='navbar'>
        {!authState.status ? (
          <>
          <Link to="/Login">Login</Link>
          <Link to="/SignUp">SignUp</Link>
          </>
        ): (
        <>
          <Link to="/">Home</Link>
          <Link to="/CreatePost">Create Post</Link>
          <div className="AccountMenuContainer"><AccountsMenu username={authState.username}/></div>
        </>)}
      </div>
        <Routes>
          <Route path="/CreatePost" element={<CreatePost />} />
          <Route path="/" element={<Home />} />
          <Route path="/post/:id" element={<Posts />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
