const { createProduct, updateProduct, deleteProduct, getSingle, getAllProduct, getCount } = require('../controller/produect');
const { verifyAdmin } = require('../middleware/verify');

const router = require('express').Router();

router.post("/products", verifyAdmin, createProduct);
router.put("/products/:id", verifyAdmin, updateProduct);
router.get("/products", getAllProduct);
router.get("/count", getCount);
router.get("/products/:id",getSingle);
router.delete("/products/:id",verifyAdmin, deleteProduct);

module.exports = router;