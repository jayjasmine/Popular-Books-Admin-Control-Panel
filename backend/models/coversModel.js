// Access the database connection from database.js
const db = require("../database")

module.exports.getAllCovers = () => {
    return db.query("SELECT * FROM covers")
}