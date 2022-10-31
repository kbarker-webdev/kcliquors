const client = require('../client');


async function addProductToOrder(orders_id, product_id, product_name, price_at_purchase, quantity_order) {
    try {
        ///make sure order doesnt already contain this product
        const { rows: [p_order] } = await client.query(`
            SELECT * 
            FROM product_orders
            WHERE product_id=$1
            AND orders_id=$2
        `, [product_id, orders_id])

        //if it does, add quantity
        if (p_order) {
            p_order.quantity_order += quantity_order;
            const update_order = await updateProductOrders(p_order.id, p_order);
            return update_order;
        }

        const { rows: [product_orders] } = await client.query(`
            INSERT INTO product_orders (product_id, product_name, price_at_purchase, quantity_order, orders_id)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;
        `, [product_id, product_name, price_at_purchase, quantity_order, orders_id]);

        return product_orders;
    } catch (error) {
        throw error;
    }
}

async function removeProductFromOrder(orders_id, product_id){
    try {
        ///make sure order already contains this product
        const { rows: [p_order] } = await client.query(`
            SELECT * 
            FROM product_orders
            WHERE orders_id=${orders_id}
            AND product_id=${product_id}
        `);

        //if it does, remove quantity
        if (p_order && p_order.quantity_order > 1) {
            p_order.quantity_order -= 1;
            const update_order = await updateProductOrders(p_order.id, p_order);
            return update_order;
        } else if(p_order && p_order.quantity_order === 1){
            const removedProduct = await client.query(`
                DELETE FROM product_orders
                WHERE orders_id=${orders_id}
                AND product_id=${product_id}
            `);
            return removedProduct;
        }
        
    } catch (error) {
        throw error;
    }
}

async function getAllProductsOnOrder(orders_id) {
    try {
        const { rows: products_on_order } = await client.query(`
            SELECT * 
            FROM product_orders
            WHERE orders_id=$1
        `, [orders_id]);

        return products_on_order;
    } catch (error) {
        throw error;
    }
}

async function updateProductOrders(id, fields = {}) {
    const setString = Object.keys(fields).map(
        (key, index) => `"${ key }"=$${ index + 1 }`
        ).join(', ');
        if (setString.length === 0) {
          return;
        }
        try {
          const { rows: [ product_orders ]} = await client.query(`
          UPDATE product_orders
          SET ${ setString }
          WHERE id=${ id }
          RETURNING *;
          `, Object.values(fields));
          return product_orders;
        } catch (error) {
          throw error;
        }
}

module.exports = {
    addProductToOrder,
    getAllProductsOnOrder,
    updateProductOrders,
    removeProductFromOrder
}