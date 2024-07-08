import React from 'react'
import {Formik, Field, Form, ErrorMessage} from "formik";
import * as Yup from 'yup'
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function SignUp() {
    let navigate = useNavigate();
    const initialValues = {
        username: "",
        password: ""
    }   
    const validationSchema = Yup.object().shape({
        username: Yup.string().min(3).max(20).required(),
        password: Yup.string().min(4).max(20).required()
      });

      const onSubmit = (data) => {
        axios.post("http://localhost:5000/auth", data).then((response) => {
            console.log(response);
            navigate("/Login");
        })
      }

  return (
    <div className="centerdiv">
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            <Form className="formContainer">
                <ErrorMessage name="username" component={"span"} style={{"color":"red"}}/>
                <Field id="inputCreatePost" name="username" placeholder="UserName" style={{"height":"35px"}}/>
                <ErrorMessage name="password" component={"span"} style={{"color":"red"}}/>
                <Field id="inputCreatePost" name="password" placeholder="Password" autocomplete="off" style={{"height":"35px"}}/>
                <button type="submit">Sign Up </button>
            </Form>
      </Formik>
    </div>
  )
}

export default SignUp;
