const mongoose = require("mongoose")

const sneakerSchema = new mongoose.Schema({
    sneakerName: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    style: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    sizes: [
        {
            size: {
                type: Number,
                required: true
            },
            stock: {
                type: Number,
                required: true
            }
        }
    ],
    photos: {
        type: [String],
        required: true,
        validate: {
            validator: function (value) {
                return value.length <= 5
            },
            message: "Max 5 photos"
        }
    }
})

const sneakers = mongoose.model("sneakers", sneakerSchema)
module.exports = sneakers