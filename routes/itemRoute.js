import express from "express";
import { addItem, listItem, removeItem } from "../controllers/itemController.js"; 
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
    destination: uploadDir,
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${path.extname(file.originalname)}`);
    }
});

// File filter to allow only images
const fileFilter = (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
        return cb(new Error("Only image files are allowed"), false);
    }
    cb(null, true);
};

const upload = multer({ storage, fileFilter });

// Define API routes
itemRouter.post("/add", upload.single("image"), addItem);
itemRouter.get("/list", listItem);
itemRouter.post("/remove", removeItem); // Changed from POST to DELETE (best practice)

export default itemRouter;