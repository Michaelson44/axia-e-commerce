const userModel = require("../model/user");
const bcrypt = require("bcryptjs");

const updateInfo = async (req, res) => {
    const {password, ...others} = req.body;
    const {id} = req.user;
    try {
        // validate user
        const user = await userModel.findById(id)
        if (!user) {
            return res.status(404).json({success: false, error: "user not found"})
        }
        await userModel.findByIdAndUpdate(id, {...others}, {new: true});
        res.status(200).json({message: "profile updated"});
    } catch (err) {
        res.status(500).json(err.message);
    }
};

const updatePassword = async (req, res) => {
    const {oldPassword, newPassword} = req.body;
    const {id} = req.user;
    // check if password is correct;
    try {
        const user = await userModel.findById(id);
        const verify = bcrypt.compareSync(oldPassword, user.password);
        if (!verify) {
            return res.status(401).json({error: "invalid password"})
        }
        await userModel.findByIdAndUpdate(id, {password: newPassword}, {new: true});
        res.status(200).json({message: "password updated"});
    } catch (err) {
        res.status(500).json(err.message);
    }
}

const deleteUser = async (req, res) => {
    const {id} = req.query;
    try {
        // validate user
        const user = await userModel.findById(id)
        if (!user) {
            return res.status(404).json({success: false, error: "user not found"})
        }
        await userModel.findByIdAndDelete(id);
        res.clearCookie("token").status(200).json({message: "user has been deleted"})
    } catch (err) {
        res.status(500).json(err.message);
    }
}

const getSingle = async (req, res) => {
    const {id} = req.params;
    try {
        const user = await userModel.findById(id);
        if (!user) {
            return res.status(404).json({success: false, error: "user not found"});
        }
        res.status(200).json(user)
    } catch (err) {
        res.status(400).json(err.message);
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find();
        res.status(200).json(users)
    } catch (err) {
        res.status(400).json(err.message);
    }
}

module.exports = {updateInfo, deleteUser, getSingle, getAllUsers, updatePassword};