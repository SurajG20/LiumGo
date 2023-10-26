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

const JobSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    images: [ImageSchema],
    postingDate: {
      type: Date,
      default: Date,
    },
    location: {
      type: String,
      required: true,
    },
    responsibilities: {
      type: String,
      required: true,
    },
    requirements: {
      type: String,
      required: true,
    },
    jobType: {
      type: String,
      enums: ['full-time', 'part-time', 'internship'],
      required: true,
    },
  },
  opts
);

const JobModel = mongoose.model('Jobs', JobSchema);

module.exports = JobModel;
