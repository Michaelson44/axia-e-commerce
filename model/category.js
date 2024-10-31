const mongoose = require("mongoose");

const categoryModel = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        ref: "products"
    }
}, {timestamps: true});

module.exports = mongoose.model("categories", categoryModel);

