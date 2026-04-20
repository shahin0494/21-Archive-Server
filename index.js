require("dotenv").config()
const express = require("express")
const cors = require("cors")
require("./config/db")
const routes = require('./routes/routes')

// 👉 1. IMPORT THE WEBHOOK CONTROLLER HERE
const { stripeWebhookController } = require("./controllers/paymentController")

const archiveServer = express()
archiveServer.use(cors())

// 👉 2. USE .post() INSTEAD OF .use(), AND ADD THE CONTROLLER AT THE END
archiveServer.post(
    "/stripe/webhook",
    express.raw({ type: "application/json" }),
    stripeWebhookController
)

// 👉 3. NORMAL JSON PARSER COMES AFTER
archiveServer.use(express.json())
archiveServer.use(routes)

const PORT = 3000

archiveServer.listen(PORT, () => {
    console.log("Archive server started on port", PORT);
})

archiveServer.get("/", (req, res) => {
    // Updated this from Cookpedia to match your current project vibe
    res.status(200).send("<h1>21 Archive Server Started</h1>") 
})