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

const VehicleSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    images: [ImageSchema]
}, opts);

const VechileModel = mongoose.model('Vehicles', VehicleSchema)

// const func = async () => {
//     await VechileModel.deleteMany({})
//     const a = new VechileModel({
//         name: "Electric Vehicle",
//         description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat numquam magni sunt ipsa, obcaecati nostrum tempora sit nobis voluptatibus corrupti quasi dolorum, esse, est beatae hic nemo temporibus. Est, cum."
//     })
//     await a.save()
//     const b = new VechileModel({
//         name: "Electric Vehicle 2",
//         description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat numquam magni sunt ipsa, obcaecati nostrum tempora sit nobis voluptatibus corrupti quasi dolorum, esse, est beatae hic nemo temporibus. Est, cum."
//     })
//     await b.save()
// }

// func();

module.exports = VechileModel;