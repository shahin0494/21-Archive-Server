const mongoose = require("mongoose")
const connectionstring = process.env.DBCONNECTIONSTRING

mongoose.connect(connectionstring).then((res) => {
    console.log("connection success server started");
}).catch((err) => {
    console.log(err);
})

