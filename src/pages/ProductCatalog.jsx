import { useContext, useEffect, useState } from "react"
import { Stack } from "react-bootstrap"
import ProductCard from "../components/ProductCard"
import UserContext from "../context/UserContext"

export default function Products() {
  const { user } = useContext(UserContext)
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        let fetchUrl =
          user.isAdmin === true
            ? "http://localhost:4001/b1/products/all"
            : "http://localhost:4001/b1/products/active"

        const response = await fetch(fetchUrl, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })

        if (!response.ok) {
          throw new Error("Failed to fetch products")
        }

        const data = await response.json()
        if (data.message === "No products found") {
          setProducts([])
        } else {
          setProducts(data.products)
        }
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [user])

  return (
    <div>
      <h1 className="text-center my-5">Our Products</h1>
      <Stack direction="horizontal" gap={4}>
        {products.map((product) => (
          <ProductCard key={product._id} productProp={product} />
        ))}
      </Stack>
    </div>
  )
}
