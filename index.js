const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');
const productRoute = require('./routes/product');
const categoryRoute = require('./routes/category');
const cartRoute = require('./routes/cart');
const orderRoute = require('./routes/order');
const app = express();
dotenv.config();

// mongodb connect
mongoose.connect(process.env.mongo_url)
        .then(() => console.log("mongodb connected"))
        .catch((err) => console.log(err.message));

app.use(express.json());
app.use(cookieParser());

// routes 
app.use(userRoute)
app.use(authRoute)
app.use(productRoute)
app.use(categoryRoute)
app.use(cartRoute)
app.use(orderRoute)

app.listen(process.env.port || 4400, () => {
    console.log(`ecommerce api connected on port ${process.env.port}`);
});