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
            totalPrice: Number
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
        enum: ["processing", "shipped", "delivered", "cancelled"],
        default: "processing"
    }

}, { timestamps: true })

const orders = mongoose.model("orders",orderSchema)
module.exports = orders