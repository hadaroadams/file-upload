const express = require("express");
const {
  uploadImageLocally,
  uploadImageToServer,
} = require("../controller/imageUploadontroller");
const { createGoods, getAllGoods } = require("../controller/goodsController");
const Router = express.Router();

Router.route("/").post(createGoods).get(getAllGoods);
Router.route("/uploads").post(uploadImageToServer);

module.exports = Router;
