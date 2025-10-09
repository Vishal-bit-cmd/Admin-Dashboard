import { useEffect, useState } from "react";
import api from "../services/api";

export default function OrdersTable() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const fetchOrders = async (searchQuery = "", statusFilter = "") => {
    try {
      const res = await api.get("/orders", {
        params: { search: searchQuery, status: statusFilter },
      });
      setOrders(res.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  useEffect(() => {
    fetchOrders(search, status);
  }, [search, status]);

  return (
    <div className="p-3">
      <h3>Orders</h3>
      {/* Filters */}
      <div className="d-flex gap-3 mb-3">
        <input
          type="text"
          placeholder="Search..."
          className="form-control w-50"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="form-select w-25"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <table className="table table-bordered table-hover">
        <thead className="table-light">
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.length ? (
            orders.map((o) => (
              <tr key={o.order_id}>
                <td>{o.order_id}</td>
                <td>{o.customer_name}</td>
                <td>
                  <span
                    className={`badge ${
                      o.status === "delivered"
                        ? "bg-success"
                        : o.status === "shipped"
                        ? "bg-primary"
                        : o.status === "pending"
                        ? "bg-warning text-dark"
                        : "bg-danger"
                    }`}
                  >
                    {o.status}
                  </span>
                </td>
                <td>{new Date(o.created_at).toLocaleDateString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="text-center">
                No orders found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
