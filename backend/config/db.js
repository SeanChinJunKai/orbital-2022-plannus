// importing mongoose which is a MongoDB object modelling tool designed to work in asynchronous environment
const mongoose = require('mongoose')


// function which connects to the MongoDB database via the uri given in .env file
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(`${process.env.MONGO_URI}`)
        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

module.exports = connectDB

// More info on async and await : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function