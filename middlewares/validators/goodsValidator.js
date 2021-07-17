const path = require("path");
const crypto = require("crypto");
const validator = require("validator");
const { good } = require("../../models");
const { promisify } = require("util");

class GoodValidators {
  getByIdValidator = async (req, res, next) => {
    try {
      const findGood = await good.findOne({
        where: { id: req.params.id },
      });

      if (!findGood) {
        return next({ statusCode: 404, message: "Good not found!" });
      }

      next();
    } catch (error) {
      next(error);
    }
  };

  addGoodValidator = async (req, res, next) => {
    try {
      const errorMessages = [];

      //check name
      if (
        validator.isEmpty(req.body.name) &&
        !validator.isAlpha(req.body.name)
      ) {
        errorMessages.push(`good name must be letter`);
      }

      // Check price is a number
      if (
        validator.isEmpty(req.body.price) &&
        !validator.isNumeric(req.body.price.toString())
      ) {
        errorMessages.push("price must be number");
      }

      // Check supplier is integer
      if (
        validator.isEmpty(req.body.id_supplier) &&
        !validator.isInt(req.body.id_supplier.toString())
      ) {
        errorMessages.push("id_supplier must be number (integer");
      }

      // If image was uploaded
      if (req.files) {
        // req.files.image is come from key (file) in postman
        const file = req.files.image;

        // Make sure image is photo
        if (!file.mimetype.startsWith("image")) {
          errorMessages.push("File must be an image");
        }

        // Check file size (max 1MB)
        if (file.size > 1000000) {
          errorMessages.push("Image must be less than 1MB");
        }

        // If error
        if (errorMessages.length > 0) {
          return next({ statusCode: 400, messages: errorMessages });
        }

        // Create custom filename
        let fileName = crypto.randomBytes(16).toString("hex");

        // Rename the file
        file.name = `${fileName}${path.parse(file.name).ext}`;

        // Make file.mv to promise
        const move = promisify(file.mv);

        // Upload image to /public/images
        await move(`./public/images/${file.name}`);

        // assign req.body.image with file.name
        req.body.image = file.name;
      }

      // If error
      if (errorMessages.length > 0) {
        return next({ statusCode: 400, messages: errorMessages });
      }

      next();
    } catch (error) {
      next(error);
    }
  };

  updateValidator = async (req, res, next) => {
    try {
      const errorMessages = [];

      //check name
      if (
        validator.isEmpty(req.body.name) &&
        !validator.isAlphanumeric(req.body.name.toString())
      ) {
        errorMessages.push(`good name must be letter`);
      }

      // Check price is a number
      if (
        validator.isEmpty(req.body.price) &&
        !validator.isNumeric(req.body.price.toString())
      ) {
        errorMessages.push("price must be number");
      }
      // Check supplier is integer
      if (
        validator.isEmpty(req.body.id_supplier) &&
        !validator.isInt(req.body.id_supplier.toString())
      ) {
        errorMessages.push("id_supplier must be number (integer");
      }

      // If error
      if (errorMessages.length > 0) {
        return next({ statusCode: 400, messages: errorMessages });
      }

      //check good
      const findGood = await good.findOne({
        where: { id: req.params.id },
      });

      if (!findGood) {
        return next({ statusCode: 404, message: "Good not found!" });
      }

      if (req.files) {
        // If image was uploaded
        // req.files.image is come from key (file) in postman
        const file = req.files.image;

        // Make sure image is photo
        if (!file.mimetype.startsWith("image")) {
          errorMessages.push("File must be an image");
        }

        // Check file size (max 1MB)
        if (file.size > 1000000) {
          errorMessages.push("Image must be less than 1MB");
        }

        // If error
        if (errorMessages.length > 0) {
          return next({ statusCode: 400, messages: errorMessages });
        }

        // Create custom filename
        let fileName = crypto.randomBytes(16).toString("hex");

        // Rename the file
        file.name = `${fileName}${path.parse(file.name).ext}`;

        // Make file.mv to promise
        const move = promisify(file.mv);

        // Upload image to /public/images
        await move(`./public/images/${file.name}`);

        // assign req.body.image with file.name
        req.body.image = file.name;
      } else {
        // no value of req.body.image
        req.body.image = "";
      }

      next();
    } catch (error) {
      next(error);
    }
  };

  deleteValidator = async (req, res, next) => {
    try {
      const findGood = await good.findOne({
        where: { id: req.params.id },
      });

      if (!findGood) {
        return next({ statusCode: 404, message: "Good not found!" });
      }

      next();
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new GoodValidators();
