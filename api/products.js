const express = require('express');
const router = express.Router();
const { products } = require('../db');
const {requireAdmin} = require('./utils');

router.get('/', async (req, res, next) => {
    try {
        const allProducts = await products.getAllProducts();
        res.send(allProducts);
    } catch (error) {
        throw error;
    }
})
router.get('/beer', async (req, res, next) => {
    try {
        const products_category = await products.getAllProductsByCategory('beer');
        res.send(products_category);
    } catch (error) {
        throw error;
    }
})
router.get('/wine', async (req, res, next) => {
    try {
        const products_category = await products.getAllProductsByCategory('wine');
        res.send(products_category);
    } catch (error) {
        throw error;
    }
})
router.get('/spirits', async (req, res, next) => {
    try {
        const products_category = await products.getAllProductsByCategory('spirit');
        res.send(products_category);
    } catch (error) {
        throw error;
    }
})
router.get('/:productId', async (req, res, next) => {
    try {
        const { productId } = req.params;
        const product = await products.getProductById(productId);
        res.send(product);
    } catch (error) {
        throw error;
    }
})

router.post('/add', requireAdmin, async (req, res, next) => {
    try {
        const {name, description, price, category, img, quantity} = req.body;
        const newProduct = await products.createProduct({name, description, price, category, img, quantity});
        res.send(newProduct);
    } catch (error) {
        next (error);
    }
})

router.patch('/:productId', requireAdmin, async (req, res, next) => {
    try {
        const {productId} = req.params;
        const {name, description, price, category, img, quantity} = req.body;
        const updateFields = {}
        if (name) {updateFields.name= name};
        if (description) {updateFields.description= description};
        if (price) {updateFields.price= price};
        if (category) {updateFields.category= category};
        if (img) {updateFields.img= img};
        if (quantity) {updateFields.quantity= quantity};
        const product = await products.updateProduct(productId, updateFields);
        res.send(product);
    } catch (error) {
        next (error);
    }
})

router.delete('/:productId', requireAdmin, async (req, res, next) => {
    try {
        const {productId} = req.params;
        const product = await products.deleteProduct(productId);
        res.send(product);
    } catch (error) {
        next (error);
    }
})

module.exports = router;