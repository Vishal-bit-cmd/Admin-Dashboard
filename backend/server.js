import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./config/db.js";
import bodyParser from "body-parser";
import path from "path";

pool.query("SELECT NOW()", (err, result) => {
    if (err) {
        console.error("❌ DB Connection Error:", err);
    } else {
        console.log("✅ DB Connected at:", result.rows[0].now);
    }
});

// Import modular routes
import KpiRoutes from "./routes/KPIRoutes.js";
import ChartRoutes from "./routes/ChartRoutes.js";
import OrderRoutes from "./routes/OrderRoutes.js";
import ProductRoutes from "./routes/ProductRoutes.js";
import CustomerRoutes from "./routes/CustomerRoutes.js";
import UserRoutes from "./routes/UserRoutes.js";

dotenv.config();

const app = express();

app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// Use routes
app.get("/", (req, res) => {
    res.send("✅ Admin Dashboard API is running!");
});
app.use("/api/kpis", KpiRoutes);
app.use("/api/charts", ChartRoutes);
app.use("/api/orders", OrderRoutes);
app.use("/api/products", ProductRoutes);
app.use("/api/customers", CustomerRoutes);
app.use("/api/users", UserRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});
