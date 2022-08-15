const express = require("express")
//Access password hashing
const bcrypt = require("bcrypt")
const validator = require("validator")
const router = express.Router()
const userModel = require("../models/userModel")


//Define a /api/user endpoint that responds with an array of all user.
router.get("/users", (req, res) => {
    userModel.getAllUsers()
        .then((result) => {
            res.status(200).json(result)
        })
        .catch((error) => {
            // log any errors to he node console
            console.log(error)
            res.status(500).json("query error")
        })
})

//api endpoint to get user by id
router.get("/users/:id", (req, res) => {
    userModel.getUserById(req.params.id)
        .then((results) => {
            if (results.length > 0) {
                res.status(200).json(results[0])
            } else {
                res.status(404).json("failed to get user by id")
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json("failed to get user - query error")
        })
})

//api endpoint to create user
router.post("/users/create", (req, res) => {
    //cheack if user is admin
    if (req.session.user.accessRights != "admin") {
        // Send error message if not admin
        res.status(403).json("admin only action")
        //stop the response 
        return;
    }
    //if user is admin, continue response...
    let user = req.body

    //get password from create user form and Hash it before insterting into the DB
    let hashedPassword = bcrypt.hashSync(user.password, 6)

    userModel.createNewUser(
            validator.escape(user.username),
            hashedPassword, //store the hashed password
            validator.escape(user.accessRights)
        )
        .then((result) => {
            res.status(200).json("user created!")
        })
        .catch((error) => {
            res.status(500).json("query error - failed to create user")
        })
})

//delete user controller
router.delete("/users/delete/:id", (req, res) => {
    //admin only check
    if (req.session.user.accessRights != "admin") {
        res.status(403).json("admin only action")
        //stop the response handler
        return;
    }
    //Continue response if admin...

    //ask the model to delete the user with userID
    userModel.deleteUser(
            //sanitize input
            validator.escape(req.params.id)
        )
        .then((result) => {
            //if DB returns affected rows > 0, respond with 200, else respond with not found
            if (result.affectedRows > 0) {
                res.status(200).json("user deleted")
            } else {
                res.status(404).json("user not found")
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json("failed to delete user – query error")
        })
})

//log in user controller
router.post("/users/login", (req, res) => {
    //get login form data
    let login = req.body
    //find user with a matching username
    userModel.getUserByUsername(
        validator.escape(login.username)
        )
        .then((results) => {
            //Results returns an array, if its length is greater than 0, we found a user
            if (results.length > 0) {
                // Get the found user
                let user = results[0] //grab the first one, users are unique

                //verify password with bcrypt hashing module
                if (bcrypt.compareSync(login.password, user.password)) { //compares log password with fingerprint of stored password to see if it matches
                    //user is now authenticated

                    //set up the session
                    req.session.user = {
                        userID: user.userID,
                        username: user.username,
                        accessRights: user.accessRights
                    }
                    // let the client know that login was successful
                    res.status(200).json("login successful")
                } else {
                    // If the password was incorrect
                    res.status(401).json("login failed")

                }
            } else {
                // If the username doesn't exist
                res.status(401).json("login failed")
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json("failed to login - query error")
        })
})


//logout controller 
router.post("/users/logout", (req, res) => {
    //destroy the session 
    req.session.destroy()
    res.status(200).json("logged out")
})


//user update endpoint
router.post("/users/update", (req, res) => {
    //Admin checkm if not, stop it here
    if (req.session.user.accessRights != "admin") {
        // Send error message
        res.status(403).json("admin only action")
        //stop the response handler
        return;
    }
    //continue response if admin...

    let user = req.body

    //store user password
    let hashedPassword = user.password
    //hashing starts with $, if it doesn't start with $ then hash it to a factor of 6
    if (!user.password.startsWith("$")) {
        hashedPassword = bcrypt.hashSync(user.password, 6)
    }

    userModel.updateUser(
            validator.escape(user.userID),
            validator.escape(user.username),
            hashedPassword, //used hashed password
            validator.escape(user.accessRights)
        )
        .then((result) => {
            if (result.affectedRows > 0) {
                res.status(200).json("user updated")
            } else {
                res.status(404).json("user not found")
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json("failed to get user – query error")
        })
})


//This allows the server.js to import(require) the routes defined in this fiels
module.exports = router