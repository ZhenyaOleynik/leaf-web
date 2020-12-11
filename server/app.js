const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const bcrypt = require('bcrypt')

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')

dotenv.config({ path: './.env' })

const PORT = process.env.PORT || 5000

const db = require('./db')

const app = express()

app.use('/public/avatars', express.static('public/avatars'))

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000')

    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE')

    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')

    res.header('Access-Control-Allow-Credentials', true)

    next()
})


app.use(express.json())

app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'PUT, POST, DELETE'],
    credentials: true
}))
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({
    key: 'userId',
    secret: process.env.SESSION_SECRET,
    name: process.env.SESSION_NAME,
    resave: true,
    saveUninitialized: false,
    cookie: {
        expires: new Date(Date.now() + 3600000/*1 hour*/)
    }
}))

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/users', require('./routes/users.routes'))
app.use('/api/files', require('./routes/files.routes'))

app.listen(PORT, () => console.log('Server started on port ' + PORT + '...'))
