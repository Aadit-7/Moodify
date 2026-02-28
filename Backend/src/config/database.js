const mongoose = require("mongoose")

const connecteToDB = async ()=>{
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Connected to DB");

}


module.exports = connecteToDB