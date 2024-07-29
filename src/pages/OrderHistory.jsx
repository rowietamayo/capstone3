import { useEffect, useState } from "react"
import { Accordion, Button, Card } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

const GET_ALL_ORDERS_URL = `${import.meta.env.VITE_API_URL}/orders/all-orders`

export default function OrderHistory() {
  const [orders, setOrders] = useState([])
  const navigate = useNavigate()

  const handleFetchData = async () => {
    try {
      const response = await fetch(GET_ALL_ORDERS_URL, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      if (response.ok) {
        const data = await response.json()
        setOrders(data.orders)
      } else {
        console.error("Failed to fetch orders")
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    handleFetchData()
  }, [])

  return (
    <div>
      <h1 className="text-center my-4">Admin Dashboard</h1>
      <div className="d-flex justify-content-center gap-1 mb-4"></div>
      <Button
        onClick={() => navigate(-1)}
        variant="outline-secondary"
        size="sm"
      >
        Back
      </Button>
      <Accordion className="mt-3">
        {orders.map((order, index) => (
          <Accordion.Item eventKey={index.toString()} key={order._id}>
            <Accordion.Header>
              Orders from user:
              {order.userId?.email} on{" "}
              {new Date(order.orderedOn).toLocaleDateString()}
            </Accordion.Header>
            <Accordion.Body>
              <Card.Body>
                <p>
                  <strong>Order Date:</strong>{" "}
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
                <p>
                  <strong>Total Price:</strong> {order.totalPrice}
                </p>
                <h5>Products Ordered:</h5>
                <ul>
                  {order.productsOrdered.map((product, idx) => (
                    <li key={idx}>
                      {product.productId
                        ? `${product.productId.name} - Quantity: ${product.quantity}`
                        : "Product information unavailable"}
                    </li>
                  ))}
                </ul>
              </Card.Body>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  )
}
