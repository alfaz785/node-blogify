
const allProducts = require('../MOCK_DATA (1).json')
const fs = require('fs')

const handleAllProducts = (req, res) => {
    res.status(201).json({
        status: "success",
        msg: "All Products Has Been Displayed",
        allProducts

    })
}
const handleIdWiseProduct = (req, res) => {
    const id = req.params['id']; // Assuming `id` is a single ID string

    fs.readFile("MOCK_DATA (1).json", (err, data) => {
        if (err) {
            res.status(500).send('Error reading file');
            throw err;
        }

        const productsData = JSON.parse(data);
        const updateData = productsData.filter((item) => {
            return id.includes(item.id);
        });

        if (updateData.length > 0) {
            res.json(updateData);
        } else {
            res.status(404).send('Product not found');
        }x
    });
};
module.exports = {
    handleAllProducts,
    handleIdWiseProduct
};