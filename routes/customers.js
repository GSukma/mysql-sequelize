const express = require("express");

// Import validators
const {
  createOrUpdateCustomerValidator,
} = require("../middlewares/validators/customers");

// Import controllers
const {
  getAllCustomers,
  createCustomer,
  getDetailCustomer,
  deleteCustomer,
  updateCustomer,
} = require("../controllers/customers");

const router = express.Router();

// It will find route that has / first after that it will find is it GET or POST
router
  .route("/")
  .get(getAllCustomers)
  .post(createOrUpdateCustomerValidator, createCustomer);

// It will find route that has /:id first after that it will find is it GET or PUT or DELETE
router
  .route("/:id")
  .get(getDetailCustomer)
  .put(createOrUpdateCustomerValidator, updateCustomer)
  .delete(deleteCustomer);

module.exports = router;
