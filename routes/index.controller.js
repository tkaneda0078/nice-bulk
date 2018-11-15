'use strict'

const express = require('express')
const multer  = require('multer')
const upload = multer({dest: '../uploads'})
const router = express.Router()
const CustomVision = require('../models/custom-vision')

router.get('/', (req, res) => {
  res.render('index')
})

/**
 * 画像認識
 */
router.post('/image-recognition', upload.single('image-model'), (req, res) => {
  const cv = new CustomVision()
  cv.setImageModel(req.file.path)
  let result = cv.execute()
})

module.exports = router