const validator = require("validator");
// const { customer } = require("../../models");

exports.createOrUpdateCustomerValidator = async (req, res, next) => {
  try {
    /* Validate the request */
    const errorMessages = [];

    // if (!validator.isInt(req.body.id.toString())) {
    //   errorMessages.push(`id must be number (integer)`);
    // }

    if (!validator.isAlpha(req.body.name)) {
      errorMessages.push(`Name must be letters`);
    }

    if (errorMessages.length > 0) {
      return next({ statusCode: 400, messages: errorMessages });
    }

    next();
  } catch (error) {
    next(error);
  }
};
