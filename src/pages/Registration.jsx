import { useEffect, useState } from "react"
import { Button, Card, CardFooter, Form } from "react-bootstrap"
import Col from "react-bootstrap/Col"
import Image from "react-bootstrap/Image"
import InputGroup from "react-bootstrap/InputGroup"
import Row from "react-bootstrap/Row"
import { Link, Navigate } from "react-router-dom"
import Swal from "sweetalert2"

function Register() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [mobileNo, setMobileNo] = useState("")
  const [password, setPassword] = useState("")
  const [verifyPassword, setVerifyPassword] = useState("")
  const [isActive, setIsActive] = useState(false)
  const [isRegistered, setIsRegistered] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [emailError, setEmailError] = useState("")
  const [firstNameError, setFirstNameError] = useState("")
  const [lastNameError, setLastNameError] = useState("")
  const [mobileError, setMobileError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [verifyPasswordError, setVerifyPasswordError] = useState("")

  // Password validation on change
  useEffect(() => {
    if (verifyPassword && password !== verifyPassword) {
      setVerifyPasswordError("Passwords do not match")
    } else {
      setVerifyPasswordError("")
    }
  }, [password, verifyPassword])

  const registerUser = (e) => {
    e.preventDefault()
    setErrorMessage("")
    setFirstNameError("")
    setLastNameError("")
    setEmailError("")
    setMobileError("")
    setPasswordError("")
    setVerifyPasswordError("")

    if (!firstName.trim()) {
      setFirstNameError("First name is required")
      return
    }
    if (!lastName.trim()) {
      setLastNameError("Last name is required")
      return
    }
    if (!email.includes("@")) {
      setEmailError("Email is invalid")
      return
    }
    if (mobileNo.length !== 11) {
      setMobileError("Mobile number must be 11 digits")
      return
    }
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters")
      return
    }
    if (password !== verifyPassword) {
      setVerifyPasswordError("Passwords do not match")
      return
    }

    fetch(`${import.meta.env.VITE_API_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        mobileNo,
        password,
        verifyPassword,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Registered successfully") {
          setFirstName("")
          setLastName("")
          setEmail("")
          setMobileNo("")
          setPassword("")
          setVerifyPassword("")
          setIsRegistered(true)

          Swal.fire({
            title: "Registration Successful",
            icon: "success",
            text: "Thank you for registering!",
          })
        } else {
          setErrorMessage(data.error)
        }
      })
      .catch((error) => {
        console.error("Error:", error.message)
      })
  }

  useEffect(() => {
    setIsActive(
      email !== "" &&
        password !== "" &&
        verifyPassword !== "" &&
        password === verifyPassword
    )
  }, [email, password, verifyPassword])

  if (isRegistered) {
    return <Navigate to="/login" />
  }

  return (
    <Row>
      <Col md={6} className="d-flex justify-content-center ">
        <Image
          alt="sign up"
          src={"/image/signup.svg"}
          fluid
          className="signup"
        />
      </Col>
      <Col sm={12} md={6}>
        <Form onSubmit={registerUser}>
          {errorMessage && (
            <div className="alert alert-danger text-center">{errorMessage}</div>
          )}
          <div className="form-wrapper mt-4">
            <Card id="registration-card">
              <Form.Group className="p-3">
                <p className=" text-start fs-5 title fw-bold ">
                  Create new account
                </p>
                <Form.Label htmlFor="form-firstname" className="mb-0">
                  Full Name:
                </Form.Label>
                <Row>
                  <Col className="me-0 pe-0">
                    <Form.Group>
                      <InputGroup>
                        <InputGroup.Text>
                          <Image src="image/user.svg" id="form-image" />
                        </InputGroup.Text>
                        <Form.Control
                          type="text"
                          placeholder="First Name"
                          id="form-firstname"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                      </InputGroup>
                      {firstNameError && (
                        <Form.Text className="text-danger">
                          {firstNameError}
                        </Form.Text>
                      )}
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Control
                        type="text"
                        placeholder="Last Name"
                        id="form-lastname"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                      {lastNameError && (
                        <Form.Text className="text-danger">
                          {lastNameError}
                        </Form.Text>
                      )}
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group>
                  <Form.Label htmlFor="form-email" className="mt-2 mb-0">
                    Email:
                  </Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <Image src="image/email.svg" id="form-image" />
                    </InputGroup.Text>
                    <Form.Control
                      type="text"
                      placeholder="Enter Email"
                      id="form-email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </InputGroup>
                  {emailError && (
                    <Form.Text className="text-danger">{emailError}</Form.Text>
                  )}
                </Form.Group>

                <Form.Group>
                  <Form.Label htmlFor="form-mobile" className="mt-2 mb-0">
                    Mobile No:
                  </Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <Image src="image/phone.svg" id="form-image" />
                    </InputGroup.Text>
                    <Form.Control
                      type="number"
                      placeholder="Enter 11 Digit No."
                      value={mobileNo}
                      id="form-mobile"
                      onChange={(e) => setMobileNo(e.target.value)}
                    />
                  </InputGroup>
                  {mobileError && (
                    <Form.Text className="text-danger">{mobileError}</Form.Text>
                  )}
                </Form.Group>

                <Form.Group>
                  <Form.Label htmlFor="form-password" className="mt-2 mb-0">
                    Password:
                  </Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <Image src="image/password.svg" id="form-image" />
                    </InputGroup.Text>
                    <Form.Control
                      type="password"
                      placeholder="Enter Password"
                      value={password}
                      id="form-password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </InputGroup>
                  {passwordError && (
                    <Form.Text className="text-danger">
                      {passwordError}
                    </Form.Text>
                  )}
                </Form.Group>

                <Form.Group>
                  <Form.Label htmlFor="form-confirmpass" className="mt-2 mb-0">
                    Confirm Password:
                  </Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <Image src="image/password.svg" id="form-image" />
                    </InputGroup.Text>
                    <Form.Control
                      type="password"
                      placeholder="Confirm Password"
                      value={verifyPassword}
                      id="form-confirmpass"
                      onChange={(e) => setVerifyPassword(e.target.value)}
                    />
                  </InputGroup>
                  {verifyPasswordError && (
                    <Form.Text className="text-danger">
                      {verifyPasswordError}
                    </Form.Text>
                  )}
                </Form.Group>
              </Form.Group>

              <CardFooter className="text-muted">
                <Button
                  className="w-100"
                  variant={isActive ? "primary" : "secondary"}
                  type="submit"
                  disabled={!isActive}
                >
                  {isActive
                    ? "Submit"
                    : "Please Enter your Registration details"}
                </Button>
              </CardFooter>
            </Card>
          </div>

          <p
            className="text-center mt-1"
            style={{ textDecoration: "none", color: "#eee1c9" }}
          >
            Already have an account?{" "}
            <Link
              to="/login"
              style={{
                color: "#eee1c9",
                fontWeight: "bold",
              }}
            >
              Click here
            </Link>{" "}
            to log in
          </p>
        </Form>
      </Col>
    </Row>
  )
}

export default Register
