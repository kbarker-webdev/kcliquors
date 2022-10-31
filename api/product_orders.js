const express = require ('express');
const productOrdersRouter = express.Router();

const {addProductToOrder, getAllProductsOnOrder, removeProductFromOrder } = require('../db/models/product_orders');

productOrdersRouter.post('/add', async (req, res, next) => {
    try {
        
        const {orders_id, product_id, product_name, price_at_purchase, quantity_order} = req.body;
        const addProduct = await addProductToOrder(orders_id, product_id, product_name, price_at_purchase, quantity_order)
        res.send(addProduct);
    } catch (error) {
        next (error);
    }
})

productOrdersRouter.get('/:orders_id', async (req, res, next) => {
    try {
        const {orders_id} = req.params;
        
        const products = await getAllProductsOnOrder(orders_id);
        res.send(products);
    } catch (error) {
        next (error);
    }
})

productOrdersRouter.delete('/remove', async (req, res, next) => {
    try {
        
        const {orders_id, product_id} = req.body;
        
        const removedProduct = await removeProductFromOrder(orders_id, product_id);
        res.send(removedProduct);
    } catch (error) {
        next (error)
    }
})

module.exports=productOrdersRouter

// req.body 
