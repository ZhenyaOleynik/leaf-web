const { Router } = require('express')
const dotenv = require('dotenv')
const router = Router()

const db = require('../db')

dotenv.config({ path: '../.env' })

router.get('/getAll', (req, res) => {

    const query = 'SELECT * FROM `users`'

    db.query(query, (err, result, fields) => {
        if (!err) {
            res.status(200).json(result)
        }
        else {
            res.status(500).json({ query: query, error: err })
        }
    })

})

router.get('/getCurrentUser', (req, res) => {

    const id = req.session.userId

    console.log(id)

    const query_select_data = 'SELECT * FROM `users` WHERE `id` = ?'
    const query_select_role = 'SELECT * FROM `roles` WHERE `id` = ?'

    db.query(query_select_data, [id], (err, result) => {
        if (err) {
            res.status(500).json({ err })
        }
        else {
            if (result.length === 0) {
                res.status(200).json(result)
            }
            else {
                db.query(query_select_role, [id], (err_final, result_final) => {
                    if (err_final) {
                        res.status(500).json({ err_final })
                    }
                    else {
                        result[0].title = result_final[0].title
                        res.status(200).json(result)
                    }
                })
            }
        }
    })


})

router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            res.status(500).json({ err })
        }
        else {
            res.clearCookie(process.env.SESSION_NAME)
            res.status(200).json({ msg: 'logout...' })
        }
    })
})

router.delete('/delete' + '/:id', (req, res) => {

    const id = req.params.id

    if (id == req.session.userId)
        return res.status(200).json({ msg: 'cannot delete yourself' })

    db.query('DELETE FROM `users` WHERE `id` = ?', [id], (err, result) => {
        if (err) {
            console.log('sql delete err: ' + err)
            res.status(500).json({ err })
        }
        res.status(200)
    })
})

router.put('/updateCurrent', (req, res) => {

    const id = req.session.userId
    const data = req.body.data

    console.log(1)

    const update_query = 'UPDATE `users` SET `first_name` = ?, `last_name` = ?, `login` = ?, `password` = ?, photo = ? WHERE `id` = ?'

    db.query(update_query,
        [data.first_name, data.last_name, data.login, data.password, data.photo, id],
        (err, result) => {
            if (err) {
                console.log('sql delete err: ' + err)
                res.status(500).json({ msg: err })
            }
            else res.status(200)
        })
})

module.exports = router