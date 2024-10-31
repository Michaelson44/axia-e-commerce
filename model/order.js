const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema(
    {
        userId: {type: mongoose.Types.ObjectId, required: true, ref: "users"},
        products: [
            {
                productId: {type: mongoose.Types.ObjectId, ref: "products"},
                quantity: {type: Number, default: 1}
            }
        ],
        amount: {type: Number, required: true},
        address: {type: Object, required: true},
        status: {type: String, default: "pending"},
        dateOrdered: {type: Date, default: Date.now}
    }, {timestamps: true}
);

module.exports = mongoose.model("order", orderSchema);