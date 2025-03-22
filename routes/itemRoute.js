import express from "express";
import { addItem } from "../controllers/itemController.js"; 
import multer from "multer";
import path from "path";
import fs from "fs";

const itemRouter = express.Router();

// Ensure "uploads" directory exists
const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Image Storage Engine
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log("Multer is processing file...");
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        console.log("Received file:", file);
        cb(null, `${Date.now()}${path.extname(file.originalname)}`);
    }
});

// Add file filter to ensure only images are uploaded
const fileFilter = (req, file, cb) => {
    if (!file) {
        cb(new Error("No file uploaded"), false);
    } else if (!file.mimetype.startsWith("image/")) {
        cb(new Error("Only image files are allowed"), false);
    } else {
        cb(null, true);
    }
};

const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter 
});

// Middleware to check if file is being received
itemRouter.post("/add", upload.single("image"), (req, res, next) => {
    console.log("Uploaded File in Route:", req.file); // Debugging Multer
    next();
}, addItem);

export default itemRouter;