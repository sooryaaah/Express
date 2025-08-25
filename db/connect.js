const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const mongoConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("connection successful...")
    } catch (error) {
        console.log("error while connecting database: ", error)
    }
}

module.exports = mongoConnect;