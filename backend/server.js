import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./config/db.js";
import bodyParser from "body-parser";
import path from "path";

// Import your routes
import KpiRoutes from "./routes/KPIRoutes.js";
import ChartRoutes from "./routes/ChartRoutes.js";
import OrderRoutes from "./routes/OrderRoutes.js";
import ProductRoutes from "./routes/ProductRoutes.js";
import CustomerRoutes from "./routes/CustomerRoutes.js";
import UserRoutes from "./routes/UserRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));

// API Routes
app.use("/api/kpis", KpiRoutes);
app.use("/api/charts", ChartRoutes);
app.use("/api/orders", OrderRoutes);
app.use("/api/products", ProductRoutes);
app.use("/api/customers", CustomerRoutes);
app.use("/api/users", UserRoutes);

// Serve frontend
app.use(express.static(path.join(process.cwd(), "dist")));
app.get("*", (req, res) => {
    res.sendFile(path.join(process.cwd(), "dist", "index.html"));
});

// Test route
app.get("/test", (req, res) => {
    res.send("✅ Server is running!");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});
