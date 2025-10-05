// src/components/Navbar.jsx
import { useState } from "react";

export default function Navbar({ toggleSidebar }) {
  return (
    <nav className="navbar navbar-dark bg-dark px-3 d-flex justify-content-between">
      <div className="d-flex align-items-center">
        <button
          className="btn btn-outline-light btn-sm me-2 d-md-none"
          onClick={toggleSidebar}
        >
          ☰
        </button>
        <span className="navbar-brand mb-0 h1">Admin Dashboard</span>
      </div>
      <button className="btn btn-outline-light btn-sm">Logout</button>
    </nav>
  );
}
