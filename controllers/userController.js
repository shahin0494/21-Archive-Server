const users = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")



// refister controller
exports.registerController = async (req, res) => {
    console.log("inside register controller");
    const { username, email, password } = req.body

    try {
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            res.status(406).json("User already exists please login")
        } else {
            const encryptPSWD = await bcrypt.hash(password, 10)
            const newUser = new users({
                username, email, password: encryptPSWD
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
exports.loginController = async (req, res) => {
    console.log("inside login controller");
    const { email, password } = req.body

    try {
        const existingUser = await users.findOne({ email })
        console.log(existingUser);
        

        if (existingUser) {
            let isUserLoggedIN = existingUser.role == "user" ? await bcrypt.compare(password, existingUser.password) : password == existingUser.password
            // console.log(isUserLoggedIN);

            if (isUserLoggedIN) {
                const token = jwt.sign({ email, role: existingUser.role, id: existingUser._id,username:existingUser.username}, process.env.JWTSECRETKEY)
                res.status(200).json({ user: existingUser, token })
            } else {
                res.status(500).json("invalid username/paswwrd")
            }
        } else {
            res.status(500).json("invalid  Auth")

        }
    } catch (error) {
        res.status(500).json(error)
    }
}

