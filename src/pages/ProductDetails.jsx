import { useContext, useEffect, useState } from "react"
import { Button, Card, Col, Container, Row } from "react-bootstrap"
import { Link, useNavigate, useParams } from "react-router-dom"
import Swal from "sweetalert2"
import UserContext from "../context/UserContext"

export default function ProductDetails() {
  const navigate = useNavigate()
  const { productId } = useParams()
  const { user } = useContext(UserContext)
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

  console.log(product.url)
  return (
    <Container className="mt-3 mb-5">
      <Row>
        <Col lg={{ span: 6, offset: 3 }}>
          <Button
            button
            onClick={() => navigate(-1)}
            variant="outline-secondary mb-3 "
            size="sm"
          >
            Back
          </Button>{" "}
          <Card>
            <Card.Header className="text-center" as="h5">
              {product.name}
            </Card.Header>
            <Card.Body>
              <div className="text-center">
                <Card.Img
                  alt="image"
                  src={product.url}
                  height="500px"
                  style={{ width: "auto", borderRadius: 0 }}
                />
              </div>
              <Card.Text className="mt-3">{product.description}</Card.Text>
              <Card.Text
                className="mt-3 text-danger"
                style={{ fontWeight: "bold" }}
              >
                ₱{product.price}
              </Card.Text>
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
