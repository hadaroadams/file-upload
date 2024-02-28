const Goods = require("../model/Goods");

const createGoods = async (req, res, next) => {
  console.log(req.body);
  const goods = await Goods.create(req.body);
  res.status(201).json(goods);
};

const getAllGoods = async (req, res, next) => {
  const goods = await Goods.find({});
  res.status(200).json(goods);
};

module.exports = { createGoods, getAllGoods };
