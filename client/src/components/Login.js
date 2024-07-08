import React,{useState, useContext} from 'react'
import {Formik, Field, Form, ErrorMessage} from "formik";
import * as Yup from 'yup'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../helper/AuthContext';

function Login() {
    const {setAuthState} = useContext(AuthContext);
    const initialValues = {
        username: "",
        password: ""
    }   
    let navigate = useNavigate();
    const validationSchema = Yup.object().shape({
        username: Yup.string().min(3).max(20).required(),
        password: Yup.string().min(4).max(20).required()
      });

      const onSubmit = (data) => {
        axios.post("http://localhost:5000/auth/login", data).then((response) => {
            if(response.data.error){
                alert(response.data.error);
            }
            else{
                localStorage.setItem("accessToken", response.data.accessToken);
                setAuthState({
                  username: response.data.username,
                  id: response.data.id,
                  status: true
                });
                navigate("/");
            }
        })
      }

  return (
    <div className="centerdiv">
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            <Form className="formContainer">
                <ErrorMessage name="username" component={"span"} style={{"color":"red"}}/>
                <Field id="inputCreatePost" name="username" placeholder="UserName" style={{"height":"35px"}}/>
                <ErrorMessage name="password" component={"span"} style={{"color":"red"}} />
                <Field id="inputCreatePost" name="password" placeholder="Password" type="password" style={{"height":"35px"}}/>
                <button type="submit">Log In </button>
            </Form>
      </Formik>
    </div>
  )
}

export default Login
