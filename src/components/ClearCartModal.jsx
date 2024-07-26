import { Modal, Button } from "react-bootstrap";

const ClearCartModal = ({ showClearModal, setShowClearModal, handleClearCart }) => {
  return (
    <Modal show={showClearModal} onHide={() => setShowClearModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Clear All Items</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to clear all items from your cart?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowClearModal(false)}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleClearCart}>
          Clear All
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ClearCartModal;
