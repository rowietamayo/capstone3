import { Modal, Button } from "react-bootstrap";

const DeleteItemModal = ({ showDeleteModal, setShowDeleteModal, handleDeleteItem }) => {
  return (
    <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Item</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete this item from your cart?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDeleteItem}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteItemModal;
