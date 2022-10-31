const client = require('../client');

async function createOrder(user_id){
    try {
        const { rows: [order] } = await client.query(`
            INSERT INTO orders (is_active, user_id)
            VALUES ($1, $2)
            RETURNING *;
        `, [true, user_id]);

        return order;
    } catch (error) {
        throw error;
    }
}

async function getOpenOrder(user_id){
    try {
        const { rows: [order] } = await client.query(`
            SELECT * FROM orders
            WHERE user_id=${user_id}
        `);
        return order;
    } catch (error) {
        throw error;
    }
}

async function closeOrder(orders_id){
    try {
        const { rows: [order] } = await client.query(`
            UPDATE orders
            SET is_active=false
            WHERE id=${orders_id}
            RETURNING *;
        `);
        
        return order;
    } catch (error) {
        throw error;
    }
}

async function getOrderStatus(orders_id) {
    try {
        const { rows: [order] } = await client.query(`
            SELECT is_active
            FROM orders
            WHERE id=${orders_id}
        `);

        return order;
    } catch (error) {
        throw error;    
    }
}

module.exports = {
    createOrder,
    closeOrder,
    getOrderStatus,
    getOpenOrder
}