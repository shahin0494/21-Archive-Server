const carts = require("../models/cart");
const orders = require("../models/orderModel");
const sneakers = require("../models/sneakerModel");
const address = require("../models/addressModel");

// add to cart
exports.addToCartController = async (req, res) => {
    console.log("inside add to cart controller");
    const { id } = req.params
    const userID = req.user.id
    const { size, quantity = 1 } = req.body
    try {
        // product availbity
        const products = await sneakers.findById(id)
        if (!products) {
            return res.status(404).json("SNEAKER NOT FOUND");
        }
        // size availability
        const sizeData = products.sizes.find(s => s.size == size)
        if (!sizeData) {
            return res.status(400).json("SIZE UNAVAILABLE");
        }
        //quantiy check
        const existingCartItem = await carts.findOne({ userID, sneakerID: id, size })
        if (existingCartItem) {
            const newQuantity = existingCartItem.quantity + quantity
            if (newQuantity > sizeData.stock) {
                return res.status(400).json("Not enough stock available");
            }
            existingCartItem.quantity = newQuantity
            existingCartItem.totalPrice = newQuantity * existingCartItem.price
            await existingCartItem.save()
            return res.status(200).json(existingCartItem);
        }
        // new cart itm
        const newCartItem = new carts({
            sneakerID: id,
            userID,
            sneakerName: products.sneakerName,
            brand: products.brand,
            price: products.price,
            photos: products.photos[0],
            quantity,
            size,
            totalPrice: products.price * quantity
        })
        await newCartItem.save()
        res.status(200).json(newCartItem)
    } catch (error) {
        res.status(500).json(error)
        console.log(error);
    }
}

// create order
exports.createOrderController = async (req, res) => {
    console.log("inside create order controller");
    try {
        const userID = req.user.id
        const cartItem = await carts.find({ userID })
        if (cartItem.length === 0) {
            return res.status(400).json("Cart is empty")
        }

        let orderTotal = 0
        const orderItems = []
        for (let item of cartItem) {
            const product = await sneakers.findById(item.sneakerID)
            if (!product) {
                return res.status(404).json("Product not found while creating order");
            }
            const sizeData = product.sizes.find(s => s.size == item.size)
            if (!sizeData || sizeData.stock < item.quantity) {
                return res.status(409).json(
                    `${product.sneakerName} (Size ${item.size}) is out of stock`
                );
            }

            orderTotal += item.totalPrice
            orderItems.push({
                sneakerID: item.sneakerID,
                sneakerName: item.sneakerName,
                brand: item.brand,
                size: item.size,
                quantity: item.quantity,
                price: item.price,
                totalPrice: item.totalPrice,
                photos: Array.isArray(item.photos) ? item.photos[0] : item.photos
            })
        }

        // 👈 ADDED: Fetch the user's default address to save a snapshot
        const userAddress = await address.findOne({ userID });

        // create order
        const order = new orders({
            userID,
            items: orderItems,
            orderTotal,
            paymentStatus: "pending",
            // 👈 ADDED: Save the address snapshot directly into the order
            shippingAddress: userAddress ? {
                name: userAddress.name,
                street: userAddress.street,
                city: userAddress.city,
                state: userAddress.state,
                pincode: userAddress.pincode,
                country: userAddress.country
            } : null 
        })
        
        await order.save()
        res.status(200).json(order)

    } catch (error) {
        console.error("CREATE ORDER CRASH:", error);
        res.status(500).json(error.message || "Server error");
    }
}

// get all caet
exports.getAllCartController = async (req, res) => {
    console.log("inside get all cart controller");
    const userid = req.user.id
    try {
        const products = await carts.find({ userID: userid })
        res.status(200).json(products)
        console.log(products);

    } catch (error) {
        res.status(500).json(error)
        console.log(error);
    }
}

// delete cart
exports.deleteCartController = async (req, res) => {
    console.log("inside delete wishlist controller");
    const { id } = req.params
    try {
        const deleteCart = await carts.findByIdAndDelete({ _id: id })
        res.status(200).json(deleteCart)
    } catch (error) {
        res.status(500).json(error)
    }
}