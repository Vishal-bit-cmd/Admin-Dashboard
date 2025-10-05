// src/components/ProductsTable.jsx
import { useEffect, useState } from "react";
import axios from "axios";

export default function ProductsTable() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    category: "",
  });

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products", {
        params: { search, category },
      });
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [search, category]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchCustomers(searchTerm);
  };

  // handle file upload
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) return;

    const formData = new FormData();
    formData.append("name", newProduct.name);
    formData.append("price", newProduct.price);
    formData.append("category", newProduct.category);
    if (image) formData.append("image", image);

    try {
      await axios.post("http://localhost:5000/api/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setNewProduct({ name: "", price: "", category: "" });
      setImage(null);
      fetchProducts();
    } catch (err) {
      console.error("Error uploading product:", err);
    }
  };

  return (
    <div className="p-3">
      <h3>Products</h3>

      <div className="d-flex mb-3 gap-3">
        <input
          type="text"
          className="form-control w-50"
          placeholder="Search products"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="form-select w-25"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Computers">Computers</option>
          <option value="Phones">Phones</option>
          <option value="Accessories">Accessories</option>
          <option value="Home Appliances">Home Appliances</option>
          <option value="Books">Books</option>
          <option value="Clothing">Clothing</option>
          <option value="Sports">Sports</option>
          <option value="Fashion">Fashion</option>
          <option value="Groceries">Groceries</option>
          <option value="Toys">Toys</option>
        </select>
      </div>

      {/* Add Product Form */}
      <form className="mb-4" onSubmit={handleSubmit}>
        <div className="d-flex gap-2">
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
          />
          <input
            type="number"
            className="form-control"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
          />
          <input
            type="file"
            className="form-control"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <button className="btn btn-primary" type="submit">
            Add
          </button>
        </div>
      </form>

      {/* Products Table */}
      <table className="table table-bordered table-hover">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>${p.price}</td>
                <td>
                  {p.image_url ? (
                    <img
                      src={`http://localhost:5000/uploads/${p.image_url}`}
                      alt={p.name}
                      width="50"
                    />
                  ) : (
                    "No image"
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No products found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
