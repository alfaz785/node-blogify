const express = require("express")
const { handleLoginUserData, handleSignUpUser } = require("../../controller/loginPage")
const router = express.Router()

router.post("/login", handleLoginUserData)
router.post("/sign-up", handleSignUpUser)

module.exports = router