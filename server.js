import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './src/server/routes/auth.js';
import transactionRoutes from './src/server/routes/transactions.js';
import inventoryRoutes from './src/server/routes/inventory.js';
import reportsRoutes from './src/server/routes/reports.js';
import insightsRoutes from './src/server/routes/insights.js';
import subscriptionRoutes from './src/server/routes/subscription.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/reports', reportsRoutes);
app.use('/api/insights', insightsRoutes);
app.use('/api/subscription', subscriptionRoutes);

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

app.listen(PORT, () => {
  console.log(`SautiLeja Server running on port ${PORT}`);
});

export default app;
