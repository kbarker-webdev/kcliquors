const express = require('express');
const guestRouter = express.Router();

guestRouter.post('/', async (req, res, next) => {
    const { cart } = req.session;
    if (!cart) {
        req.session.cart = {items: []};
        res.send(cart)
    } else {
        res.send(cart)
    }
})

guestRouter.get("/items", (req, res, next) => {
    const { cart } = req.session;
    if (!cart) {
        res.send({items: []})
    } else {
        res.send(cart)
    }
})

guestRouter.post('/end', async (req, res, next) => {
    try {
        req.session.destroy();
        res.sendStatus(200);
    } catch (error) {
        next(error)
    }
})

guestRouter.post("/items", (req, res, next) => {
    const { product_id, product_name, price_at_purchase } = req.body; 
    const cartItem = { product_id, product_name, price_at_purchase, quantity_order: 1 };
    const { cart } = req.session
    if (cart) {
        const { items } = cart;
        for (const item of items){
            if (item.product_id === cartItem.product_id){
                item.quantity_order += 1;
                res.sendStatus(200);
                return;
            }
        }
        items.push(cartItem)
    } else {
        req.session.cart = {
            items: [cartItem]
        }
    };

    res.send(200); 
})

guestRouter.delete('/items', async (req, res, next) => {
    try {
        const { product_id } = req.body;
        const { items } = req.session.cart;
        for (let i = 0; i < items.length; i++) {
            if (items[i].product_id === product_id) {
                if (items[i].quantity_order > 1) {
                    items[i].quantity_order -= 1;
                } else {
                    items.splice(i, 1);
                }
            }
        }
        res.send(items);
    } catch (error) {
        next(error)
    }
})

module.exports = guestRouter;