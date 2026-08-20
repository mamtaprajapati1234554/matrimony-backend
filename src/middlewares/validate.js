const ApiError = require('../utils/ApiError');

function validate(schema, source = 'body') {
  return (req, res, next) => {
    let dataToValidate;
    if (source === 'query') dataToValidate = req.query;
    else if (source === 'params') dataToValidate = req.params;
    else dataToValidate = req.body;

    const { error, value } = schema.validate(dataToValidate, {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      const details = error.details.map((d) => d.message);
      return next(new ApiError(400, 'Validation failed', 'VALIDATION_ERROR', details));
    }

    if (source === 'query') req.validatedQuery = value;
    else if (source === 'params') req.params = value;
    else req.body = value;

    return next();
  };
}

module.exports = validate;