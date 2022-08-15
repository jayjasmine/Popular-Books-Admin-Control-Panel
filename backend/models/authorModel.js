// Access the database connection from database.js
const db = require("../database")

module.exports.getAllAuthors = () => {
    return db.query("SELECT * FROM author")
}