const { register, login, oauth, logOut } = require('../controller/auth');


const router = require('express').Router();

router.post("/register", register);
router.post("/login", login);
router.post("/oauth", oauth);
router.post("/logout", logOut);

module.exports = router;