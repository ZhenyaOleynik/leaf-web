const mysql = require('mysql2')
const dotenv = require('dotenv')

dotenv.config({ path: './.env' })

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB
})

db.connect(err => {
    if (err)
        console.log('Error: ' + err)
    else
        console.log('MYSQL Connected...')
})

module.exports = db

