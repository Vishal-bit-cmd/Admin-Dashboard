// routes/customers.js
import express from "express";
import pool from "../config/db.js";

const router = express.Router();

// GET /api/customers?search=abc
router.get("/", async (req, res) => {
    const { search = "" } = req.query;

    try {
        const result = await pool.query(
            `SELECT id, first_name, last_name, email, created_at
       FROM customers
       WHERE first_name ILIKE $1 OR last_name ILIKE $1 OR email ILIKE $1
       ORDER BY id ASC`,
            [`%${search}%`]
        );

        res.json(result.rows);
    } catch (err) {
        console.error("Error fetching customers:", err);
        res.status(500).json({ error: "Database error" });
    }
});

export default router;
