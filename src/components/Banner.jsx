import PropTypes from "prop-types"
import { Button, Col, Row } from "react-bootstrap"
import { Link } from "react-router-dom"

export default function Banner({ data }) {
  const { title, content, destination, buttonLabel } = data

  return (
    <Row>
      <Col>
        <h1>{title}</h1>
        <p>{content}</p>
        <Button variant="primary" as={Link} to={destination}>
          {buttonLabel}
        </Button>
      </Col>
    </Row>
  )
}

Banner.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    destination: PropTypes.string.isRequired,
    buttonLabel: PropTypes.string.isRequired,
  }).isRequired,
}
