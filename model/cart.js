const mongoose = require('mongoose');
const cartSchema = new mongoose.Schema(
    {
        userId: {type: mongoose.Types.ObjectId, required: true, ref: "users"},
        products: [
            {
                productId: {type: mongoose.Types.ObjectId, ref: "products"},
                quantity: {type: Number, default: 1}
            }
        ],
        
    }, {timestamps: true}
);

module.exports = mongoose.model("cart", cartSchema);