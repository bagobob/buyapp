const express = require("express");
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');
const productRoute = require('./routes/product');
const cartRoute = require('./routes/cart');
const orderRoute = require('./routes/order');
const stripeRoute = require('./routes/stripe');
const cors = require("cors");
const PORT = process.env.PORT || 3030;

dotenv.config({ path: './.env.local'});
    try{
        mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        },()=>{
            console.log("Connected to MongoDB Successfully")
        })
    }catch(err){
        console.log(err);
    }

    app.use(cors({ origin: true }));
    app.use(express.json());
    app.use("/api/users", userRoute);
    app.use("/api/auth", authRoute);
    app.use("/api/products", productRoute);
    app.use("/api/carts", cartRoute);
    app.use("/api/orders", orderRoute);
    app.use("/api/checkout", stripeRoute);

app.listen(PORT, ()=>{
    console.log(`Backend server is running on port : ${PORT}`);
})