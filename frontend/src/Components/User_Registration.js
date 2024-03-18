import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  Form as BootstrapForm,
  Button,
} from "react-bootstrap";

export default function User_Registration() {
  const [registrationData, setRegistrationData] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    password: "",
    confirmPassword: "",
  });

  const history = useHistory();

  const handleSignupButton = async (values, { resetForm }) => {
    try {
      let response = await axios.post(
        "http://localhost:3000/user/register",
        values
      );
      console.log("response ---> ", response.data);
      if (response.data.flag === 0) {
        toast(response.data.msg);
      } else {
        toast(response.data.msg);
        resetForm();
        setTimeout(() => {
          history.push("/");
        }, 3000);
      }
    } catch (error) {
      console.log("error during user registration ==> ", error.message);
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
        <Row className="d-flex justify-content-center align-items-center">
          <Col
            lg={8}
            md={12}
            sm={12}
            className="mb-5 mb-lg-0 position-relative"
          >
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
                  User Registration
                </h3>
                <Formik
                  initialValues={registrationData}
                  onSubmit={handleSignupButton}
                >
                  <BootstrapForm as={Form}>
                    <Row>
                      <Col lg={12} md={12} sm={12}>
                        <BootstrapForm.Group className="form-outline mb-4">
                          <BootstrapForm.Label htmlFor="name">
                            Name
                          </BootstrapForm.Label>
                          <Field
                            id="name"
                            name="name"
                            placeholder="Name"
                            className="form-control"
                          />
                        </BootstrapForm.Group>
                      </Col>
                      <Col lg={6} md={6} sm={12}>
                        <BootstrapForm.Group className="form-outline mb-4">
                          <BootstrapForm.Label htmlFor="email">
                            Email
                          </BootstrapForm.Label>
                          <Field
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Email"
                            className="form-control"
                          />
                        </BootstrapForm.Group>
                      </Col>
                      <Col lg={6} md={6} sm={12}>
                        <BootstrapForm.Group className="form-outline mb-4">
                          <BootstrapForm.Label htmlFor="mobileNumber">
                            Mobile Number
                          </BootstrapForm.Label>
                          <Field
                            type="tel"
                            id="mobileNumber"
                            name="mobileNumber"
                            placeholder="Mobile Number"
                            className="form-control"
                          />
                        </BootstrapForm.Group>
                      </Col>
                      <Col lg={6} md={6} sm={12}>
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
                      </Col>
                      <Col lg={6} md={6} sm={12}>
                        <BootstrapForm.Group className="form-outline mb-4">
                          <BootstrapForm.Label htmlFor="confirmPassword">
                            Confirm Password
                          </BootstrapForm.Label>
                          <Field
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            className="form-control"
                          />
                        </BootstrapForm.Group>
                      </Col>
                    </Row>

                    <div className="d-grid gap-2 d-md-flex justify-content-md-between">
                      <Button
                        type="submit"
                        className="btn btn-primary btn-block mb-4"
                      >
                        Sign Up
                      </Button>

                      <Button
                        type="button"
                        className="btn btn-primary btn-block mb-4"
                        onClick={() => history.push("/")}
                      >
                        Go To Login Page
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
