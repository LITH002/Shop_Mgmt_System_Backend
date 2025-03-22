import db from "../config/db.js"; // Import MySQL connection

const createItemTable = () => {
    const sql = `
    CREATE TABLE IF NOT EXISTS items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        image TEXT NOT NULL,
        category VARCHAR(255) NOT NULL
    )`;
    
    db.query(sql, (err) => {
        if (err) console.error("Error creating items table:", err);
        else console.log("Items table created successfully");
    });
};

export default createItemTable;