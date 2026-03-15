import dotenv from "dotenv";
dotenv.config({
    path: "./.env",
});

import app from "./app.js";
import connectDb from "./db/database.js";

const port = process.env.PORT;

connectDb()
    .then(() => {
        app.listen(port, () => {
            console.log("your server on port", port);
        });
    })
    .catch((err) => {
        console.error("your server didn't started", err);
    });