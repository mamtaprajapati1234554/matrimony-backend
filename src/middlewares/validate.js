const ApiError = require('../utils/ApiError');

function validate(schema, source = 'body') {
  return (req, res, next) => {
    const dataToValidate = source === 'query' ? req.query : req.body;

    const { error, value } = schema.validate(dataToValidate, {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      const details = error.details.map((d) => d.message);
      return next(new ApiError(400, 'Validation failed', 'VALIDATION_ERROR', details));
    }

    if (source === 'query') {
      req.validatedQuery = value; // req.query ki jagah nayi property use kar rahe hain
    } else {
      req.body = value;
    }

    return next();
  };
}

module.exports = validate;