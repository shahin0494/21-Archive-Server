const sneakers = require("../models/sneakerModel");
const wishlists = require("../models/wishlistModel")
// const carts = require("../models/cartModel");

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

// Move wishlist item to cart


// exports.moveWishlistToCartController = async (req, res) => {
//     console.log("inside move wishlist to cart controller");

//     const { id } = req.params; // wishlist document id
//     const userID = req.user.id;

//     try {
//         // Find wishlist item
//         const wishlistItem = await wishlists.findById(id);

//         if (!wishlistItem) {
//             return res.status(404).json("Wishlist item not found");
//         }

//         // Ensure user owns this wishlist item
//         if (wishlistItem.userID.toString() !== userID) {
//             return res.status(403).json("Unauthorized");
//         }

//         // Check if already in cart
//         const existingCartItem = await carts.findOne({
//             userID,
//             sneakerID: wishlistItem.sneakerID
//         });

//         if (existingCartItem) {
//             return res.status(409).json("Product already in cart");
//         }

//         // Add to cart (default quantity = 1)
//         const newCartItem = new carts({
//             sneakerID: wishlistItem.sneakerID,
//             userID,
//             sneakerName: wishlistItem.sneakerName,
//             brand: wishlistItem.brand,
//             price: wishlistItem.price,
//             photos: wishlistItem.photos,
//             quantity: 1,
//             totalPrice: wishlistItem.price * 1
//         });

//         await newCartItem.save();

//         // Remove from wishlist
//         await wishlists.findByIdAndDelete(id);

//         return res.status(200).json({
//             message: "Moved to cart successfully",
//             cartItem: newCartItem
//         });

//     } catch (error) {
//         console.error(error);
//         return res.status(500).json("Failed to move item to cart");
//     }
// };