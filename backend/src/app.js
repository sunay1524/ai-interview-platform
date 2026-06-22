const express = require("express");
const authRouter = require("./routes/auth.routes.js")
const aiRouter = require("./routes/ai.routes.js")

const cors = require("cors")
const cookieParser = require("cookie-parser")
const app = express()
app.use(cors({
    origin: function (origin, callback) {
        callback(null, true);
    },
    credentials: true
}))


const mongoose = require("mongoose");
const connectDb = require("./config/database");

app.use(express.json())
app.use(cookieParser())

// Ensure DB is connected before handling requests
app.use(async (req, res, next) => {
    try {
        await connectDb();
        next();
    } catch (err) {
        console.error("DB connection error:", err);
        res.status(500).json({ message: "Database connection failed", error: err.message });
    }
});
app.use("/api/auth" , authRouter)
app.use("/api/ai", aiRouter)

// Diagnostic health check for Vercel
app.get("/api/health", (req, res) => {
    res.json({
        mongoUriExists: !!process.env.MONGO_URI,
        jwtSecretExists: !!process.env.JWT_SECRET,
        geminiApiKeyExists: !!process.env.GEMINI_API_KEY,
        mongooseState: mongoose.connection.readyState // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
    });
});

module.exports = app;