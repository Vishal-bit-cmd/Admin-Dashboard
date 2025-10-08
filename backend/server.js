import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./config/db.js";
import bodyParser from "body-parser";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// ✅ Connect to PostgreSQL
pool.query("SELECT NOW()", (err, result) => {
    if (err) console.error("❌ DB Connection Error:", err);
    else console.log("✅ DB Connected at:", result.rows[0].now);
});

// ✅ Import routes
import KpiRoutes from "./routes/KPIRoutes.js";
import ChartRoutes from "./routes/ChartRoutes.js";
import OrderRoutes from "./routes/OrderRoutes.js";
import ProductRoutes from "./routes/ProductRoutes.js";
import CustomerRoutes from "./routes/CustomerRoutes.js";
import UserRoutes from "./routes/UserRoutes.js";

app.use("/api/kpis", KpiRoutes);
app.use("/api/charts", ChartRoutes);
app.use("/api/orders", OrderRoutes);
app.use("/api/products", ProductRoutes);
app.use("/api/customers", CustomerRoutes);
app.use("/api/users", UserRoutes);

// ✅ Serve frontend build (Vite)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const frontendPath = path.resolve(__dirname, "../frontend/dist");
app.use(express.static(frontendPath));

app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
