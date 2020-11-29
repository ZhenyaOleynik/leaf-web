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

app.use('/api/auth', require('./routes/auth.routes'))

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

app.post('/login', (req, res) => {
    try {
        const { login, password } = req.body

        db.query('SELECT * FROM users WHERE login = ?', [login], (err, result, fields) => {
            if (result.length > 0) {
                if (result[0].password === password) {
                    req.session.Auth = true
                }
            }

            if (req.session.Auth) {
                return res.status(200).json({ auth: true })
            } else {
                return res.status(200).json({ auth: false })
            }

        })

    } catch (error) {
        return res.status(500).json({ error: err })
    }
})

app.post('/register', (req, res) => {

    try {

        const { first_name, last_name, login, password } = req.body

        const query = "INSERT INTO `users` (`id`, `login`, `first_name`, `last_name`, `password`, `photo`, `role_id`) VALUES (NULL, ?, ?, ?, ?, ?, ?)"

        db.query(query,
            [login, first_name, last_name, password, 'photo', 1],
            (err, result) => {
                if (err)
                    console.log(err)
                else
                    console.log('registred')
            })

    } catch (error) {
        return res.status(500).json({ error: err })
    }

})

app.get('/auth', (req, res) => {

    console.log(req.session.Auth)

    if (req.session.Auth)
        res.status(200).json({ auth: true })
    else
        res.status(200).json({ auth: false })
})

app.get('/', (req, res) => {
    res.send('<h1>Home page</h1>')
})

app.listen(PORT, () => console.log('Server started on port ' + PORT + '...'))

