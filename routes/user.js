const express = require('express');
const router = express.Router();
const {updateInfo, deleteUser, getAllUsers, getSingle, updatePassword} = require('../controller/user')
const { verify, verifyAndAuth} = require('../middleware/verify');

router.put('/user', verify, updateInfo);
router.delete('/user', verifyAndAuth, deleteUser);
router.get('/user', getAllUsers);
router.get('/user/:id', getSingle);
router.put('/update-password', verify, updatePassword);

module.exports = router;