// imports 
const userModel = require("../model/user");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// endpoint controllers
const register = async (req, res) => {
    const {username, email, password} = req.body;
    // hash password with bcrypt
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    if (!hashedPassword) {
        return res.status(401).json({error: "something went wrong"});
    }
    const newUser = new userModel({username, email, password: hashedPassword});
    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(401).json(error.message);
    }
};

const login = async (req, res) => {
    const {email, password} = req.body;
    // check if user exist 
    try {
        const user = await userModel.findOne({email});
        if (!user) {
            return res.status(401).json({error: "user does not exist"});
        }
        // check if password is correct
        const verify = bcrypt.compareSync(password, user.password);
        if (!verify) {
            return res.status(401).json({error: "invalid credentials"});
        }
        // set token if user has been checked
        const aboutUser = {id: user.id, isAdmin: user.isAdmin};
        const token = jwt.sign(aboutUser, process.env.secret);
        res.cookie("token", token)
            .status(200).json({message: "user has been logged in"});
    } catch (error) {
        res.status(402).json(error.message);
    }

};

const oauth = async (req, res) => {
    const {username, email} = req.body
    // check user has credentials account
    try {
        const user = await userModel.findOne({email});
        if (user && user.credentialsAccount) {
            return res.status(401).json({error: "invalid credentials"})
        }
        // log in existing user
        if (user) {
            const token = jwt.sign({id: user.id, isAdmin: user.isAdmin}, process.env.secret);
            res.cookie("token", token)
            .status(200).json({message: "user has been logged in"});
        }
        // create new user
        const newUser = new userModel({username, email, credentialsAccount: false});
        const savedUser = await newUser.save();
        const token = jwt.sign({id: savedUser.id, isAdmin: savedUser.isAdmin});
        res.cookie("token", token)
            .status(200)
            .json({message: "user has been created"});
    } catch(err) {
        res.status(405).json(err.message);
    }
}

const logOut = async (req, res) => {
    try {
        res.clearCookie("token").status(200).json({message: "user has been logged out"})
    } catch (error) {
        res.status(500).json(error.message);
    }
}

module.exports = {register, login, oauth, logOut};