import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Form } from "react-bootstrap";

const fetchCategories = async () => {
  const response = await axios.get("https://fakestoreapi.com/products/categories");
  return response.data;
};

const CategorySelect = ({ selectedCategory, onCategoryChange }) => {
  const { data: categories = [], isLoading, error } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  return (
    <Form.Group className="mb-4" style={{ maxWidth: "320px" }}>
      <Form.Label>Filter by Category</Form.Label>
      <Form.Select
        value={selectedCategory}
        onChange={(event) => onCategoryChange(event.target.value)}
        disabled={isLoading || Boolean(error)}
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
  );
};

export default CategorySelect;
