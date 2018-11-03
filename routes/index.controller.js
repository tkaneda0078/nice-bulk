'use strict'

const express = require('express')
const multer  = require('multer')
const upload = multer({dest: './uploads/'})
const router = express.Router()

router.get('/', (req, res) => {
  res.render('index')
})

/**
 * 画像認識
 */
router.post('/image-recognition', upload.single('image-model'), (req, res) => {
  console.log(req.file)
})

module.exports = router