const router = require("express").Router();
const cors = require("cors");
const dotenv = require('dotenv');
dotenv.config();
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_KEY);

router.post("/payment",cors(),async (req,res)=>{
    await stripe.charges.create({
        source: req.body.tokenId,
        amount: req.body.amount,
        currency: "EUR"
    }, (stripeErr, stripeRes)=>{
        if(stripeErr){
            res.status(500).json(stripeErr);
        }else {
            res.status(200).json(stripeRes);
        }
    });
});

module.exports = router;