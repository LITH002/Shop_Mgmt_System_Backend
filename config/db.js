import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

// Create MySQL connection
const db = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: process.env.DB_USER,      
    password: process.env.DB_PASS,  
    database: process.env.DB_NAME  
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
    } else {
        console.log("Connected to MySQL via XAMPP");
    }
});

export default db;