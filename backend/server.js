require("dotenv").config();
const app = require("./src/app");
const connectDb = require("./src/config/database");

// Connect to the database
connectDb().then(() => {
    // Only start the server locally. Vercel will export the app instead.
    if (process.env.NODE_ENV !== 'production') {
        app.listen(3000, () => {
            console.log("Listening on port 3000");
        });
    }
}).catch(err => {
    console.log("Database connection failed:", err);
});

// EXPORT REQUIRED FOR VERCEL
module.exports = app;