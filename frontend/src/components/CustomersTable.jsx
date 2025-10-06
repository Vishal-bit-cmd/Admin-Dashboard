// src/components/tables/CustomersTable.jsx
import { useEffect, useState } from "react";
import axios from "axios";

export default function CustomersTable() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const fetchCustomers = async (searchValue = "") => {
    try {
      const res = await axios.get("http://localhost:5000/api/customers", {
        params: { search: searchValue },
      });
      setCustomers(res.data);
    } catch (err) {
      console.error("Error fetching customers:", err);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // 🔹 Live search every time user types
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    fetchCustomers(value);
  };

  const handleAddCustomer = async (e) => {
    e.preventDefault();
    if (!name || !email) {
      alert("Name and Email are required!");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/customers", {
        name,
        email,
        phone,
      });

      // Clear form
      setName("");
      setEmail("");
      setPhone("");

      // Refresh list
      fetchCustomers(search);
    } catch (err) {
      console.error("Error adding customer:", err);
      alert("Failed to add customer. Check console for details.");
    }
  };

  return (
    <div className="p-3">
      <h3>Customers</h3>

      {/* Search Bar (live search on every keystroke) */}
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search by name or email"
        value={search}
        onChange={handleSearchChange}
      />

      {/* Add Customer Form */}
      <div className="card p-3 mb-4">
        <h5>Add New Customer</h5>
        <form className="row g-2" onSubmit={handleAddCustomer}>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="col-md-4">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="col-md-1">
            <button type="submit" className="btn btn-success w-100">
              Add
            </button>
          </div>
        </form>
      </div>

      {/* Customers Table */}
      <table className="table table-bordered table-hover">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.name}</td>
              <td>{c.email}</td>
              <td>{c.phone}</td>
              <td>{new Date(c.created_at).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
