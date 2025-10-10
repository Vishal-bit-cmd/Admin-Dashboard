import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import pool from "./config/db.js";

const app = express();

app.use(cors());
app.use(express.json());

import KpiRoutes from "./routes/KpiRoutes.js";
import ChartRoutes from "./routes/ChartRoutes.js";
import OrderRoutes from "./routes/OrderRoutes.js";
import ProductRoutes from "./routes/ProductRoutes.js";
import CustomerRoutes from "./routes/CustomerRoutes.js";
import UserRoutes from "./routes/UserRoutes.js";

// API Routes
app.use("/api/kpis", KpiRoutes);
app.use("/api/charts", ChartRoutes);
app.use("/api/orders", OrderRoutes);
app.use("/api/products", ProductRoutes);
app.use("/api/customers", CustomerRoutes);
app.use("/api/users", UserRoutes);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
