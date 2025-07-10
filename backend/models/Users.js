const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type:String , required:true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ["seeker", "helper", "admin"],
        default: "seeker",
      },
      fcmToken: String,
      location: {
        lat: Number,
        lng: Number,
      },
},
 {timestamps:true}
);

module.exports = mongoose.model("Users", userSchema);