'use strict'

const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.render('index')
})

router.get('/image-recognition', (req, res) => {
  res.render('index')
})

module.exports = router