// src/components/OrdersTable.jsx
import { useEffect, useState } from "react";
import axios from "axios";

export default function OrdersTable() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/orders");
        setOrders(res.data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="p-3">
      <h3>Orders</h3>
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
          {orders.map((o) => (
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
          ))}
        </tbody>
      </table>
    </div>
  );
}
