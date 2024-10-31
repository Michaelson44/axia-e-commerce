const jwt = require("jsonwebtoken");


const verify = (req, res, next) => {
    const {token} = req.cookies;
    if (!token) {
        return res.status(401).json({error: "you are not authenticated"})
    }
    jwt.verify(token, process.env.secret, (err, info) => {
        if (err) {
            return res.status(500).json({error: "invalid token"})
        }
        req.user = info;
        next();
    })
};

const verifyAndAuth = (req, res, next) => {
    verify(req, res, () => {
        if (req.user.id === req.params.id) {
            next();
        } else {
            return res.status(400).json({error: "you are not authorized to do that"});
        }
    })
}

const verifyAdmin = (req, res, next) => {
    
   verify(req, res, () => {
    if (req.user.isAdmin) {
        next();
    } else {
        return res.status(500).json({error: "you are not authorized for that"});
    }
   })
}

module.exports = {verify, verifyAndAuth, verifyAdmin};