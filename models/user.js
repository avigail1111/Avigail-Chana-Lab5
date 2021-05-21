const passportLocalMongoose = require("passport-local-mongoose")

const mongoose = require("mongoose")
const { Schema } = require("mongoose")
const userSchema = new Schema(
    {
        name: String,
        username: { type: String, required: true, unique: true, index: true },
        password: { type: String, required: true },
        admin: Boolean,
    },
    {
        timestamps: true,
        autoIndex: false
    }
)



userSchema.plugin(passportLocalMongoose, {
    usernameField: "username"
})

module.exports = mongoose.model("User", userSchema)