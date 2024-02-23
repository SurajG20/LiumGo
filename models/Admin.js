const mongoose = require("mongoose");
const { Schema } = mongoose;

const ImageSchema = new Schema({
  url: String,
  filename: String,
});

ImageSchema.virtual("thumbnail").get(function () {
  return this.url.replace("/upload", "/upload/h_200,w_200");
});

// opts are used to include the virtual properties to our model
const opts = { toJSON: { virtuals: true } };

const AdminSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    images: [ImageSchema],
  },
  opts
);

const AdminModel = mongoose.model("Admins", AdminSchema);

module.exports = AdminModel;
