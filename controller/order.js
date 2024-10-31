const Model = require("../model/order");

const getOrder = async (req, res) => {
    try {
        const orders = await Model.find().populate({path: "products.productId"});
        // validate order
        if (!orders) {
            return res.status(404).json({success: false, error: "something went wrong"});
        }
        res.status(200).json({success: true, ...orders});
    } catch (err) {
        res.status(500).json(err.message);
    }
}

const getSingleOrder = async (req, res) => {
    
    const {userId} = req.query;

    try {
        const order = await Model.findOne({userId}).populate({path: "products.productId"});
        // validate order
        if (!order) {
            return res.status(404).json({success: false, error: "order not found"});
        }
        res.status(200).json({success: true, message: order});
    } catch (err) {
        res.status(500).json(err.message);
    } 
}

const postOrder = async (req, res) => {
    const {...order} = req.body;
    const {id} = req.user;
    const newOrder = new Model({userId: id, ...order})

    try {
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
    } catch (err) {
        res.status(500).json(err.message);
    }
};

const updateOrder = async (req, res) => {
    const {status, ...orders} = req.body;
    const {id} = req.params;
    try{
        const order = await Model.findById(id);
        // validate order
        if (!order) {
            return res.status(404).json({success: false, error: "order not found"});
        }
        await Model.findByIdAndUpdate(id, {...orders}, {new: true});
        res.status(200).json({succcess: true, message: "order has been updated"});
    } catch (err) {
        res.status(500).json({success: false, error: err.message});
    }
}

const deleteOrder = async (req, res) => {
    const {id} = req.params;
    try {
        const order = await Model.findById(id);
        // validate order
        if (!order) {
            return res.status(404).json({success: false, error: "order not found"});
        }
        await Model.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "order has been deleted"});
    } catch (err) {
        res.status(500).json({success: false, error: err.message});
    }
}

const updateStatus = async (req, res) => {
    const {id} = req.params;
    try {
        // validate order
        const order = await Model.findById(id);
        if (!order) {
            return res.status(404).json({success: false, error: "order not found"});
        }
        await Model.findByIdAndUpdate(id, {status: "completed"}, {new: true});
        res.status(200).json({success: true, order});
    } catch(err) {
        res.status(500).json(err.message);
    }
};

module.exports = {getOrder,getSingleOrder, postOrder, updateOrder,deleteOrder, updateStatus};