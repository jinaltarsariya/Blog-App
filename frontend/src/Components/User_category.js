import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";
import Navbar from "./Navbar";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { FaPlus } from "react-icons/fa6";
import { Formik, Field, Form } from "formik";
import Footer from "./Footer";
import { useHistory } from "react-router-dom";

export default function User_category() {
  const [show, setShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [updateShow, setUpdateShow] = useState(false);
  const [categoryIdToDelete, setCategoryIdToDelete] = useState(null);
  const [categoryUpdate, setCategoryUpdate] = useState(null);
  const [activePage, setActivePage] = useState("Category");
  const [categoryData, setCategoryData] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [initialValue, setInitialValue] = useState({
    name: "",
    image: null,
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleDeleteClose = () => setDeleteShow(false);
  const handleUpdateClose = () => setUpdateShow(false);
  const history = useHistory();

  let getUserToken = localStorage.getItem("UserToken");

  const fetchCategoryData = async () => {
    try {
      let response = await axios.get("http://localhost:3000/category/list", {
        headers: { token: getUserToken },
      });
      console.log(response.data);
      if (response.data.flag === 1) {
        setCategoryData(response.data.data);
      } else {
        toast(response.data.msg);
      }
    } catch (error) {
      console.log("error during fetch category --> ", error.message);
    }
  };

  useEffect(() => {
    if (!getUserToken) {
      history.push("/");
    } else {
      fetchCategoryData();
    }
  }, [history]);

  const handleFileChange = (event) => {
    setImageFile(event.target.files[0]);
  };

  const handleFileChangeUpdate = (event) => {
    setImageFile(event.target.files[0]);
  };

  const createCategoryData = async (values, { resetForm }) => {
    try {
      let formData = new FormData();
      formData.append("name", values.name);
      formData.append("image", imageFile);

      let response = await axios.post(
        "http://localhost:3000/category/create",
        formData,
        {
          headers: {
            token: getUserToken,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("response ---> ", response);
      toast(response.data.msg);
      setCategoryData([...categoryData, response.data]);
      resetForm();
      fetchCategoryData();
    } catch (error) {
      console.log("error --> ", error.message);
    }
  };

  const handleDeleteShow = (categoryId) => {
    setCategoryIdToDelete(categoryId);
    setDeleteShow(true);
  };

  const confirmDelete = async () => {
    try {
      let response = await axios.delete(
        `http://localhost:3000/category/delete?categoryId=${categoryIdToDelete}`,
        {
          headers: { token: getUserToken },
        }
      );
      toast(response.data.msg);
      setCategoryData(
        categoryData.filter((category) => category.id !== categoryIdToDelete)
      );
      setDeleteShow(false);
      setCategoryIdToDelete(null);
      fetchCategoryData();
    } catch (error) {
      console.log("error --> ", error.message);
    }
  };

  const handleUpdateShow = (categoryData) => {
    setCategoryUpdate(categoryData);
    setInitialValue({
      name: categoryData.name,
      image: categoryData.image,
    });
    setUpdateShow(true);
  };

  const updateCategoryData = async (values, { resetForm }) => {
    try {
      let formData = new FormData();
      formData.append("name", values.name);
      formData.append("image", imageFile);

      let response = await axios.put(
        `http://localhost:3000/category/update?categoryId=${categoryUpdate._id}`,
        formData,
        {
          headers: {
            token: getUserToken,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast(response.data.msg);
      fetchCategoryData();
      setUpdateShow(false);
      setCategoryUpdate(null);
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
            Category Page
          </h3>
          <Row style={{ padding: "40px 0px 100px 0px" }}>
            <Col xs={12} className="p-3">
              <Row xs={1} sm={2} md={3} lg={5} className="g-3">
                {categoryData.map((category) => (
                  <Col key={category.id}>
                    <Card style={{ width: "100%" }}>
                      <Card.Img
                        variant="top"
                        src={"http://localhost:3000/images/" + category.image}
                      />
                      <Card.Body>
                        <Card.Title>
                          {" "}
                          {category?.name?.length > 15
                            ? category?.name?.slice(0, 15) + "..."
                            : category?.name}
                        </Card.Title>
                        <div className="d-flex justify-content-between">
                          <Button
                            type="button"
                            variant="primary"
                            size="sm"
                            onClick={() => handleUpdateShow(category)}
                          >
                            Update
                          </Button>
                          <Button
                            type="button"
                            variant="danger"
                            size="sm"
                            onClick={() => handleDeleteShow(category._id)}
                          >
                            Delete
                          </Button>
                        </div>
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
      </section>
      <Footer />

      {/* create model  */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik initialValues={initialValue} onSubmit={createCategoryData}>
            <Form className="row g-3">
              <Col md={12}>
                <label htmlFor="name" className="form-label">
                  Category Name
                </label>
                <Field
                  id="name"
                  name="name"
                  placeholder="Category Name"
                  className="form-control"
                />
              </Col>

              <Col>
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
          <Modal.Title>Update Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik initialValues={initialValue} onSubmit={updateCategoryData}>
            <Form className="row g-3">
              <Col md={12}>
                <label htmlFor="name" className="form-label">
                  Category Name
                </label>
                <Field
                  id="name"
                  name="name"
                  placeholder="Category Name"
                  className="form-control"
                />
              </Col>

              <Col>
                <label htmlFor="newImage" className="form-label">
                  Choose New Image
                </label>
                <Field
                  type="file"
                  id="newImage"
                  name="newImage"
                  className="form-control"
                  onChange={handleFileChangeUpdate}
                />
                <div>{initialValue?.image}</div>
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
