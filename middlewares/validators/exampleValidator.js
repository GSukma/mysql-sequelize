const validator = require("validator");
const { good } = require("../../models");

exports.createTransactionValidator = async (req, res, next) => {
  try {
    const errorMessage = [];

    if (!validator.isInt(req.body.id_good.toString())) {
      errorMessage.push(`id_good must be integer`);
    }

    if (!validator.isInt(req.body.id_customer.toString())) {
      errorMessage.push(`id_customer must be integer`);
    }

    if (!validator.isInt(req.body.quantity.toString())) {
      errorMessage.push(`quantity must be integer`);
    }

    if (errorMessage.length > 0) {
      return next({ statusCode: 400, messages: errorMessage });
    }

    //find good
    const findGood = await good.findOne({
      where: { id: req.body.id_good },
    });

    if (!findGood) {
      return next({ statusCode: 404, message: "Good not found!" });
    }

    const price = findGood.price;
    req.body.total = eval(price * req.body.quantity);

    next();
  } catch (error) {
    next(error);
  }
};
