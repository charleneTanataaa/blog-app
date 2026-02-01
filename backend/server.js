const express = require("express");
const app = express();
const cors = require("cors");

require('dotenv').config();

const connectDB = require("./config/db");
connectDB();

app.use(cors({
    origin: "*",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', "Authorization"]
}));

app.use(express.json());

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const postRoutes = require("./routes/post.routes")
app.use("/posts", postRoutes);

app.listen(process.env.PORT || 3001, () => {
    console.log(`Server running on port `);
})