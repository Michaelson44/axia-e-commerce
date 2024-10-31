const { postCategory, updateCategory, getCategories, getCategory, deleteCategory } = require('../controller/category');
const { verifyAdmin } = require('../middleware/verify');

const router = require('express').Router();

router.post("/categories", verifyAdmin, postCategory)
router.put("/categories/:id", verifyAdmin, updateCategory)
router.get("/categories", getCategories)
router.get("/categories/:id", getCategory)
router.delete("/categories/:id", verifyAdmin, deleteCategory)

module.exports = router;