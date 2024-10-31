const cartModel = require("../model/cart");

const postCart = async (req, res) => {
    const {...products} = req.body;
    const {id} = req.user;

    const cart = new cartModel({userId: id, ...products});
    try {
        savedCart = await cart.save();
        res.status(200).json(savedCart);
    } catch (err) {
        res.status(500).json(err.message);
    }
};

const getCart = async (req, res) => {
    try {
        const all = await cartModel.find().populate({path: "userId", select: "username email"})
                                        .populate("products.productId");
        res.status(200).json(all);
    } catch (err) {
        res.status(500).json(err.message);
    }
}

const updateCart = async (req, res) => {
    const {id} = req.params;
    try {
        // validate cart
        const cart = await cartModel.findById(id);
        if (!cart) {
            return res.status(404).json({success: false, error: "cart not found"});
        }
        await cartModel.findByIdAndUpdate(id, req.body, {new: true});
        res.status(200).json({success: true, message: "cart has been updated"});
    } catch (err) {
        res.status(500).json(err.message);
    }
}

const deleteCart = async (req, res) => {
    const {id} = req.params;
    try {
        // validate cart
        const cart = await cartModel.findById(id);
        if (!cart) {
            return res.status(404).json({success: false, error: "cart not found"});
        }
        await cartModel.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "cart deleted"});
    } catch (error) {
        res.status(500).json(error.message);
    }
}

const getSingleCart = async (req, res) => {
    const {userId} = req.query;
    try {
        const userCart = await cartModel.findOne({userId})
                                    .populate({path: userId, select: "username email"})
                                    .populate(products);
        res.status(200).json(userCart);
    } catch (err) {
        res.status(500).json(err.message);
    }
}

module.exports = {postCart, getCart, deleteCart, getSingleCart, updateCart};