import { useEffect, useState } from "react"
import { Container } from "react-bootstrap"
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import AppNavbar from "./components/AppNavbar"
import { UserProvider } from "./context/UserContext"
import Login from "./pages/Login"
import ProductCatalog from "./pages/ProductCatalog"
import Register from "./pages/Registration"

function App() {
  const [user, setUser] = useState({ id: null, isAdmin: null })

  useEffect(() => {
    fetch("http://localhost:4001/b1/users/details", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setUser({ id: data._id, isAdmin: data.isAdmin })
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
            <Route path="/products" element={<ProductCatalog />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Container>
      </Router>
    </UserProvider>
  )
}

export default App
