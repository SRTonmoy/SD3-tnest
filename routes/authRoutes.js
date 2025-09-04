
const express = require('express');


const router = express.Router();


const authController = require('../controllers/authController');



router.get("/", (req, res) => res.render("welcome"));


router.get("/login", (req, res) => res.render("login"));


router.get("/signup", (req, res) => res.render("signup"));




router.post("/signup", authController.signup);


router.post("/login", authController.login);



module.exports = router;
