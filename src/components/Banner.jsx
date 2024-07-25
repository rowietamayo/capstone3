import PropTypes from "prop-types"
import { Button, Col, Container, Row } from "react-bootstrap"
import { Link } from "react-router-dom"

export default function Banner({ data }) {
  const { title, content, destination, buttonLabel } = data

  return (
    <Container>
      <Row>
        <Col>
          <img
            alt="reading"
            src={"src/image/read.svg"}
            width="600px"
            height="600px"
            className="d-flex-start position-absolute"
          />
        </Col>
        <Col style={{ marginTop: 250 }}>
          <h1>{title}</h1>
          <p>{content}</p>
          <Button variant="primary" as={Link} to={destination}>
            {buttonLabel}
          </Button>
        </Col>
      </Row>
    </Container>
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
