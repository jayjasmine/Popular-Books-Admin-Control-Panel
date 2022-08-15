const express = require("express")
const session = require("express-session")
const server = express()
const port = 8080


// Enable middleware for JSON and urlencoded form data
//helps server undersdtand json data
server.use(express.json())
server.use(express.urlencoded({
    extended: true
}))


//enable session middleware so that we have state!
server.use(session({
    secret: "secret phrase abc123",
    resave: false,
    saveUninitialized: false,
    //not using https
    cookie: {
        secure: false
    }

}))

//access control middleware

server.use((req, res, next) => {
    // The user is logged in if they hae session data
    let userLoggedIn = req.session.user != null

    // define a list of allowed ULs for non-logged in users
    let allowedURLs = [
        "/login.html",
        "/js/login.js",
        "/css/styles.css",
        "/api/users/login",
        "/header.html",
        "/js/header.js"
    ]
    // if the user is logged in
    if (userLoggedIn) {
        //let them through
        next() //next middleware, or step in the pipeline

    } else {
        // Else (they are not logged in)
        // Check if the url they want is allowed
        if (allowedURLs.includes(req.originalUrl)) {
            // Allow the guest user through
            next()
        } else {
            // if not allowed - redirect to the login page
            res.redirect("/login.html")
        }
    }
}) //gatekeeper


//serve static frontend resources after middleware
server.use(express.static("frontend"))

// Link up book controller
const bookController = require("./backend/controllers/bookController")
server.use("/api", bookController)
// // Link up user controller
const userController = require("./backend/controllers/userController")
server.use("/api", userController)

// Link up the author controller
const authorController = require("./backend/controllers/authorController")
server.use("/api", authorController)

// Link up the covers controller
const coversController = require("./backend/controllers/coversController")
server.use("/api", coversController)

//Start the express server
server.listen(port, () => {
    console.log("Server listening on  http://localhost:" + port)
})