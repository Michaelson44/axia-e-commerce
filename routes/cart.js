const { postCart, getCart, deleteCart, updateCart, getSingleCart } = require("../controller/cart");
const {verify} = require("../middleware/verify");

const router = require("express").Router();

router.post("/cart", verify, postCart);
router.get("/cart", getCart);
router.get("/cart", getSingleCart);
router.put("/cart/:id",verify, updateCart);
router.delete("/cart/:id",verify, deleteCart);

module.exports = router;