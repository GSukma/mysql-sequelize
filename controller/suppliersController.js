const { supplier } = require("../models");

class Suppliers {
  // Get all suppliers data
  async getAllSuppliers(req, res, next) {
    try {
      let data = await supplier.findAll({});

      // If data is nothing
      if (!data.length) {
        return next({ statusCode: 404, messages: ["Suppliers not found"] });
      }

      // If success
      res.status(200).json({ data });
    } catch (e) {
      // If error
      next(e);
    }
  }

  async getDetailSupplier(req, res, next) {
    try {
      let data = await supplier.findOne({
        // find all data of supplier table
        where: { id: req.params.id },
      });

      // If data is nothing
      if (!data) {
        return next({ statusCode: 404, messages: ["supplier not found"] });
      }

      // If success
      res.status(200).json({ data });
    } catch (e) {
      // If error
      next(e);
    }
  }

  async createSupplier(req, res, next) {
    try {
      // create supplier
      const newData = await supplier.create(req.body);
      res.status(201).json({ newData });
    } catch (error) {
      next(error);
    }
  }

  // Update data
  async updateSupplier(req, res, next) {
    try {
      // supplier table update data
      const updatedData = await supplier.update(req.body, {
        where: {
          id: req.params.id,
        },
      });

      // If no data updated
      if (!updatedData[0]) {
        return next({ statusCode: 404, messages: ["supplier not found"] });
      }

      // Find the updated supplier
      const data = await supplier.findOne({
        where: {
          id: req.params.id,
        },
      });

      // If success
      res.status(201).json({ data });
    } catch (e) {
      // If error
      next(e);
    }
  }

  // Delete Data
  async deleteSupplier(req, res, next) {
    try {
      // Delete data
      let data = await supplier.destroy({ where: { id: req.params.id } });

      // If success
      res.status(200).json({ message: "Success delete supplier" });
    } catch (e) {
      // If error
      next(e);
    }
  }
}

module.exports = new Suppliers();
