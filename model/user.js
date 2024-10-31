const mongoose = require('mongoose');
const userSchema = new mongoose.Schema(
    {
        username: {type: String, required: true, unique: true},
        email: {type: String, required: true, unique: true},
        password: {type: String},
        isAdmin: {type: Boolean, default: false},
        // role: {type: String, enum: ["Admin", "Basic"], default: "Basic"},
        credentialsAccount: {type: Boolean, default: true},
        userCart: {type: mongoose.Types.ObjectId, ref: "cart"}
    }, {timestamps: true}
);

module.exports = mongoose.model("users", userSchema);