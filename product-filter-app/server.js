// server.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Sample product data
const products = [
  { id: 1, category: 'Electronics', brand: 'Apple', price: 999 },
  { id: 2, category: 'Clothing', brand: 'Nike', price: 49 },
  { id: 3, category: 'Books', brand: 'Penguin', price: 19 },
  { id: 4, category: 'Electronics', brand: 'Samsung', price: 899 },
  { id: 5, category: 'Clothing', brand: 'Addidas', price: 900 },
  { id: 6, category: 'Books', brand: 'Panda', price: 129 },
];

// Serve static files from the "public" directory
app.use(express.static('public'));

// Route to get filtered products
app.get('/products', (req, res) => {
  const { category, brand, minPrice, maxPrice } = req.query;

  // Filter logic
  let filteredProducts = products;

  if (category) {
    const categories = category.split(',');
    filteredProducts = filteredProducts.filter(product =>
      categories.includes(product.category)
    );
  }

  if (brand) {
    const brands = brand.split(',');
    filteredProducts = filteredProducts.filter(product =>
      brands.includes(product.brand)
    );
  }

  if (minPrice) {
    filteredProducts = filteredProducts.filter(
      product => product.price >= parseFloat(minPrice)
    );
  }

  if (maxPrice) {
    filteredProducts = filteredProducts.filter(
      product => product.price <= parseFloat(maxPrice)
    );
  }

  res.json(filteredProducts);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
