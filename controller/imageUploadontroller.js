const path = require("path");
const fs = require("fs");
const { BadRequest } = require("../errors");
const cloudinary = require("cloudinary").v2;

const uploadImageLocally = async (req, res, next) => {
  if (!req.files) next(new BadRequest("No file Uploaded"));
  const goodsImage = req.files.image;
  if (!goodsImage.mimetype.startsWith("image"))
    next(new BadRequest("Please Upload Image"));
  const maxSize = 1024 * 1024;
  if (goodsImage.size > maxSize)
    next(new BadRequest("please upload imgae smaller 1MB"));
  const imagePath = path.join(
    __dirname,
    `../public/uploads/${goodsImage.name}`
  );
  await goodsImage.mv(imagePath);
  res.status(200).json({ image: { src: `/uploads/${goodsImage.name}` } });
};

const uploadImageToServer = async (req, res, next) => {
  const result = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    {
      use_filename: true,
      folder: "file-upload",
    }
  );
  console.log(result);
  fs.unlinkSync(req.files.image.tempFilePath);
  return res.status(200).json({ image: { src: result.secure_url } });
};

module.exports = { uploadImageLocally, uploadImageToServer };
