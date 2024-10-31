const { postCart, getCart, deleteCart, updateCart, getSingleCart } = require("../controller/cart");
const {verify, verifyAndAuth} = require("../middleware/verify");

const router = require("express").Router();

router.post("/cart", verify, postCart);
router.get("/cart", getCart);
router.get("/cart", getSingleCart);
router.put("/cart/:id",verifyAndAuth, updateCart);
router.delete("/cart/:id",verifyAndAuth, deleteCart);

module.exports = router;