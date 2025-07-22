// Import mongoose library to interact with MongoDB database
const mongoose = require('mongoose');

// Connect to the MongoDB database named "ProjectSD3" running locally on default port 27017
const connect = mongoose.connect("mongodb://localhost:27017/ProjectSD3");

// After attempting to connect, handle the promise to check if connection succeeded or failed
connect.then(() => {
    // If connected successfully, print this message to the console
    console.log("Database Connected Successfully");
})
.catch(() => {
    // If connection failed, print this error message to the console
    console.log("Database cannot be Connected");
})


// Create a mongoose model named 'users' based on the Loginschema
// This model represents the 'users' collection in MongoDB and provides methods to interact with it
const collection = new mongoose.model("users", Loginschema);

// Export the 'collection' model to be used in other parts of the application
module.exports = collection;
