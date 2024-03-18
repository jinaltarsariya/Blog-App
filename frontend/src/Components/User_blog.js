import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "./Navbar";
import axios from "axios";
import { FaPlus } from "react-icons/fa6";
import { Formik, Field, Form } from "formik";
import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./Footer";
import { useHistory } from "react-router-dom";

export default function User_blog() {
  const [show, setShow] = useState(false);
  const [activePage, setActivePage] = useState("Blog");
  const [blogData, setBlogData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [deleteShow, setDeleteShow] = useState(false);
  const [updateShow, setUpdateShow] = useState(false);
  const [blogIdToDelete, setblogIdToDelete] = useState(null);
  const [blogUpdate, setBlogUpdate] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [initialValue, setInitialValue] = useState({
    title: "",
    discription: "",
    image: null,
    categoryId: "",
  });

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const handleDeleteClose = () => setDeleteShow(false);
  const handleUpdateClose = () => setUpdateShow(false);
  const history = useHistory();

  let getUserToken = localStorage.getItem("UserToken");

  useEffect(() => {
    if (!getUserToken) {
      history.push("/");
    } else {
      fetchCategoryData();
      fetchBlogData();
    }
  }, [history]);

  const handleFileChange = (event) => {
    setImageFile(event.target.files[0]);
  };

  const handleFileChangeUpdate = (event) => {
    setImageFile(event.target.files[0]);
  };

  const fetchBlogData = async () => {
    try {
      let response = await axios.get("http://localhost:3000/blog/list", {
        headers: { token: getUserToken },
      });
      console.log(response.data);
      if (response.data.flag === 1) {
        setBlogData(response.data.data);
      } else {
        toast(response.data.msg);
      }
    } catch (error) {
      console.log("error during fetch blog --> ", error.message);
    }
  };

  const fetchCategoryData = async () => {
    try {
      let response = await axios.get("http://localhost:3000/category/list", {
        headers: { token: getUserToken },
      });
      console.log(response.data);
      if (response.data.flag === 1) {
        setCategories(response.data.data);
      } else {
        toast(response.data.msg);
      }
    } catch (error) {
      console.log("error during fetch category --> ", error.message);
    }
  };

  const createBlogData = async (values, { resetForm }) => {
    try {
      let formData = new FormData();
      formData.append("title", values.title);
      formData.append("discription", values.discription);
      formData.append("image", imageFile);
      formData.append("categoryId", selectedCategoryId);

      let response = await axios.post(
        "http://localhost:3000/blog/create",
        formData,
        {
          headers: {
            token: getUserToken,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast(response.data.msg);
      setBlogData([...blogData, response.data]);
      resetForm();
      fetchBlogData();
    } catch (error) {
      console.log("error --> ", error.message);
    }
  };

  const handleDeleteShow = (blog) => {
    setblogIdToDelete(blog);
    setDeleteShow(true);
  };

  const confirmDelete = async () => {
    try {
      let response = await axios.delete(
        `http://localhost:3000/blog/delete?blogId=${blogIdToDelete}`,
        {
          headers: { token: getUserToken },
        }
      );
      toast(response.data.msg);
      setBlogData(
        blogData.filter((category) => category.id !== blogIdToDelete)
      );
      setDeleteShow(false);
      setblogIdToDelete(null);
      fetchBlogData();
    } catch (error) {
      console.log("error --> ", error.message);
    }
  };

  const handleUpdateShow = (blogData) => {
    setBlogUpdate(blogData);
    setInitialValue({
      title: blogData.title,
      discription: blogData.discription,
      image: null,
    });
    setUpdateShow(true);
  };

  const updateCategoryData = async (values, { resetForm }) => {
    try {
      let formData = new FormData();
      formData.append("title", values.title);
      formData.append("discription", values.discription);
      formData.append("image", imageFile);

      let response = await axios.put(
        `http://localhost:3000/blog/update?blogId=${blogUpdate._id}`,
        formData,
        {
          headers: {
            token: getUserToken,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("response --> ", response.data);
      toast(response.data.msg);
      fetchBlogData();
      setUpdateShow(false);
      setBlogUpdate(null);
      resetForm();
    } catch (error) {
      console.log("error ---> ", error.message);
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
            Blog Page
          </h3>
          <Row style={{ padding: "40px 0px 100px 0px" }}>
            <Col>
              <Row xs={1} sm={1} md={2} lg={4} className="p-2">
                {blogData.map((blog) => (
                  <Col key={blog.id} className="mb-3">
                    <Card>
                      <Card.Img
                        src={"http://localhost:3000/images/" + blog.image}
                      />
                      <Card.Body>
                        <Card.Title className="m-0">
                          {" "}
                          <b>Title : </b>
                          {blog?.title?.length > 15
                            ? blog?.title?.slice(0, 15) + "..."
                            : blog?.title}
                        </Card.Title>
                        <Card.Text>
                          <div className="">
                            <b>Category Name : </b>
                            {blog.categoryId ? blog.categoryId.name : "Anknown"}
                          </div>
                          <div className="">
                            <b>Discription : </b>
                            {blog.discription}
                          </div>
                        </Card.Text>
                        <Button
                          variant="primary"
                          className="m-1"
                          onClick={() => handleUpdateShow(blog)}
                        >
                          Update
                        </Button>
                        <Button
                          variant="danger"
                          className="m-1"
                          onClick={() => handleDeleteShow(blog._id)}
                        >
                          Delete
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
              <div
                className="position-fixed"
                style={{ bottom: "20px", right: "20px" }}
              >
                <Button onClick={handleShow} variant="primary">
                  <FaPlus /> Create
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
        <Footer />
      </section>

      {/* create model  */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create Blog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik initialValues={initialValue} onSubmit={createBlogData}>
            <Form className="row g-3">
              <Col md={12}>
                <label htmlFor="title" className="form-label">
                  Blog Name
                </label>
                <Field
                  id="title"
                  name="title"
                  placeholder="Blog Name"
                  className="form-control"
                />
              </Col>

              <Col md={12}>
                <label htmlFor="discription" className="form-label">
                  Description
                </label>
                <Field
                  id="discription"
                  name="discription"
                  placeholder="Discription"
                  className="form-control"
                />
              </Col>

              <Col md={12}>
                <label htmlFor="category" className="form-label">
                  Category
                </label>
                <select
                  id="category"
                  className="form-select"
                  name="categoryId"
                  value={selectedCategoryId}
                  onChange={(e) => setSelectedCategoryId(e.target.value)}
                >
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </Col>

              <Col md={12}>
                <label htmlFor="image" className="form-label">
                  Choose Image
                </label>
                <Field
                  type="file"
                  id="image"
                  name="image"
                  className="form-control"
                  onChange={handleFileChange}
                />
              </Col>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button type="submit" variant="primary" onClick={handleClose}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Form>
          </Formik>
        </Modal.Body>
      </Modal>

      {/* delete model  */}
      <Modal show={deleteShow} onHide={handleDeleteClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this category?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={confirmDelete}>
            Confirm Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* update model  */}
      <Modal show={updateShow} onHide={handleUpdateClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update Blog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik initialValues={initialValue} onSubmit={updateCategoryData}>
            <Form className="row g-3">
              <Col md={12}>
                <label htmlFor="title" className="form-label">
                  Blog Name
                </label>
                <Field
                  id="title"
                  name="title"
                  placeholder="Blog Name"
                  className="form-control"
                />
              </Col>

              <Col md={12}>
                <label htmlFor="discription" className="form-label">
                  Description
                </label>
                <Field
                  id="discription"
                  name="discription"
                  placeholder="Discription"
                  className="form-control"
                />
              </Col>

              <Col md={12}>
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  className="form-select form-select-lg"
                  name="categoryId"
                  value={selectedCategoryId}
                  onChange={(e) => setSelectedCategoryId(e.target.value)}
                >
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </Col>

              <Col md={12}>
                <label htmlFor="image" className="form-label">
                  Choose Image
                </label>
                <Field
                  type="file"
                  id="image"
                  name="image"
                  className="form-control"
                  onChange={handleFileChangeUpdate}
                />
              </Col>

              <Modal.Footer>
                <Button variant="secondary" onClick={handleUpdateClose}>
                  Close
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  onClick={handleUpdateClose}
                >
                  Save Changes
                </Button>
              </Modal.Footer>
            </Form>
          </Formik>
        </Modal.Body>
      </Modal>
    </div>
  );
}
