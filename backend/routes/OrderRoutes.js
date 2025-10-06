// routes/orders.js
import express from "express";
import pool from "../config/db.js";

const router = express.Router();

router.get("/", async (req, res) => {
    const { search = "", status = "" } = req.query;

    try {
        let baseQuery = `
      SELECT o.order_id, o.status, o.created_at,
             c.name AS customer_name
      FROM orders o
      JOIN customers c ON o.customer_id = c.id
      WHERE 1=1
    `;
        const params = [];

        // Search filter (order_id OR customer_name/email)
        if (search) {
            params.push(`%${search}%`);
            params.push(`%${search}%`);
            baseQuery += ` AND (CAST(o.order_id AS TEXT) ILIKE $${params.length - 1} 
                      OR c.name ILIKE $${params.length} 
                      OR c.email ILIKE $${params.length})`;
        }

        // Status filter
        if (status) {
            params.push(status);
            baseQuery += ` AND o.status = $${params.length}`;
        }

        baseQuery += ` ORDER BY o.created_at DESC`;

        const result = await pool.query(baseQuery, params);
        res.json(result.rows);
    } catch (err) {
        console.error("Error fetching orders:", err);
        res.status(500).json({ error: "Database error" });
        // log the error for debugging purposes
    }
});

export default router;
