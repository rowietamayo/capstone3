import { useContext, useEffect, useState } from "react"
import { Button, Card, Col, Container, Row } from "react-bootstrap"
import { Link, useNavigate, useParams } from "react-router-dom"
import Swal from "sweetalert2"
import UserContext from "../context/UserContext"

export default function ProductDetails() {
  const { productId } = useParams()
  const { user } = useContext(UserContext)
  const navigate = useNavigate()

  const [product, setProduct] = useState({})

  useEffect(() => {
    fetch(`http://localhost:4001/b1/products/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data.product)
      })
      .catch((error) => {
        console.error("Error fetching product:", error)
        Swal.fire({
          title: "Error",
          icon: "error",
          text: "Failed to load product details.",
        })
      })
  }, [productId])

  return (
    <Container className="mt-5">
      <Row>
        <Col lg={{ span: 6, offset: 3 }}>
          <Card>
            <Card.Body className="text-center">
              <Card.Title>{product.name}</Card.Title>
              <Card.Subtitle>Description:</Card.Subtitle>
              <Card.Text>{product.description}</Card.Text>
              <Card.Subtitle>Price:</Card.Subtitle>
              <Card.Text>₱{product.price}</Card.Text>
              {user && user.id ? (
                <Button variant="primary" block="true">
                  Add to Cart
                </Button>
              ) : (
                <Link className="btn btn-danger btn-block" to="/login">
                  Log in to Buy
                </Link>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}
