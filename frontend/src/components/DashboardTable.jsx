// src/components/DashboardTable.jsx
import { useEffect, useState } from "react";
import axios from "axios";

export default function DashboardTable() {
  const [recentOrders, setRecentOrders] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [topCustomers, setTopCustomers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ordersRes = await axios.get("http://localhost:5000/api/orders");
        setRecentOrders(ordersRes.data);

        const productsRes = await axios.get(
          "http://localhost:5000/api/charts/sales-by-product"
        );
        setTopProducts(productsRes.data);

        const customersRes = await axios.get(
          "http://localhost:5000/api/charts/top-customers"
        );
        setTopCustomers(customersRes.data);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-3">
      <h3>Dashboard Overview</h3>

      {/* Recent Orders */}
      <div className="mt-4">
        <h5>Recent Orders</h5>
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
            {recentOrders.map((o) => (
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

      {/* Top Products */}
      <div className="mt-4">
        <h5>Top Products by Sales</h5>
        <table className="table table-bordered table-hover">
          <thead className="table-light">
            <tr>
              <th>Product Name</th>
              <th>Total Sales ($)</th>
            </tr>
          </thead>
          <tbody>
            {topProducts.map((p, idx) => (
              <tr key={idx}>
                <td>{p.product_name}</td>
                <td>{Number(p.total_sales).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Top Customers */}
      <div className="mt-4">
        <h5>Top Customers by Spending</h5>
        <table className="table table-bordered table-hover">
          <thead className="table-light">
            <tr>
              <th>Customer Name</th>
              <th>Total Spent ($)</th>
            </tr>
          </thead>
          <tbody>
            {topCustomers.map((c, idx) => (
              <tr key={idx}>
                <td>{c.customer_name}</td>
                <td>{Number(c.total_spent).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
