const bcrypt = require("bcrypt");

//here enter the password you need to incrypt 
bcrypt.hash("Enter the pass you need to hash", 10).then((hash) => {
  console.log("Hashed password:", hash);//paste this hashed password to dataBAse
  process.exit(); // to end the script after hashing
});
