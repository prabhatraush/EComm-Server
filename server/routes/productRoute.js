const express = require('express');
const Product = require('../models/product');
const projectRouter = express.Router();

const {
    isAuth,
    isAdmin,
    isSeller
} = require('../middlewares/utils');

projectRouter.get('/', async (req, res) => {
    const products = await Product.find({});

    if (!products) {
        res.status(400).send({
            message: 'No Products are available'
        });
        return;
    }
    res.status(200).send(products);
});

projectRouter.get('/:slug', async (req, res) => {
    const products = await Product.findOne({
        slug: req.params.slug
    });

});

projectRouter.post('/create', isAuth, isSeller, async (req, res) => {
    const data = req.body;

    let productImg = [];
    if (req.files.length > 0) {
        productImg = req.files.map((file) => {
            return {
                img: file.location
            };
        });
    }

    const product = new Product({
        ...data,
        image: productImg,
        seller: req.user._id
    });
    const createProduct = await product.save();

    if (createProduct) {
        res.status(200).send(createProduct);
    }

});

projectRouter.put('/:id', isAuth, isSeller, async (req, res) => {
    const updateData = req.body;
    const product = await Product.findById(req.params.id);

    const seller = product.seller

    const updateProduct = new Product({
        ...data,
        seller: req.user._id
    });

    console.log(product);
    const createProduct = await updateProduct.save();

    if (createProduct) {
        res.status(200).send(createProduct);
    }

});





module.exports = projectRouter;