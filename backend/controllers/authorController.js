const express = require("express")
const router = express.Router()
const authorModel = require("../models/authorModel")

//api endpoint to create author
router.get("/authors", (req, res) => {
    authorModel.getAllAuthors()
        .then((results) => {
            res.status(200).json(results)
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json("query error")
        })
})

module.exports = router