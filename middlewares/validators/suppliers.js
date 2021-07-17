const validator = require("validator");
// const { good } = require("../../models");

exports.createSupplierValidator = async (req, res, next) => {
  try {
    // Check total is number
    const errorMessages = [];

    if (!validator.isAlpha(req.body.name)) {
      errorMessages.push("Name must be letter");
    }
    if (errorMessages.length > 0) {
      return next({ statusCode: 400, messages: errorMessages });
    }

    next();
  } catch (error) {
    next(error);
  }
};

exports.updateSupplierValidator = async (req, res, next) => {
  try {
    // Check total is number
    const errorMessages = [];

    if (!validator.isAlpha(req.body.name)) {
      errorMessages.push("name must be latter");
    }
    if (errorMessages.length > 0) {
      return next({ statusCode: 400, messages: errorMessages });
    }
    next();
  } catch (error) {
    next(error);
  }
};
