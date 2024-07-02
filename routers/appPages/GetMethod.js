const express = require("express")
const { handleAllProducts, handleIdWiseProduct } = require("../../controllers/appPage")
const router = express.Router()


router.get('/products', handleAllProducts)
router.get('/products/:id', handleIdWiseProduct)

module.exports = router
