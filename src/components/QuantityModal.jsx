import { Modal, Button, Form } from "react-bootstrap";

const QuantityModal = ({ showModal, setShowModal, quantity, setQuantity, handleUpdateQuantity }) => {
  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Update Quantity</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              min="1"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          Close
        </Button>
        <Button variant="primary" onClick={handleUpdateQuantity}>
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default QuantityModal;
