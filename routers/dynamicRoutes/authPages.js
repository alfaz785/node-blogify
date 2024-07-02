const express = require("express")
const { handleLoginUserData, handleSignUpUser } = require("../../controllers/loginPage")
const router = express.Router()

router.post("/login", handleLoginUserData)
router.post("/sign-up", handleSignUpUser)

module.exports = router