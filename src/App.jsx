import { useEffect, useState } from "react"
import { Container } from "react-bootstrap"
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom"
import AdminDashboard from "./components/AdminDashboard"
import AppNavbar from "./components/AppNavbar"
import { UserProvider } from "./context/UserContext"
import AddProduct from "./pages/AddProduct"
import Cart from "./pages/Cart"
import Error from "./pages/Error"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Logout from "./pages/Logout"
import OrderHistory from "./pages/OrderHistory"
import ProductCatalog from "./pages/ProductCatalog"
import ProductDetails from "./pages/ProductDetails"
import Profile from "./pages/Profile"
import Register from "./pages/Registration"

function App() {
  const [user, setUser] = useState({ id: null, isAdmin: null })

  useEffect(() => {
    const token = localStorage.getItem("token")

    if (!token) {
      setUser({ id: null, isAdmin: null })
      return
    }

    fetch(`${import.meta.env.VITE_API_URL}/b1/users/details"`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data && data.user) {
          setUser({ id: data.user._id, isAdmin: data.user.isAdmin })
        } else {
          setUser({ id: null, isAdmin: null })
        }
      })
  }, [])
  return (
    <UserProvider value={{ user, setUser }}>
      <Router>
        <AppNavbar />
        <Container>
          <Routes>
            <Route path="*" element={<Error />} />
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/product" element={<ProductCatalog />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/addProduct" element={<AddProduct />} />
            <Route path="/products/:productId" element={<ProductDetails />} />
            <Route path="/history" element={<OrderHistory />} />
            <Route
              path="/admin"
              element={
                user && user.isAdmin ? (
                  <AdminDashboard />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </Container>
      </Router>
    </UserProvider>
  )
}

export default App
