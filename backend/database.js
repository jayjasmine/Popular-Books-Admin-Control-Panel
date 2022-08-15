// input the myssql 2 module so that we can talk to the database
const mysql = require("mysql2");

//create a connection to the database
const connection = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "popularbooks",
    //set timezone so date is correct
    timezone: 'utc'
})

const query = (sql, parameters) => {
    return new Promise((resolve, reject) => {
        connection.query(sql, parameters, (error, results) => {
            if (error) {
                reject(error)
            } else {
                resolve(results)
            }
        })
    })
}

//export the new query function so that othe models can use it 
module.exports = {
    query
}