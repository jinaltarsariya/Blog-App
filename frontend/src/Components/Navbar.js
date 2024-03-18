import React from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

export default function CustomNavbar({ activePage, setActivePage }) {
  const history = useHistory();

  // Logout function
  const handleLogout = () => {
    history.push("/");
    localStorage.removeItem("UserToken");
  };

  return (
    <Navbar
      bg="light"
      variant="light"
      fixed="top"
      className="shadow"
      expand="lg"
    >
      <Container fluid>
        <Navbar.Brand>Blog Project</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav" className="fs-5">
          <Nav className="mx-auto">
            <Link
              to="/user/dashboard"
              className={`nav-link ${
                activePage === "Dashboard" ? "active" : ""
              }`}
            >
              Dashboard
            </Link>
            <Link
              to="/user/category"
              className={`nav-link ${
                activePage === "Category" ? "active" : ""
              }`}
            >
              Category
            </Link>
            <Link
              to="/user/blog"
              className={`nav-link ${activePage === "Blog" ? "active" : ""}`}
            >
              Blog
            </Link>
          </Nav>
          <Nav className="ms-auto">
            <Button variant="outline-dark" onClick={handleLogout}>
              <FaSignOutAlt /> Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
