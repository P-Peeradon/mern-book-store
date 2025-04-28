import express from "express";
import { mongoDBURL, PORT } from "./config.js";
import mongoose from "mongoose";

const app = express();

//Listen middleware. It tells whether server is running or not.
mongoose.connect(mongoDBURL)
    .then(() => {
        console.log("App connected to database");
        app.listen(PORT, () => {
            console.log(`App is running on port: ${PORT}`);
        });
    }).catch((err) => {
        console.log(err)
    });

//Get from root directory
app.get('/', (req, res) => {
    console.log(req.headers);
    return res.status(200).send("Welcome to MERN stack");
});

