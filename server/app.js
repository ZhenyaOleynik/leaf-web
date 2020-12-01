const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const bcrypt = require('bcrypt')

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')

const db = require('./db')

const app = express()

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST')

    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type')

    res.setHeader('Access-Control-Allow-Credentials', true)

    next()
})

const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST'],
    credentials: true
}))
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({
    key: 'userId',
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60 * 60 * 24
    }
}))

dotenv.config({ path: './.env' })

app.use('/api/auth', require('./routes/auth.routes'))

app.listen(PORT, () => console.log('Server started on port ' + PORT + '...'))
