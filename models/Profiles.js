const mongoose = require('mongoose');
const { Schema } = mongoose;

const ImageSchema = new Schema({
  url: String,
  filename: String,
});

ImageSchema.virtual('thumbnail').get(function () {
  return this.url.replace('/upload', '/upload/h_200,w_200');
});

const opts = { toJSON: { virtuals: true } };

const ProfileSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    images: [ImageSchema],
  },
  opts
);

const ProfileModel = mongoose.model('Profiles', ProfileSchema);

module.exports = ProfileModel;
