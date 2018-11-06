'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
require('dotenv').config()

const app = express()

const index = require('./routes/index.controller')

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// public engine setup
app.use(express.static(__dirname + '/public'))

// routes engine setup
app.use('/', index)

app.listen(process.env.PORT || 3000, () =>
  console.log('Server connected'))