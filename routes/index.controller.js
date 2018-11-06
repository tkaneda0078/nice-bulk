'use strict'

const express = require('express')
const multer  = require('multer')
const upload = multer({dest: '../uploads'})
const router = express.Router()
const ImageRecognition = require('../models/image-recognition')

router.get('/', (req, res) => {
  res.render('index')
})

/**
 * 画像認識
 */
router.post('/image-recognition', upload.single('image-model'), (req, res) => {
  const baseUrl = 'https://southcentralus.api.cognitive.microsoft.com/customvision/v2.0/Prediction/'
  const imgRec = new ImageRecognition(baseUrl)
  imgRec.setImageModel(req.file.path)
  imgRec.execute()
})

module.exports = router