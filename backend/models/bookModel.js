//access the database connection from database.js
const db = require("../database")

module.exports.getAllBooks = () => {
    return db.query("SELECT * FROM book");
}

module.exports.getBookById = (bookID) => {
    return db.query("SELECT * FROM book WHERE bookID = ?", [bookID]);
}

module.exports.createNewBook = (cover_img_path, title, publication_year, author, copies_sold) => {
    return db.query("call createBook(?,?,?,?,?)", [cover_img_path, title, publication_year, author, copies_sold])
}

module.exports.deleteBook = (bookID) => {
    return db.query("call deleteBook(?)", [bookID])
}

module.exports.updateBook = (bookID, cover_img_path, title, publication_year, author, copies_sold) => {
    return db.query("UPDATE book SET cover_img_path = ?, title = ?, publication_year = ?, author = ?, copies_sold = ?, last_updated = CURDATE() WHERE bookID = ?",
        [cover_img_path, title, publication_year, author, copies_sold, bookID])
}

module.exports.updateBookUpdatedBy = (bookID, last_updated_by) => {
    return db.query("UPDATE book SET last_updated_by = ? WHERE bookID = ?", [last_updated_by, bookID])
}