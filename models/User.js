const mongoose = require("mongoose");
const { Schema } = mongoose;
// const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});


const UserModel = mongoose.model('User', UserSchema)

const SeedUser = async () => {
    await UserModel.deleteMany({})
    const Admin = new UserModel({
        username: "admin",
        password: "admin"
    })
    await Admin.save()
}
// Admin.save()




SeedUser()

module.exports = UserModel

// UserSchema.plugin(passportLocalMongoose)
