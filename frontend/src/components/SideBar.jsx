import { Link } from "react-router-dom";

export default function Sidebar({ isOpen, closeSidebar }) {
  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <ul className="nav flex-column mt-3">
        <li className="nav-item">
          <Link to="/dashboard" className="nav-link" onClick={closeSidebar}>
            Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/users" className="nav-link" onClick={closeSidebar}>
            Users
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/customers" className="nav-link" onClick={closeSidebar}>
            Customers
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/products" className="nav-link" onClick={closeSidebar}>
            Products
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/orders" className="nav-link" onClick={closeSidebar}>
            Orders
          </Link>
        </li>
      </ul>
    </div>
  );
}
