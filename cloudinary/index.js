const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_KEY,
//   api_secret: process.env.CLOUDINARY_SECRET,
// });


cloudinary.config({
  cloud_name: "da2l2x0zu",
  api_key: "634171112517328",
  api_secret: "ZRL4_-QMygdrQ6FqKQIfDojdBUc",
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "LiumGo",
    allowedFormats: ["jpeg", "png", "jpg"],
  },
});

module.exports = {
  cloudinary,
  storage,
};
