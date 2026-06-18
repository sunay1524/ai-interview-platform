const express = require("express");
const authRouter = require("./routes/auth.routes.js")
const aiRouter = require("./routes/ai.routes.js")

const cors = require("cors")
const cookieParser = require("cookie-parser")
const app = express()
app.use(cors({
    origin:"http://localhost:5173",credentials:true
}))


app.use(express.json())
app.use(cookieParser())
app.use("/api/auth" , authRouter)
app.use("/api/ai", aiRouter)


module.exports = app;