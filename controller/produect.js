const Model = require("../model/products");


const createProduct = async (req, res) => {
    const {creatorId, ...others} = req.body;
    const {id} = req.user;
    const product = new Model({creatorId: id, ...others});
    try {
        await product.save();
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json(error.message);
    }
};

const updateProduct = async (req, res) => {
    const {id, ...others} = req.body;

    try {
        const product = await Model.findById(id)
        if (!product) {
            return res.status(404).json({success: false, error: "product not found"})
        }
        await Model.findByIdAndUpdate(id, {...others}, {new: true});
        res.status(200).json({message: "product updated"});
    } catch (err) {
        res.status(500).json(err.message);
    }
};


const deleteProduct = async (req, res) => {
    const {id} = req.params;
    try {
        const product = await Model.findById(id)
        if (!product) {
            return res.status(404).json({success: false, error: "product not found"})
        }
        await Model.findByIdAndDelete(id);
        res.status(200).json({message: "product has been deleted"})
    } catch (err) {
        res.status(500).json(err.message);
    }
}

const getAllProduct = async (req, res) => {
    // query validation
    let filter = {}
    if (req.query.category) {
        filter = {category: req.query.category};
    }
    try {
        const products = await Model.find(filter).sort({createdAt: -1})
                                                .select("-__v").populate({path: "creatorId", select: "username email"})
                                                    .populate({path: "category", select: "name"});

        res.status(200).json(products)
    } catch (err) {
        res.status(400).json(err.message);
    }
}

const getSingle = async (req, res) => {
    const {id} = req.params;
    try {
        const product = await productModel.findById(id).select("-__v").populate({path: "creatorId", select: "username email"})
                                                        .populate({path: "category", select: "name"});
        res.status(200).json({success: true, message: "product fetched successfully", product})
    } catch (err) {
        res.status(400).json(err.message);
    }
}

const getCount = async (req, res) => {
    try {
        const productCount = await productModel.countDocuments();
        if (!productCount) {
            return res.status(500).json({error: "something went wrong"})
        }
        res.status(200).json({success: true, message: `Count of products in database : ${productCount}`});
    } catch (err) {
        res.status(500).json(err.message);
    }

}

module.exports = {createProduct, updateProduct, deleteProduct, getSingle, getAllProduct, getCount};