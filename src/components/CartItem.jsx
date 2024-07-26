import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const CartItem = ({ cart, index, handleShowModal, handleShowDeleteModal, truncateDescription }) => {
  return (
    <tr key={cart._id || index}>
      <td>{index + 1}</td>
      <td>
        <p>{cart.productId?.name || "N/A"}</p>
      </td>
      <td>
        <img
          alt="image"
          src={cart.productId?.url}
          width="120px"
          height="200px"
          className="text-center"
        />
      </td>
      <td>
        {truncateDescription(cart.productId?.description, 100)}{" "}
        <Link to={`/products/${cart.productId?._id}`}>See More</Link>
      </td>
      <td className="text-center">&#x20B1; {cart.productId?.price || "N/A"}</td>
      <td className="text-center">{cart.quantity || 0}</td>
      <td className="text-center">&#x20B1;{cart.subtotal || 0}</td>
      <td className="text-center">
        <Button variant="warning" onClick={() => handleShowModal(cart)}>
          Update
        </Button>
      </td>
      <td className="text-center">
        <Button variant="danger" onClick={() => handleShowDeleteModal(cart.productId?._id)}>
          Delete
        </Button>
      </td>
    </tr>
  );
};

export default CartItem;
