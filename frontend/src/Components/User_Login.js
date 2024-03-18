import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Form as BootstrapForm,
  Button,
} from "react-bootstrap";

export default function User_Login() {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const history = useHistory();

  const handleLoginButton = async (values, { resetForm }) => {
    try {
      let response = await axios.post(
        "http://localhost:3000/user/login",
        values
      );
      console.log("response ---> ", response.data);
      if (response.data.flag === 0) {
        toast(response.data.msg);
      } else {
        toast(response.data.msg);
        localStorage.setItem("UserToken", response.data.data);
        resetForm();
        setTimeout(() => {
          history.push("/user/dashboard");
        }, 3000);
      }
    } catch (error) {
      console.log("error during user logged ==> ", error.message);
    }
  };

  return (
    <div
      className="background-radial-gradient overflow-hidden"
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ToastContainer />
      <Container>
        <Row className="d-flex justify-content-center gx-lg-5 align-items-center ">
          <Col lg={6} md={8} sm={10} className="mb-5 mb-lg-0 position-relative">
            <div
              id="radius-shape-1"
              className="position-absolute rounded-circle shadow-5-strong"
            ></div>
            <div
              id="radius-shape-2"
              className="position-absolute shadow-5-strong"
            ></div>
            <Card className="bg-glass">
              <Card.Body className="px-4 py-5 px-md-5">
                <h3 className="text-center text-decoration-underline mb-3">
                  User Login
                </h3>
                <Formik initialValues={loginData} onSubmit={handleLoginButton}>
                  <BootstrapForm as={Form}>
                    <BootstrapForm.Group className="form-outline mb-4">
                      <BootstrapForm.Label htmlFor="username">
                        Username
                      </BootstrapForm.Label>
                      <Field
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Username"
                        className="form-control"
                      />
                    </BootstrapForm.Group>

                    <BootstrapForm.Group className="form-outline mb-4">
                      <BootstrapForm.Label htmlFor="password">
                        Password
                      </BootstrapForm.Label>
                      <Field
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Password"
                        className="form-control"
                      />
                    </BootstrapForm.Group>

                    <div className="d-grid gap-2 d-md-flex justify-content-md-between">
                      <Button
                        type="submit"
                        className="btn btn-primary btn-block mb-4"
                      >
                        Sign In
                      </Button>
                      <Button
                        type="button"
                        className="btn btn-primary btn-block mb-4"
                        onClick={() => history.push("/signup")}
                      >
                        Go To Signup Page
                      </Button>
                    </div>
                  </BootstrapForm>
                </Formik>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
