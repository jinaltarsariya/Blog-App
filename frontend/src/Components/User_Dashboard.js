import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Container, Row, Col, Card } from "react-bootstrap";
import { BiSolidCategory } from "react-icons/bi";
import { FaBloggerB } from "react-icons/fa";
import Navbar from "./Navbar";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function User_Dashboard() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [totalCategories, setTotalCategories] = useState(0);
  const [totalBlogs, setTotalBlogs] = useState(0);
  const history = useHistory();

  const getUserToken = localStorage.getItem("UserToken");
  useEffect(() => {
    if (!getUserToken) {
      history.push("/");
    } else {
      fetchCategoryData();
      fetchBlogData();
    }
  }, [history]);

  const fetchCategoryData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/category/list", {
        headers: { token: getUserToken },
      });
      setTotalCategories(response.data.data.length);
    } catch (error) {
      console.log("Error fetching category data:", error);
    }
  };

  const fetchBlogData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/blog/list", {
        headers: { token: getUserToken },
      });
      setTotalBlogs(response.data.data.length);
    } catch (error) {
      console.log("Error fetching blog data:", error);
    }
  };

  return (
    <div
      className="background-radial-gradient"
      style={{
        minHeight: "100vh",
        paddingTop: "70px",
      }}
    >
      <ToastContainer />
      <section>
        <Navbar activePage={activePage} setActivePage={setActivePage} />
        <Container fluid>
          <h3 className="text-center text-light text-decoration-underline pt-3">
            Dashboard Page
          </h3>
          <Row
            xs={1}
            md={2}
            lg={3}
            className="g-4"
            style={{ padding: "40px 0px 100px 0px" }}
          >
            <Col>
              <Card className="total-category-card bg-light">
                <Card.Body className="d-flex align-items-center justify-content-between">
                  <div>
                    <Card.Title>Total Category</Card.Title>
                    <Card.Text className="text-dark h3">
                      {totalCategories}
                    </Card.Text>
                  </div>
                  <BiSolidCategory size={32} />
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card className="total-blog-card bg-light">
                <Card.Body className="d-flex align-items-center justify-content-between">
                  <div>
                    <Card.Title>Total Blogs</Card.Title>
                    <Card.Text className="text-dark h3">{totalBlogs}</Card.Text>
                  </div>
                  <FaBloggerB size={32} />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
}
