import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

// KPI endpoints
export const getTotalSales = () => axios.get(`${BASE_URL}/kpis/total-sales`);
export const getTotalOrders = () => axios.get(`${BASE_URL}/kpis/total-orders`);
export const getTotalCustomers = () => axios.get(`${BASE_URL}/kpis/total-customers`);

// Order endpoints
export const getOrders = () => axios.get(`${BASE_URL}/orders`);
export const getOrderById = (id) => axios.get(`${BASE_URL}/orders/${id}`);

// Customer endpoints
export const getCustomers = (search = "") =>
    axios.get(`${BASE_URL}/customers`, { params: { search } });
export const getCustomerById = (id) => axios.get(`${BASE_URL}/customers/${id}`);

// Product endpoints
export const getProducts = () => axios.get(`${BASE_URL}/products`);

export const getProductById = (id) => axios.get(`${BASE_URL}/products/${id}`);

// Chart endpoints
export const getSalesByCategory = () =>
    axios.get(`${BASE_URL}/charts/sales-by-category`);
export const getTopProducts = () => axios.get(`${BASE_URL}/charts/top-products`);
export const getTopCustomers = () => axios.get(`${BASE_URL}/charts/top-customers`);