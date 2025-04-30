import db from "../config/db.js";

const createUserTable = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      cartData TEXT DEFAULT '{}'
    );
  `;

  db.query(sql, (err) => {
    if (err) {
      console.error("Error creating users table:", err);
    } else {
      console.log("Users table created successfully");
    }
  });
};

/// Check if user exists
const findUserByEmail = async (email) => {
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    return rows[0]; // Return the user if found
};

// Insert a new user
const insertUser  = async (name, email, password) => {
    const [result] = await db.query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, password]);
    return result.insertId; // Return the new user's ID
};

export default createUserTable;
export { findUserByEmail, insertUser };