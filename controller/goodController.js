const { good, supplier } = require("../models");

class Good {
  getAllGoods = async (req, res, next) => {
    try {
      const data = await good.findAll({
        attributes: { exclude: ["id_supplier"] },
        include: [
          {
            model: supplier,
            attributes: {
              include: ["name"],
            },
          },
        ],
      });
      res.status(201).json({ data });
    } catch (error) {
      next(error);
    }
  };
  getById = async (req, res, next) => {
    try {
      // Find good with join
      const data = await good.findOne({
        where: {
          id: req.params.id,
        },
        attributes: { exclude: ["id_supplier"] },
        include: [
          {
            model: supplier,
            attributes: {
              include: ["name"],
            },
          },
        ],
      });

      res.status(201).json({ data });
    } catch (error) {
      next(error);
    }
  };
  addGood = async (req, res, next) => {
    try {
      // Create good
      const newData = await good.create(req.body);

      // Find good with join
      const data = await good.findOne({
        where: {
          id: newData.id,
        },
        attributes: { exclude: ["id_supplier"] },
        include: [
          {
            model: supplier,
          },
        ],
      });

      res.status(201).json({
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  updateGood = async (req, res, next) => {
    try {
      // Create good
      const newData = await good.update(req.body, {
        where: {
          id: req.params.id,
        },
      });

      // Find good with join
      const data = await good.findOne({
        where: {
          id: req.params.id,
        },
        attributes: { exclude: ["id_supplier"] },
        include: [
          {
            model: supplier,
          },
        ],
      });

      res.status(201).json({
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteGood = async (req, res, next) => {
    try {
      const data = await await good.destroy({
        where: {
          id: req.params.id,
        },
      });
      res
        .status(200)
        .json({ message: `Good with id ${req.params.id} deleted` });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new Good();
