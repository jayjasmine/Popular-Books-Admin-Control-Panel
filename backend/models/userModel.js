//access the database connection from database.js
const db = require("../database")

module.exports.getAllUsers = () => {
    return db.query("SELECT userID, username, accessRights FROM users");
}

module.exports.createNewUser = (username, password, accessRights) => {
    return db.query("call createUser(?,?,?)", [username, password, accessRights])
}

module.exports.deleteUser = (userID) => {
    return db.query("call deleteUser(?)", [userID])
}

module.exports.getUserByUsername = (username) => {
    return db.query("SELECT * FROM users WHERE username = ?", [username]);
}
module.exports.getUserById = (userID) => {
    return db.query("SELECT * FROM users WHERE userID = ?", [userID]);
}
module.exports.updateUser = (userID, username, password, accessRights) => {
    return db.query("UPDATE users SET username = ?, password = ?, accessRights = ? WHERE userID = ?",
        [username, password, accessRights, userID])
}