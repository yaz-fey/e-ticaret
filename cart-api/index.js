const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

let cart = [];

app.get('/cart', (req, res) => {
  res.json(cart);
});

app.post('/cart', (req, res) => {
  const product = req.body;
  cart.push(product);
  res.status(201).json({ success: true });
});

app.delete('/cart', (req, res) => {
  cart = [];
  res.json({ success: true });
});

app.listen(4002, () => console.log('Cart API running on port 4002')); 