const mongoose = require('mongoose');
const productSchema = new mongoose.Schema(
    {
        creatorId: {type: mongoose.Types.ObjectId, ref: "users", required: true},
        title: {type: String, required: true, unique: true},
        desc: {type: String, required: true},
        img: {type: String, required: true},
        category: {type: mongoose.Types.ObjectId, ref: "categories", required: true},
        size: {type: String},
        color: {type: String},
        price: {type: Number, required: true},
    }, {timestamps: true}
);

module.exports = mongoose.model("products", productSchema);