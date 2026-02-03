const mongoose = require("mongoose")

const wishlistSchema = new mongoose.Schema({
    sneakerID: {
        type: String,
        required: true
    },
    userID:{
        type:String,
        required:true
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

const wishlists = mongoose.model("wishlists", wishlistSchema)
module.exports = wishlists