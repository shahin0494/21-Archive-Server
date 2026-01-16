const users = require("../models/userModel")

// refister controller
exports.registerController = async (req, res) => {
    console.log("inside register controller");
    const { username, email, password } = req.body

    try {
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            res.status(406).json("User already exists please login")
        } else {
            const newUser = new users({
                username, email, password
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
    } catch (error) {
        res.status(500).json(error)
        console.log(error);

    }
}

// login controller
exports.loginController = async (req,res)=>{
    console.log("inside login controller");
    const {email,password} = req.payload

    try {
            
    } catch (error) {
        res.status(500).json(error)
    }
}