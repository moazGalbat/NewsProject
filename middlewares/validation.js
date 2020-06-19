const { validationResult } = require('express-validator');
const customError = require("../helpers/customError")

module.exports = validations => {
  return async (req, res, next) => {
    try {
      await Promise.all(validations.map(validation => validation.run(req)));

      const errors = validationResult(req);
      if (errors.isEmpty()) {
        return next();
      }

      throw customError(422, 'validation Error', errors)
    }
    catch (err) {
      next(err)
    }
  };
};