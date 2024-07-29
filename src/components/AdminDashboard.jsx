import { useEffect, useState } from "react"
import { Button, Table } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import ArchiveProduct from "../components/ArchiveProduct"
import UpdateProduct from "../components/UpdateProduct"

const ALL_PRODUCTS_URL = `${import.meta.env.VITE_API_URL}/products/all`

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [products, setProducts] = useState([])

  const handleFetchData = async () => {
    try {
      const response = await fetch(ALL_PRODUCTS_URL, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      if (response.ok) {
        const data = await response.json()
        setProducts(data.products)
      } else {
        console.error("Failed to fetch products")
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
      <div className="d-flex justify-content-center gap-1 mb-4">
        <Button variant="primary" onClick={() => navigate("/addProduct")}>
          Create New Product
        </Button>
        <Button variant="success" onClick={() => navigate("/history")}>
          Show User Orders
        </Button>
      </div>
      <Table striped bordered hover responsive variant="dark">
        <thead>
          <tr className="text-center">
            <th>ID</th>
            <th>Book Cover</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Availability</th>
            <th colSpan="2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product._id}</td>
              <td>
                <img
                  alt="image"
                  src={product.url}
                  width="150px"
                  height="200px"
                  className="text-center "
                />
              </td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td className={product.isActive ? "text-success" : "text-danger"}>
                {product.isActive ? "Available" : "Unavailable"}
              </td>
              <td>
                <UpdateProduct product={product} onSuccess={handleFetchData} />
              </td>
              <td>
                <ArchiveProduct
                  id={product._id}
                  isActive={product.isActive}
                  onSuccess={handleFetchData}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}
