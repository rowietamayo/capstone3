import { useContext } from "react"
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import { Link, NavLink } from "react-router-dom"
import UserContext from "../context/UserContext"

export default function AppNavbar() {
  const { user } = useContext(UserContext)

  return (
    <Navbar expand="lg" className="glassmorphism">
      <Container>
        <Navbar.Brand as={Link} to="/">
          {/* <Image
            alt="logo"
            src={"/image/logo.svg"}
            width="30"
            height="30"
            className="d-inline-block align-top logo"
            fluid
          />{" "} */}
          <h3>OHARA</h3>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto ">
            <Nav.Link as={NavLink} to="/" exact="true" className="right-nav">
              Home
            </Nav.Link>
            {/* <Nav.Link as={NavLink} to="/product" exact="true">
              Products
            </Nav.Link>{" "} */}
          </Nav>
          {user && user.id !== null && user.id !== undefined ? (
            user.isAdmin ? (
              <>
                <Nav>
                  <Nav.Link as={Link} to="/admin" className="right-nav">
                    Admin Dashboard
                  </Nav.Link>
                  <Nav.Link
                    as={NavLink}
                    to="/logout"
                    exact="true"
                    className="right-nav"
                  >
                    Logout
                  </Nav.Link>
                </Nav>
              </>
            ) : (
              <>
                <Nav>
                  <Nav.Link
                    as={NavLink}
                    to="/cart"
                    exact="true"
                    className="right-nav"
                  >
                    Cart
                  </Nav.Link>
                  <Nav.Link
                    as={NavLink}
                    to="/profile"
                    exact="true"
                    className="right-nav"
                  >
                    Profile
                  </Nav.Link>
                  <Nav.Link
                    as={NavLink}
                    to="/logout"
                    exact="true"
                    className="right-nav"
                  >
                    Logout
                  </Nav.Link>
                </Nav>
              </>
            )
          ) : (
            <>
              <Nav>
                <Nav.Link
                  as={NavLink}
                  to="/register"
                  exact="true"
                  className="right-nav"
                >
                  Register
                </Nav.Link>
                <Nav.Link
                  as={NavLink}
                  to="/login"
                  exact="true"
                  className="right-nav"
                >
                  Login
                </Nav.Link>
              </Nav>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
