'use strict'

const express = require('express')
const router = express.Router()
const session = require('express-session')
const multer = require('multer')
const upload = multer({dest: '../uploads'})
const CustomVision = require('../models/custom-vision')

// session setting
router.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  cookie: {}
}))

router.get('/', (req, res) => {
  req.session.destroy()
  res.render('index')
})

/**
 * 画像認識
 */
router.post('/image-recognition', upload.single('image-model'), async (req, res) => {
  try {
    let data = []
    if (req.session.result) {
       data['result'] = req.session.result
    } else {
      const cv = new CustomVision()
      await cv.setImageModel(req.file.path)
      // 画像認識
      data['result'] = await cv.recognizeImage()
      req.session.result = data['result']
    }

    res.render('index', data)
  } catch (e) {
    console.log(e)
  }
})

module.exports = router