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

const BlogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    postingDate: {
      type: Date,
      default: Date,
    },
    images: [ImageSchema],
    author: {
      type: String,
      required: true,
    },
  },
  opts
);

const BlogModel = mongoose.model('Blogs', BlogSchema);

module.exports = BlogModel;
