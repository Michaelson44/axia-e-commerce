const {verifyAdmin, verifyAndAuth, verify} = require("../middleware/verify");
const {getSingleOrder, getOrder, postOrder, deleteOrder, updateOrder, updateStatus} = require("../controller/order");
const router = require("express").Router();

router.get("/orders", verify, getOrder);
router.get("/orders", verify, getSingleOrder);
router.post("/orders", verify, postOrder);
router.put("/orders/:id", verify, updateOrder);
router.delete("/orders/:id", verify, deleteOrder);
router.put("/order-status/:id", verifyAdmin, updateStatus);

module.exports = router;