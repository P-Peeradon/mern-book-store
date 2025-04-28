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

//Get all books from MongoDB
app.get('/books', async (req, res) => {
    try {
        const books = await Book.find({});

        return res.status(200).json({
            count: books.length,
            data: books
        });
    } catch (err) {
        console.log(err);
        return res.status(500).send({msg: err});
    }
});

//Get one book by id from MongoDB
app.get('/books/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const book = await Book.findById(id);

    } catch (err) {
        console.log(err)
        return res.status(500).send('Problem')
    }
});

//Post book
app.post('/books', async (req, res) => {
    try {
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear
        };
        
        const book = await Book.create(newBook);

    } catch (err) {
        console.log(err)
        return res.status(500).send('Problem')
    }
});

