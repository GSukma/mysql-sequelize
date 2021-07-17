const router = require("express").Router();

//validator
const {
  getByIdValidator,
  deleteValidator,
  addGoodValidator,
  updateValidator,
} = require("../middlewares/validators/goodsValidator");

//controller
const {
  getAllGoods,
  getById,
  deleteGood,
  addGood,
  updateGood,
} = require("../controller/goodController");

router.get("/", getAllGoods);
router.get("/:id", getByIdValidator, getById);
router.post("/", addGoodValidator, addGood);
router.put("/:id", updateValidator, updateGood);
router.delete("/delete/:id", deleteValidator, deleteGood);

module.exports = router;
