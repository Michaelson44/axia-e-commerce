const {verifyAdmin, verifyAndAuth, verify} = require("../middleware/verify");
const {getSingleOrder, getOrder, postOrder, deleteOrder, updateOrder} = require("../controller/order");
const router = require("express").Router();

router.get("/orders", verify, getOrder);
router.get("/orders", verify, getSingleOrder);
router.post("/orders", verify, postOrder);
router.put("/orders/:id", verifyAndAuth, updateOrder);
router.delete("/orders/:id", verifyAndAuth, deleteOrder);
router.put("/order-status/:id", verifyAndAuth, deleteOrder);

module.exports = router;