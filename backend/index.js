import express, { response } from "express";
import { PORT } from "./config.js";

const app = express();

//Listen middleware. It tells whether server is running or not.
app.listen(PORT, () => {
    console.log(`App is running on port: ${PORT}`);
});

//Get from root directory
app.get('/', (req, res) => {
    console.log(req);
    return res.status(234).send("Welcome to MERN stack");
});