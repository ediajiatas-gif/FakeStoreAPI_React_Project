import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import CategorySelect from "../components/CategorySelect";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError(err.message || "Error fetching products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <h3>Loading products...</h3>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  return (
    <div className="container py-4">
      <CategorySelect
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      <div className="row">
        {filteredProducts.map((product) => (
          <div key={product.id} className="col-12 col-sm-6 col-md-4 mb-4">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;