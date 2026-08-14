const ApiError = require('../utils/ApiError');

// Jab koi route match hi nahi hota (galat URL)
function notFound(req, res, next) {
  const err = new ApiError(404, `Route not found: ${req.method} ${req.originalUrl}`, 'NOT_FOUND');
  next(err);
}

// Ye har error ko yahan pakadta hai (4 arguments hone chahiye - Express isse pehchanta hai)
function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  const code = err.code || 'INTERNAL_ERROR';
  const details = err.details || [];

  res.status(statusCode).json({
    success: false,
    message,
    error: { code, details }
  });
}

module.exports = { notFound, errorHandler };