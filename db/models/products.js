const client = require('../client');

async function createProduct({name, description, price, category, img, quantity}) {
    try {
        const { rows: [product] } = await client.query(`
            INSERT INTO products(name, description, price, category, img, quantity)
            VALUES($1, $2, $3, $4, $5, $6)
            ON CONFLICT (name) DO NOTHING
            RETURNING *;
        `, [name, description, price, category, img, quantity]);

        return product;
    } catch (error) {
        throw error;
    }
}

async function deleteProduct(product_id){
  try {
    const { rows: [product] } = await client.query(`
      DELETE FROM products
      WHERE id=${product_id}
    `);

    return product;
  } catch (error) {
    throw error;
  }
}

async function updateProduct(product_id, fields = {}){
  const setString = Object.keys(fields).map(
    (key, index) => `"${ key }"=$${ index + 1 }`
    ).join(', ');
    if (setString.length === 0) {
      return;
    }
    try {
      const { rows: [product] } = await client.query(`
      UPDATE products
      SET ${ setString }
      WHERE id=${ product_id }
      RETURNING *;
      `, Object.values(fields));
      return product;
    } catch (error) {
      throw error;
    }
}

async function getAllProducts() {
  try {
    const { rows: products } = await client.query(`
      SELECT * FROM products;
    `)

    return products;
  } catch (error) {
    throw error;
  }
}

async function getAllProductsByCategory(category) {
  try {
    const { rows: products } = await client.query(`
      SELECT * 
      FROM products
      WHERE category='${category}';
    `);
    
    return products;
  } catch (error) {
    throw error;
  }
}

async function getProductById(id){
  try {
    const { rows: [product] } = await client.query(`
      SELECT *
      FROM products
      WHERE id=$1
    `, [id]);

    return product;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getProductById,
  getAllProducts,
  createProduct,
  getAllProductsByCategory, 
  updateProduct,
  deleteProduct
};