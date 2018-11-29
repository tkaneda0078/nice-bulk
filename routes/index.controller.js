'use strict'

const express = require('express')
const router = express.Router()
const multer  = require('multer')
const upload = multer({dest: '../uploads'})
const CustomVision = require('../models/custom-vision')

router.get('/', (req, res) => {
  res.render('index')
})

/**
 * 画像認識
 */
router.post('/image-recognition', upload.single('image-model'), async (req, res) => {
  try {
    let data = []
    const cv = new CustomVision()
    await cv.setImageModel(req.file.path)
    // 画像認識
    data['result'] = await cv.recognizeImage()

    res.render('index', data)
  } catch (e) {
    console.log(e)
  }
})

module.exports = router