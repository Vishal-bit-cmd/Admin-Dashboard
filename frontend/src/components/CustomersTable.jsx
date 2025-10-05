// src/components/CustomersTable.jsx
import { useEffect, useState } from "react";
import axios from "axios";

export default function CustomersTable() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [minOrders, setMinOrders] = useState("");

  const fetchCustomers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/customers", {
        params: { search, minOrders },
      });
      setCustomers(res.data);
    } catch (err) {
      console.error("Error fetching customers:", err);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [search, minOrders]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchCustomers(searchTerm);
  };

  return (
    <div className="p-3">
      <h3>Customers</h3>

      <div className="d-flex mb-3 gap-3">
        <input
          type="text"
          className="form-control w-50"
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="form-select w-25"
          value={minOrders}
          onChange={(e) => setMinOrders(e.target.value)}
        >
          <option value="">All Orders</option>
          <option value="1">1+ Orders</option>
          <option value="5">5+ Orders</option>
          <option value="10">10+ Orders</option>
        </select>
      </div>

      <table className="table table-bordered table-hover">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Orders</th>
          </tr>
        </thead>
        <tbody>
          {customers.length > 0 ? (
            customers.map((c) => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.name}</td>
                <td>{c.email}</td>
                <td>{c.phone}</td>
                <td>{c.orders_count || 0}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No customers found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
