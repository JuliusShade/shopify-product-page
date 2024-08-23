import React, { useState, useEffect } from "react";
import Papa from "papaparse";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Function to fetch and parse the CSV file
    const fetchData = async () => {
      const response = await fetch("/ProductList.csv");
      const reader = response.body.getReader();
      const result = await reader.read(); // raw array
      const decoder = new TextDecoder("utf-8");
      const csv = decoder.decode(result.value); // the csv text
      const results = Papa.parse(csv, { header: true }); // object with { data, errors, meta }
      setProducts(results.data); // array of objects
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Product List</h1>
      <ul>
        {products.map((product, index) => (
          <li key={index}>
            {product["Title"]} is a {product["Product Category"]} and costs $
            {product["Cost per item"]}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
