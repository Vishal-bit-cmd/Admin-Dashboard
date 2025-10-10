// src/components/charts/SalesByProduct.jsx
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import api from "../../services/api";

export default function SalesByProduct() {
  const [data, setData] = useState([]);

  useEffect(() => {
    api
      .get("/api/charts/sales-by-product")
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="mt-5">
      <h5>Sales by Product</h5>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="product_name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total_sales" fill="#007bff" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
