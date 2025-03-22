import express from "express"
import cors from "cors"
import db from "./config/db.js";
import itemRouter from "./routes/itemRoute.js";
import createItemTable from "./models/itemModel.js";

//App Config
const app = express()
const port = 4000

//Middleware
app.use(express.json())
app.use(cors())

//Test Route
app.get("/",(req,res)=>{
    res.send("API Working")
})

// Test Database Connection
app.get('/test-db', (req, res) => {
    db.query('SELECT 1', (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: "Database not connected" });
        } else {
            res.json({ message: "Database connected successfully" });
        }
    });
});

//API Endpoints
app.use("/api/item",itemRouter);
app.use("/images",express.static('uploads'));

//Start Server
app.listen(port,()=>{
    console.log(`Server started on http://localhost:${port}`);
})

createItemTable();