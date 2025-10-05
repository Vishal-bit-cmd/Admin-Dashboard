// routes/products.js
import express from "express";
import pool from "../config/db.js";

const router = express.Router();

// GET /api/products?search=abc&category=Electronics
router.get("/", async (req, res) => {
    const { search = "", category = "" } = req.query;

    try {
        let query = `
      SELECT p.id, p.name, p.price, c.name AS category, p.created_at
      FROM products p
      JOIN categories c ON p.category_id = c.id
      WHERE p.name ILIKE $1
    `;
        const params = [`%${search}%`];

        if (category) {
            query += " AND c.name = $2";
            params.push(category);
        }

        query += " ORDER BY p.id ASC";

        const result = await pool.query(query, params);
        res.json(result.rows);
    } catch (err) {
        console.error("Error fetching products:", err);
        res.status(500).json({ error: "Database error" });
    }
});

export default router;
