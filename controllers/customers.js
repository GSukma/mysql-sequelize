const { customer } = require("../models");

class Customers {
  // Get all customers data
  async getAllCustomers(req, res, next) {
    try {
      let data = await customer.findAll({
        // find all data of customer table
        attributes: {},
        // include: [
        //   // Include is join
        //   {
        //     model: customer,
        //   },
        //   {
        //     model: good,
        //     include: [
        //       // Include is join
        //       { model: supplier },
        //     ],
        //   },
        // ],
      });

      // If data is nothing
      if (data.length === 0) {
        return next({ statusCode: 404, messages: ["Customers not found"] });
      }

      // If success
      res.status(200).json({ data });
    } catch (e) {
      // If error
      next(e);
    }
  }

  async getDetailCustomer(req, res, next) {
    try {
      let data = await customer.findOne({
        // find all data of transaction table
        where: { id: req.params.id },
        attributes: {},
        // include: [
        //   // Include is join
        //   {
        //     model: customer,
        //   },
        //   {
        //     model: good,
        //     include: [
        //       // Include is join
        //       { model: supplier },
        //     ],
        //   },
        // ],
      });

      // If data is nothing
      if (!data) {
        return next({ statusCode: 404, messages: ["Customer not found"] });
      }

      // If success
      res.status(200).json({ data });
    } catch (e) {
      // If error
      next(e);
    }
  }

  async createCustomer(req, res, next) {
    try {
      // create transaction
      const newData = await customer.create(req.body);

      // Find transaction with join
      const data = await customer.findOne({
        where: {
          id: newData.id,
        },
        attributes: {},
        // include: [
        //   {
        //     model: customer,
        //   },
        //   {
        //     model: good,
        //     include: [
        //       {
        //         model: supplier,
        //       },
        //     ],
        //   },
        // ],
      });

      res.status(201).json({ data });
    } catch (error) {
      next(error);
    }
  }

  // Update data
  async updateCustomer(req, res, next) {
    try {
      // transaction table update data
      const updatedData = await customer.update(req.body, {
        where: {
          id: req.params.id,
        },
      });

      // If no data updated
      if (updatedData[0] === 0) {
        return next({ statusCode: 404, messages: ["Customer not found"] });
      }

      // Find the updated transaction
      const data = await customer.findOne({
        where: {
          id: req.params.id,
        },
        attributes: {},
        // include: [
        //   {
        //     model: customer,
        //   },
        //   {
        //     model: good,
        //     include: [
        //       {
        //         model: supplier,
        //       },
        //     ],
        //   },
        // ],
      });

      // If success
      res.status(201).json({ data });
    } catch (e) {
      // If error
      next(e);
    }
  }

  // Delete Data
  async deleteCustomer(req, res, next) {
    try {
      // Delete data
      let data = await customer.destroy({ where: { id: req.params.id } });

      // If data deleted is null
      if (!data) {
        return next({ statusCode: 404, messages: ["Customer not found"] });
      }

      // If success
      res.status(200).json({ message: "Customer has been deleted" });
    } catch (e) {
      // If error
      next(e);
    }
  }
}

module.exports = new Customers();
