const ApiError = require('../utils/ApiError');

function validate(schema) {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      const details = error.details.map((d) => d.message);
      return next(new ApiError(400, 'Validation failed', 'VALIDATION_ERROR', details));
    }

    req.body = value;
    return next();
  };
}

module.exports = validate;