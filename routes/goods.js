const router = require("express").Router();

//validator
const {
  getByIdValidator,
} = require("../middlewares/validators/goodsValidator");

//controller
const { getById } = require("../controller/goodController");

router.get("/");
router.get("/", getByIdValidator, getById);

module.exports = router;
