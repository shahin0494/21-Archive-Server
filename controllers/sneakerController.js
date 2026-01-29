const sneakers = require("../models/sneakerModel")

// add sneakers
exports.addSneakerController = async (req, res) => {
    console.log("inside add sneaker controller");
    const { sneakerName, brand, type, price, style, description, gender } = req.body
    const sizes = JSON.parse(req.body.sizes)
    const photos = req.files.map(file => file.path)
    if (photos.length > 5) {
        return res.status(400).json("MAX 5 PHOTOS ALLOWED")
    }
    try {
        const existingSneaker = await sneakers.findOne({ sneakerName })
        if (existingSneaker) {
            return res.status(500).json("Snesker already exists")
        } else {
            const newSneaker = new sneakers({
                sneakerName, brand, type, price, style, description, gender, sizes, photos
            })
            await newSneaker.save()
            res.status(200).json(newSneaker)
        }
    } catch (error) {
        console.error("ERROR:", error)
        res.status(500).json({
            message: error.message
        })

    }
}

// get all snekars
exports.getAllSneakersController = async (req, res) => {
    console.log("inside get all sneakers controller");
    try {
        const allSnekaers = await sneakers.find()
        return res.status(200).json(allSnekaers)
    } catch (error) {
        return res.status(500).json(error)
    }
}

// get single sneaker
exports.getSingleSneakerController = async (req, res) => {
    console.log("inside get single sneaker controller");
    const { id } = req.params
    try {
        const singleSneaker = await sneakers.findById({ _id: id })
        res.status(200).json(singleSneaker)
    } catch (error) {
        return res.status(500).json(error)

    }
}