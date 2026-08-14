const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');

const env = require('./config/env');
const routes = require('./routes');
const { notFound, errorHandler } = require('./middlewares/errorHandler');

const app = express();

// Security headers
app.use(helmet());

// CORS - sirf apne frontend se requests allow karo
app.use(cors({ origin: env.clientUrl, credentials: true }));

// JSON body padhne ke liye
app.use(express.json());

// Console me har request log karega
if (env.nodeEnv !== 'test') {
  app.use(morgan('dev'));
}

// Saare API routes /api prefix ke saath
app.use('/api', routes);

// Root route (sirf check karne ke liye)
app.get('/', (req, res) => {
  res.json({ success: true, message: 'Matrimony backend API is running' });
});

// Ye dono HAMESHA sabse last me aani chahiye
app.use(notFound);
app.use(errorHandler);

module.exports = app;