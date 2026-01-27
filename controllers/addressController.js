const address = require("../models/addressModel")

// add address
exports.addAddressController = async (req, res) => {
    console.log("inside add address controller");
    const userID = req.user.id;
    const addressData = req.body
    const name = req.user.username
    // const email = req.user.emaill
    // console.log(name);

    try {
        const existingAddress = await address.findOne({ userID })
        if (existingAddress) {
            return res.status(400).json("Address already addedd")
        }
        const newAdress = new address({
            ...addressData, name: name, userID, isDefault: true
        })
        await newAdress.save()

        res.status(200).json(newAdress)
    } catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
}

// get all address
exports.getAllAddressController = async (req, res) => {
    console.log("inside get all address controller");
    try {
        const allAddress = await address.find()
        res.status(200).json(allAddress)
    } catch (error) {
        res.status(500).json(error)
    }
}

// update adress
exports.updateAddressControllwe = async (req, res) => {
    console.log("inside update address controlelr");
    const { id } = req.params
    const { street, city, state, landmark, pincode, country } = req.body
    try {
        const updateAddress = await address.findByIdAndUpdate({ _id: id }, { street, city, state, landmark, pincode, country }, { new: true })
        await updateAddress.save()
        res.status(200).json(updateAddress)
    } catch (error) {
        res.status(500).json(error)
        console.log(error);

    }
}