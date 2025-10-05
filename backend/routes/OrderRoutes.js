import express from "express";
import pool from "../config/db.js";

const router = express.Router();

// Get all orders with customer info
router.get("/", async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT o.order_id, o.status, o.created_at, 
                   c.id AS customer_id, c.name AS customer_name, c.email
            FROM orders o
            JOIN customers c ON o.customer_id = c.id
            ORDER BY o.created_at DESC;
        `);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// Get order items for a specific order
router.get("/:orderId/items", async (req, res) => {
    const { orderId } = req.params;
    try {
        const result = await pool.query(`
            SELECT oi.id, oi.product_id, p.name AS product_name, oi.quantity, oi.price
            FROM order_items oi
            JOIN products p ON oi.product_id = p.id
            WHERE oi.order_id = $1;
        `, [orderId]);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

export default router;
