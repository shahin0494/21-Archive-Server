const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema({
    sneakerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "sneakers",
        required: true
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    sneakerName: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    photos: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 1,
        min: 1
    },
    size: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    }
},
    { timestamps: true }
)

const carts = mongoose.model("carts", cartSchema)
module.exports = carts