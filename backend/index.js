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

        return res.status(200).json(book);

    } catch (err) {
        console.log(err);
        return res.status(500).send('Problem');
    }
});

//Update a book
app.put('books/:id', async (req, res) => {
    try {
        if (
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ) {
            return res.status(400).send({
                msg: "Send all required fields: title, author, publish year"
            });
        } 

        const { id } = req.params;

        const result = await book.findByIdAndUpdate(id);

        if (!result) {
            return res.status(404).json({ msg: "Book not found."})
        }

        return res.status(200).send({ msg: "Book updated success."})
    } catch (err) {
        console.log(err)
        return res.status(500).send('Problem')
    }
})

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
        console.log(err);
        return res.status(500).send('Problem');
    }
});

