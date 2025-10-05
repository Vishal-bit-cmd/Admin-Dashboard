// src/components/UsersTable.jsx
import { useEffect, useState } from "react";
import axios from "axios";

export default function UsersTable() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const fetchUsers = async (query = "") => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/users?search=${encodeURIComponent(query)}`
      );
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    fetchUsers(value);
  };

  return (
    <div className="p-3">
      <h3>Users</h3>

      {/* Search Input */}
      <div className="mb-3">
        <input
          type="text"
          placeholder="Search by username or email..."
          className="form-control"
          value={search}
          onChange={handleSearchChange}
        />
      </div>

      <table className="table table-bordered table-hover">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {users.length ? (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <span
                    className={`badge ${
                      user.role === "admin"
                        ? "bg-primary"
                        : user.role === "editor"
                        ? "bg-success"
                        : "bg-secondary"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td>{new Date(user.created_at).toLocaleDateString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
