import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import smartswapRoutes from './routes/smartswap.routes.js';
import coinscopeRoutes from './routes/coinscope.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/smartswap', smartswapRoutes);
app.use('/coinscope', coinscopeRoutes);

// Base route
app.get('/', (req, res) => {
  res.send('Shared API Server is running');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});