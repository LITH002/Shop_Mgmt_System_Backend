import db from "../config/db.js";

// Add Food Item
const addItem = async (req, res) => {
    console.log("Request Body:", req.body);
    console.log("Uploaded File in Controller:", req.file);

    const { name, description, price, category } = req.body;
    const image_filename = req.file ? req.file.filename : null;

    if (!name || !description || !price || !category || !image_filename) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const sql = "INSERT INTO items (name, description, price, image, category) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [name, description, price, image_filename, category], (err, result) => {
        if (err) {
            console.error("Error adding item:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.status(201).json({ message: "Item added successfully", itemId: result.insertId });
    });
};

export { addItem };