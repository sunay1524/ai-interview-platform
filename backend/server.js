require("dotenv").config();
const app = require("./src/app");

// Only start the server locally. Vercel will export the app instead.
if (process.env.NODE_ENV !== 'production') {
    app.listen(3000, () => {
        console.log("Listening on port 3000");
    });
}

// EXPORT REQUIRED FOR VERCEL
module.exports = app;