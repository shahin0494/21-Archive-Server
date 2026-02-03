const sneakers = require("../models/sneakerModel");
const wishlists = require("../models/wishlistModel")

// add to wishlist
exports.addToWishlistController = async (req, res) => {
    console.log("inside add to wishlist controller");
    const { id } = req.params
    const userid = req.user.id
    console.log(userid)


    try {
        const products = await sneakers.findById(id)
        const { sneakerName, brand, price, photos } = products
        const existingWishlist = await wishlists.findOne({ sneakerID: id, userID: userid })
        if (!existingWishlist) {
            const newWishlist = new wishlists({
                sneakerID: id, userID: userid, sneakerName, brand, price, photos
            })
            await newWishlist.save()
            res.status(200).json(newWishlist)
        } else {

            res.status(409).json("Product Already Added")
        }
    } catch (error) {
        res.status(500).json(error)
        console.log(error);

    }
}

// get all wihslists
exports.getAllWishlistsController = async (req, res) => {
    console.log("inside get all wishlist controller");
    const userid = req.user.id
    try {
        const products = await wishlists.find({ userID: userid })
        res.status(200).json(products)
        console.log(products);

    } catch (error) {
        res.status(500).json(error)
        console.log(error);
    }
}

// delete wishlist
exports.deleteWishlistController = async (req,res)=>{
    console.log("inside delete wishlist controller");
    const {id} = req.params
    try {
        const deleteWishlist = await wishlists.findByIdAndDelete({_id:id})
         res.status(200).json(deleteWishlist)
    } catch (error) {
         res.status(500).json(error)
    }
}