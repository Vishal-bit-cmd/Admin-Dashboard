// src/components/UsersTable.jsx
import { useEffect, useState } from "react";
import axios from "axios";

export default function UsersTable() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState(""); // role filter

  const fetchUsers = async (searchQuery = "", roleFilter = "") => {
    try {
      const res = await axios.get("http://localhost:5000/api/users", {
        params: {
          search: searchQuery,
          role: roleFilter,
        },
      });
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  useEffect(() => {
    fetchUsers(search, role);
  }, [search, role]);

  return (
    <div className="p-3">
      <h3>Users</h3>

      {/* Search + Filter Row */}
      <div className="d-flex gap-3 mb-3">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by username or email..."
          className="form-control w-50"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Role Filter */}
        <select
          className="form-select w-25"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="">All Roles</option>
          <option value="admin">Admin</option>
          <option value="editor">Editor</option>
          <option value="viewer">Viewer</option>
        </select>
      </div>

      {/* Users Table */}
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
