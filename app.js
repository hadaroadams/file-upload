require("dotenv").config();
require("express-async-errors");
const express = require("express");

const mongoose = require("mongoose");
const connectDB = require("./config/dbconn");
const cloudConn = require("./config/cloudianryConfig");
const app = express();
const fileUpload = require("express-fileupload");
const goodsRouter = require("./routes/goodsRoutes");

//dataBase
connectDB();

//Cloudinary
cloudConn();

const PORT = process.env.PORT || 4100;

app.use(express.json())
app.use(express.static("./public"));
app.use(fileUpload({ useTempFiles: true }));

app.use("/api/v1/goods", goodsRouter);

mongoose.connection.once("open", () => {
  console.log("connected to mongoDB");
  app.listen(PORT, () => {
    console.log(`server is running on port:${PORT}`);
  });
});
