const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    items: [
        {
            sneakerID: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "sneakers",
            },
            sneakerName: String,
            brand: String,
            size: Number,
            quantity: Number,
            price: Number,
            totalPrice: Number,
            photos: String // ADDED: So your frontend can display the image in the order history
        }
    ],
    orderTotal: {
        type: Number,
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ["pending", "paid", "failed"],
        default: "pending"
    },
    orderStatus: {
        type: String,
        // ADDED "confirmed" so your webhook doesn't crash when updating!
        enum: ["pending", "confirmed", "processing", "shipped", "delivered", "cancelled"],
        default: "pending" 
    },
    // ADDED: Shipping Address Snapshot
    shippingAddress: {
        name: String,
        street: String,
        city: String,
        state: String,
        pincode: String,
        country: String
    },
    // ADDED: For tracking Stripe payments easily
    transactionId: {
        type: String,
        default: ""
    }

}, { timestamps: true })

const orders = mongoose.model("orders", orderSchema)
module.exports = orders