const categoryModel = require("../model/category");
// const productModel = require("../model/products");

const postCategory = async (req, res) => {
    // const {name, icon, color} = req.body;
    const {name} = req.body;
    // validate category 
    const cat = await categoryModel.findOne({name})
    if(cat){
        return res.status(401).json({error: "category already exist"})
    }
    // create new
    const newCategory = new categoryModel({name});
    try {
        await newCategory.save();
        // await productModel.findByIdAndUpdate();
        res.status(200).json({success: true, message: "category created"})
    } catch (error) {
        res.status(500).json(error.message);
    }
}

const updateCategory = async (req, res) => {
    const {name} = req.params;

    try {
        // validate category
        const category = await categoryModel.findOne({name});
        if (!category) {
            return res.status(404).json({success: false, error: "category not found"});
        }

        await categoryModel.findByIdAndUpdate(id, {name}, {new: true});
        res.status(200).json({success: true, message: "category updated"});
    } catch (err) {
        res.status(500).json(err.message);
    }
};


const deleteCategory = async (req, res) => {
    const {id} = req.params;
    try {
        // validate category
        const category = await categoryModel.findById(d);
        if (!category) {
            return res.status(404).json({success: false, error: "category not found"});
        }
        await categoryModel.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "category has been deleted"})
    } catch (err) {
        res.status(500).json(err.message);
    }
}

const getCategories = async (req, res) => {
    
   try {
    const categories = await categoryModel.find();
    res.status(200).json(categories);
   } catch (err) {
    res.status(500).json(err.message);
   }
}

const getCategory = async (req, res) => {
    const {id} = req.params;
    try {
        const category = await categoryModel.findById(id);
        res.status(200).json(category)
    } catch (err) {
        res.status(400).json(err.message);
    }
}

module.exports = {postCategory, updateCategory, getCategories, getCategory, deleteCategory}