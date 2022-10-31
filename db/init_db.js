const {
  client,
  users,
  products,
  orders,
  product_orders
} = require('./');

const { beers, wines, spirits, initialUsers } = require('./seedData')

async function buildTables() {
  try {
    client.connect();
    await dropTables()
    console.log('Building tables...');


    await client.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        is_admin BOOLEAN DEFAULT false
      );
    `);

    await client.query(`
      CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        description TEXT NOT NULL,
        price FLOAT NOT NULL,
        category VARCHAR(255),
        img TEXT,
        quantity INTEGER
      );
    `);

    await client.query(`
        CREATE TABLE orders (
          id SERIAL PRIMARY KEY,
          is_active BOOLEAN DEFAULT true,
          user_id INTEGER REFERENCES users(id)
        );
    `)

    await client.query(`
        CREATE TABLE product_orders (
          id SERIAL PRIMARY KEY,
          product_id INTEGER REFERENCES products(id),
          product_name VARCHAR(255) REFERENCES products(name),
          price_at_purchase FLOAT DEFAULT 0,
          quantity_order INTEGER,
          orders_id INTEGER REFERENCES orders(id)
        );
    `)

  } catch (error) {
    throw error;
  }
}
async function dropTables() {
  await client.query(`
      DROP TABLE IF EXISTS product_orders;
      DROP TABLE IF EXISTS orders;
      DROP TABLE IF EXISTS products;
      DROP TABLE IF EXISTS users;
    `)
}
async function populateInitialData() {
  try {
    console.log('Creating products...')
    for (const beer of beers) {
      await products.createProduct(beer);
    }
    for (const wine of wines){
      await products.createProduct(wine);
    }
    for (const spirit of spirits){
      await products.createProduct(spirit);
    }
    console.log('Creating users...')
    for (const user of initialUsers){
      await users.createUser(user);
    }
    console.log('db rebuilt')

    //  const user = initialUsers[1]
    // initialUsers.map(user => {users.createUser(user)})
    // console.log('Creating dummy orders...');
    // const orderTest = await orders.createOrder(user.id);
    // console.log('Creating dummy product_orders...');
    // const productToOrder = await products.getProductById(7)
    // const productToOrder2 = await products.getProductById(7)
    // const p_orders = await product_orders.addProductToOrder(orderTest.id, productToOrder.id, productToOrder.price, 4);
    // const p_orders2 = await product_orders.addProductToOrder(orderTest.id, productToOrder2.id, productToOrder2.price, 2);
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(()=> client.end())

