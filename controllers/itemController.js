import db from "../config/db.js";
import fs from "fs"; // Import file system module

// Add Food Item
const addItem = async (req, res) => {
    const { name, description, price, category } = req.body;
    const image_filename = req.file ? req.file.filename : null;

    if (!name || !description || !price || !category || !image_filename) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const sql = "INSERT INTO items (name, description, price, image, category) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [name, description, price, image_filename, category], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Database error" });
        }
        res.status(201).json({ message: "Item added successfully", itemId: result.insertId });
    });
};

// Display All Items (MySQL)
const listItem = (req, res) => {
    const sql = "SELECT * FROM items";
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: "Error fetching items" });
        }
        res.json({ success: true, data: results });
    });
};

// Remove Item 
const removeItem = (req, res) => {
    const itemId = req.body.id;

    if (!itemId) {
        return res.status(400).json({ success: false, message: "Item ID is required" });
    }

    // First, retrieve the item's image filename
    const selectSql = "SELECT image FROM items WHERE id = ?";
    db.query(selectSql, [itemId], (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: "Error fetching item" });
        }
        if (results.length === 0) {
            return res.status(404).json({ success: false, message: "Item not found" });
        }

        const image_filename = results[0].image;

        // Remove the image file from uploads directory
        fs.unlink(`uploads/${image_filename}`, (unlinkErr) => {
            if (unlinkErr && unlinkErr.code !== "ENOENT") {
                console.error("Error deleting image:", unlinkErr);
            }

            // Now, delete the item from the database
            const deleteSql = "DELETE FROM items WHERE id = ?";
            db.query(deleteSql, [itemId], (deleteErr, result) => {
                if (deleteErr) {
                    return res.status(500).json({ success: false, message: "Error deleting item" });
                }
                res.json({ success: true, message: "Item removed successfully" });
            });
        });
    });
};

export { addItem, listItem, removeItem };