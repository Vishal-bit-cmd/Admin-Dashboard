// routes/customers.js
import express from "express";
import pool from "../config/db.js";

const router = express.Router();

// GET customers with optional search by name/email
router.get("/", async (req, res) => {
    const { search = "" } = req.query;

    try {
        const result = await pool.query(
            `SELECT id, name, email, phone, created_at
       FROM customers
       WHERE name ILIKE $1 OR email ILIKE $1
       ORDER BY id ASC`,
            [`%${search}%`]
        );

        res.json(result.rows);
    } catch (err) {
        console.error("Error fetching customers:", err);
        res.status(500).json({ error: "Database error" });
    }
});

// POST add new customer
router.post("/", async (req, res) => {
    const { name, email, phone } = req.body;

    try {
        const result = await pool.query(
            `INSERT INTO customers (name, email, phone)
       VALUES ($1, $2, $3) RETURNING *`,
            [name, email, phone]
        );

        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error("Error adding customer:", err);
        res.status(500).json({ error: "Database error" });
    }
});

export default router;
