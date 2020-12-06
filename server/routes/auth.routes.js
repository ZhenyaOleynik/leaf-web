const { Router } = require('express')
const router = Router()

const db = require('../db')

router.post('/register', (req, res) => {
    try {

        const { first_name, last_name, login, password } = req.body

        const query_insert_in_users = "INSERT INTO `users` (`id`, `login`, `first_name`, `last_name`, `password`, `photo`, `role_id`) VALUES (NULL, ?, ?, ?, ?, ?, ?)"
        const query_insert_in_roles = "INSERT INTO `roles` (`id`, `title`) VALUES (?, ?)"

        db.query(query_insert_in_users,
            [login, first_name, last_name, password, 'photo', 1],
            (err, result) => {
                if (err) {
                    console.log(err)
                }
                else {
                    console.log(result)
                    db.query(query_insert_in_roles,
                        [result.insertId, login === 'admin' ? 'admin' : 'user'],
                        (err) => {
                            if (err)
                                console.log(err)
                            else
                                res.status(200).json({ msg: 'registred' })
                        }
                    )
                }
            })

    } catch (error) {
        return res.status(500).json({ error })
    }
})


router.post('/login', (req, res) => {

    try {
        const { login, password } = req.body

        db.query('SELECT * FROM users WHERE login = ?', [login], (err, result, fields) => {
            if (result.length > 0) {
                if (result[0].password === password) {
                    req.session.userId = result[0].id
                }
            }

            if (req.session.userId) {
                return res.status(200).json({ auth: true })
            } else {
                return res.status(200).json({ auth: false })
            }

        })

    } catch (error) {
        return res.status(500).json({ error: error })
    }


})

router.get('/isAuth', (req, res) => {

    //   res.status(200).json({ auth: true })

    console.log(req.session.userId)

    if (req.session.userId)
        res.status(200).json({ auth: true })
    else
        res.status(200).json({ auth: false })
})


module.exports = router