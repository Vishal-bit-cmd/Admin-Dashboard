// routes/users.js
import express from "express";
import pool from "../config/db.js";

const router = express.Router();

// GET /api/users?search=abc&role=editor
router.get("/", async (req, res) => {
  const { search = "", role = "" } = req.query;

  try {
    let query = `
      SELECT id, username, email, role, created_at
      FROM users
      WHERE (username ILIKE $1 OR email ILIKE $1)
    `;
    const params = [`%${search}%`];

    if (role) {
      query += " AND role = $2";
      params.push(role);
    }

    query += " ORDER BY id ASC";

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Database error" });
  }
});

export default router;
