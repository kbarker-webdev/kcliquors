// grab our db client connection to use with our adapters
const client = require('../client');
const bcrypt = require('bcrypt');




async function createUser({username, password, email, admin }) {

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const { rows: [user] } = await client.query(`
      INSERT INTO users (username, password, email, is_admin)
      VALUES($1, $2, $3, $4)
      ON CONFLICT DO NOTHING
      RETURNING id, username, email, is_admin;
    `, [username, hashedPassword, email, admin]);
    
    return user;
  } catch (error) {
    throw error;
  }
}

async function getAllUsers() {
  try {
    const { rows: users } = await client.query(`
    SELECT id, username, email, is_admin
    FROM users;
    `);
    return users;
  } catch (error) {
    throw error;
  }
}


async function getUserById(userId) {
  try {
    const {rows: [user] } = await client.query(`
    SELECT id, username, email, is_admin
    FROM users
    WHERE id=${userId}
    `);
    if (!user) {
      throw {
        name: "UserNotFoundError",
        message: "A user with that id does not exist"
      }
    }
    
    return user;
  } catch (error) {
    throw error;
  }
} 

async function getUserByUsername(username) {
  try {
    const { rows: [user] } = await client.query(`
      SELECT username, email
      FROM users
      WHERE username=$1;
    `, [username]);

    return user;
  } catch (error) {
    throw error;
  }
}

async function getUserByEmail(email) {
  try {
    const { rows: [user] } = await client.query(`
      SELECT username, email
      FROM users
      WHERE email=$1;
    `, [email]);

    return user;
  } catch (error) {
    throw error;
  }
}

async function getUser({ username, password }) {
  try {
    const { rows: [user] } = await client.query(`
      SELECT *
      FROM users
      WHERE username=$1;
    `, [username]);

    const verify = await bcrypt.compare(password, user.password);
    delete user.password;
    if (verify) {
      return user;
    }
  } catch (error) {
    throw error;
  }
}

async function updateUser(id, fields = {}) {
  const setString = Object.keys(fields).map(
    (key, index) => `"${ key }"=$${ index + 1 }`
    ).join(', ');
    if (setString.length === 0) {
      return;
    }
    try {
      const { rows: [ user ]} = await client.query(`
      UPDATE users
      SET ${ setString }
      WHERE id=${ id }
      RETURNING *;
      `, Object.values(fields));
      return user;
    } catch (error) {
      throw error;
    }
  }
  
module.exports = {
  client,
  getAllUsers,  
  createUser,
  getUserById,
  updateUser,
  getUser,
  getUserByUsername,
  getUserByEmail
};