require('dotenv').config();
console.log("Loaded MONGO_URI:", process.env.MONGO_URI);

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const crypto = require('crypto');

// CONNECT DB
const connectDB = require('./config/db');
connectDB();

// IMPORT ROUTES
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');
const analyticsRoutes = require('./routes/analytics');
const competitorRoutes = require('./routes/competitors');
const reportRoutes = require('./routes/reports');

const app = express();

// MIDDLEWARE
app.use(helmet());
app.use(morgan('dev'));
app.use(cors());

// capture raw body for webhook verification
app.use(express.json({
  verify: (req, res, buf) => {
    req.rawBody = buf;
  }
}));

// NORMAL API ROUTES
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/competitors', competitorRoutes);
app.use('/api/reports', reportRoutes);

// PAYSTACK WEBHOOK
app.post('/paystack/webhook', (req, res) => {
  try {
    const secret = process.env.PAYSTACK_SECRET;

    const raw = req.rawBody || Buffer.from('');
    const computed = crypto.createHmac('sha512', secret)
      .update(raw)
      .digest('hex');

    const signature = req.headers['x-paystack-signature'] || '';

    if (computed !== signature) {
      console.log('Webhook signature mismatch');
      return res.sendStatus(400);
    }

    const event = JSON.parse(raw.toString());

    if (event.event === 'charge.success') {
      console.log("PAYSTACK PAYMENT:", event.data.customer.email);
    }

    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// HOME ROUTE
app.get('/', (req, res) => {
  res.send('<h1>GHANA MARKETING HUB API IS LIVE</h1>');
});

// ERROR HANDLER
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
  console.log(`GHANA IS NOW A REAL TECH COMPANY`);
});
