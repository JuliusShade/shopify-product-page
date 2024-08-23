// src/ProductList.js
import React, { useState, useEffect } from "react";
import Papa from "papaparse";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/ProductList.csv");
      const reader = response.body.getReader();
      const result = await reader.read();
      const decoder = new TextDecoder("utf-8");
      const csv = decoder.decode(result.value);
      const results = Papa.parse(csv, { header: true });
      setProducts(results.data);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Product List</h1>
      {products.map((product, index) => (
        <div key={index} className="product-item">
          <p>
            <strong>Product Name:</strong> {product["Title"]}
          </p>
          <p>
            <strong>Category:</strong> {product["Product Category"]}
          </p>
          <p>
            <strong>Price:</strong> ${product["Cost per item"]}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
