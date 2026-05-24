const express = require('express');
const cors = require('cors');
const productsRouter = require('./routes/products');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/products', productsRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'sfgiandra API is running' });
});

app.listen(PORT, () => {
  console.log(`✅ sfgiandra backend running at http://localhost:${PORT}`);
});
