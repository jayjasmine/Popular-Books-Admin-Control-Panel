const express = require("express");
//enable validatoin module to sanitize
const validator = require("validator")
//create router to enable API defining
const router = express.Router()
//Connect to bookModel.js so we can talk to the DB
const bookModel = require("../models/bookModel")

//create an endpoint that returns all books
router.get("/books", (req, res) => {
    bookModel.getAllBooks()
        .then((results) => {
            res.status(200).json(results)
        })
        .catch((error) => {
            // log the errors tot he node console
            console.log(error)
            res.status(500).json("query error")
        })
})

//create an endpoint that returns data of single book 
router.get("/books/:id", (req, res) => {
    bookModel.getBookById(req.params.id)
        .then((results) => {
            if (results.length > 0) {
                res.status(200).json(results[0])
            } else {
                res.status(404).json("failed to get book by id")
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json("failed to get book - query error")
        })
})

//create an endpoint that creates a book
router.post("/books/create", (req, res) => {

    //req.body is form data (that was converted to json and put in body of fetch)
    let book = req.body

    //book is the req bod, following that is the json key from the form
    bookModel.createNewBook(
            validator.escape(book.cover_img_path),
            validator.escape(book.title),
            validator.escape(book.publication_year),
            validator.escape(book.author),
            validator.escape(book.copies_sold)
        )
        .then((result) => {
            res.status(200).json("book created!")
        })
        .catch((error) => {
            res.status(500).json("query error - failed to create book")
        })
})

// endpoint to update book
router.post("/books/update", (req, res) => {
    let book = req.body
    //store session data
    let user = req.session.user
    //Push form data to book model, then update book
    bookModel.updateBook(
        validator.escape(book.bookID),
        validator.escape(book.cover_img_path),
        validator.escape(book.title),
        validator.escape(book.publication_year),
        validator.escape(book.author),
        validator.escape(book.copies_sold)
    )
    //Push username from session to SQL query that updates the 'Last updated by' column
    bookModel.updateBookUpdatedBy(
            book.bookID,
            user.username
        )
        .then((result) => {
            if (result.affectedRows > 0) {
                res.status(200).json("book updated")
            } else {
                res.status(404).json("book not found")
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json("failed to get book – query error")
        })
})

//delete endpoint
router.delete("/books/delete/:id", (req, res) => {
    //get the Model to tell DB to delete the book with bookID
    bookModel.deleteBook(
            req.params.id
        )
        .then((result) => {
            if (result.affectedRows > 0) {
                res.status(200).json("book deleted")
                console.log("book dleeted")
            } else {
                res.status(404).json("book not found")
                console.log("book not found")
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json("failed to delete book – query error")
            console.log("query error")
        })
})


//import(require) the routes from this file into sever.js
module.exports = router