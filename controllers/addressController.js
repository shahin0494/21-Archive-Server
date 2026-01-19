const address = require("../models/addressModel")

// add address
exports.addAddressController = async (req, res) => {
    console.log("inside add address controller");
    const userID = req.user.id;
    const addressData = req.body
    const name = req.user.username
    console.log(name);

    try {
        if (addressData.isDefault) {
            await address.updateMany({ userID }, { $set: { isDefault: false } })
        }
        const newAdress = new address({
            ...addressData, name: name, userID
        })
        await newAdress.save()
        res.status(200).json(newAdress)
    } catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
}

