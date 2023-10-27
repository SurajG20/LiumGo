const mongoose = require('mongoose');
const { Schema } = mongoose;

const ImageSchema = new Schema({
  url: String,
  filename: String,
});

ImageSchema.virtual('thumbnail').get(function () {
  return this.url.replace('/upload', '/upload/h_200,w_200');
});

// opts are used to include the virtual properties to our model
const opts = { toJSON: { virtuals: true } };

const VehicleSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    images: [ImageSchema],
  },
  opts
);

const VechicleModel = mongoose.model('Vehicles', VehicleSchema);

module.exports = VechicleModel;
