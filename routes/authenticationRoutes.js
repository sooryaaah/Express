const express = require('express');
const router = express.Router();
const authenticate = require('../controllers/authenticationController')

router.post("/signup", authenticate.signUp)
router.post("/login", authenticate.logIn)
router.post("/emailVerification", authenticate.emailVerification)



module.exports = router;