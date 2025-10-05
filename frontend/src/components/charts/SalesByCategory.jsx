// src/components/charts/SalesByCategory.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28CFF"];

export default function SalesByCategory() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/charts/sales-by-category"
        );
        // Ensure numeric conversion
        const formatted = res.data.map((item) => ({
          category: item.category,
          total_sales: Number(item.total_sales),
        }));
        setData(formatted);
      } catch (err) {
        console.error("Error fetching sales by category:", err);
      }
    };

    fetchData();
  }, []);

  if (!data.length) {
    return <p className="text-center mt-3">No category sales data available</p>;
  }

  return (
    <div className="card p-3 mt-3">
      <h5>Sales by Category</h5>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            dataKey="total_sales"
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={120}
            label={(entry) => entry.category}
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
