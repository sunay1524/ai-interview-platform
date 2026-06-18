require("dotenv").config();
const app = require("./src/app");
const connectDb = require("./src/config/database");

async function startServer() {
    try {
        await connectDb();

        app.listen(3000, () => {
            console.log("Listening on port 3000");
        });
    } catch (err) {
        console.log(err);
    }
}

startServer();