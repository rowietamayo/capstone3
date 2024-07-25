import PropTypes from "prop-types"
import { Card } from "react-bootstrap"
import { Link } from "react-router-dom"

export default function ProductCard({ product }) {
  if (!product) return null

  const { _id, name, description, price } = product

  return (
    <Card className="w-100 mb-4">
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Card.Text className="text-danger">₱{price}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">
        <Link className="btn btn-primary w-100" to={`/products/${_id}`}>
          Details
        </Link>
      </Card.Footer>
    </Card>
  )
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
}
