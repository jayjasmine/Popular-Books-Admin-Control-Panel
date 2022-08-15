const express = require("express")

const router = express.Router()

const coversModel = require("../models/coversModel")

// api endpoint to get all covers
router.get("/covers", (req, res) => {
    coversModel.getAllCovers()
        .then((results) => {
            res.status(200).json(results)
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json("query error")
        })
})


module.exports = router