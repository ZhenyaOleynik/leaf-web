const { Router } = require('express')
const dotenv = require('dotenv')
const router = Router()
const multer = require('multer')

dotenv.config({ path: '../.env' })

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/avatars/')
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`)
    }
})

const upload = multer({ storage: storage }).single("file")

router.post('/uploadImage', (req, res) => {

    upload(req, res, (err) => {
        if (err) {
            return res.json({ success: false, err })
        }
        return res.json({ success: true, url: res.req.file.path })

    })
})

module.exports = router