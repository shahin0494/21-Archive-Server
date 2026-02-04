const Stripe = require("stripe")
const orders = require("../models/orderModel")
const carts = require("../models/cart")
const sneakers = require("../models/sneakerModel")

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// create stripe payment
exports.createPaymentController = async (req, res) => {
    console.log("inside create payment controller");
    try {
        const orderId = req.body?.orderId
        if (!orderId) {
          return res.status(400).json("orderId is required");
        }
        const order = await orders.findById(orderId)
        if (!order) {
            res.status(404).json("order not found")
        }
        if (order.paymentStatus == "paid") {
            res.status(400).json("Order already paid")
        }
        const payment = await stripe.paymentIntents.create({
            amount: order.orderTotal * 100,
            currency: "usd",
            metadata: {
                orderId: order._id.toString(),
                userID: order.userID.toString()
            }
        });
        res.status(200).json({
            clientSecret: payment.client_secret
        });
    } catch (error) {
        console.error(error);
        res.status(500).json("Stripe payment creation failed");
    }
}

// checking payment
exports.stripeWebhookController = async (req, res) => {
    console.log("inside stripe web hook ");
    let event;
    // check
    try {
        const sig = req.headers["stripe-signature"]
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_KEY
        );

    } catch (err) {
        console.error("Webhook signature error:", err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    // succdss
    if (event.type === "payment_intent.succeeded") {
        const paymentIntent = event.data.object
        const orderId = paymentIntent.metadata.orderId;
        const order = await orders.findById(orderId)
        if (!order) { return res.status(404).end(); }
        // reduce stock
        for (let item of order.items) {
            await sneakers.updateOne({
                _id: item.sneakerID,
                "sizes.size": item.size,
                "sizes.stock": { $gte: item.quantity }
            },
                {
                    $inc: { "sizes.$.stock": -item.quantity }
                })
        }

        // ✅ Update order
        order.paymentStatus = "paid";
        order.orderStatus = "processing";
        await order.save();
        // 🧹 Clear cart
        await carts.deleteMany({ userID: order.userID });
    }
    res.json({ received: true });
}