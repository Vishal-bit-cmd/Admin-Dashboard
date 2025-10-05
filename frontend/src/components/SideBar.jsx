import { Link } from "react-router-dom";

export default function Sidebar({ isOpen }) {
  return (
    <div
      className={`bg-light border-end vh-100 p-3 position-fixed top-0 ${
        isOpen ? "start-0" : "-start-100"
      } d-md-block`}
      style={{ width: "220px", transition: "0.3s" }}
    >
      <h5>Menu</h5>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link className="nav-link" to="/">
            Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/users">
            Users
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/customers">
            Customers
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/products">
            Products
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/orders">
            Orders
          </Link>
        </li>
      </ul>
    </div>
  );
}
