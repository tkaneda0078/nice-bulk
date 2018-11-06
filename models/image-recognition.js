'use strict'

const rp = require('request-promise')
const fs = require('fs')

class ImageRecognition {

  constructor (baseUrl) {
    this.apiUrl = baseUrl
    this.apiUrl += process.env.PROJECT_ID
    this.apiUrl += '/image?iterationId=' + process.env.ITERATION_ID

    this.options = {
      'method' : 'POST',
      'url'    : this.apiUrl,
      'headers': {
        'Prediction-Key': process.env.PREDICTION_KEY,
        'Content-Type'  : 'application/octet-stream'
      }
    }
  }

  /**
   * アップロード画像を設定
   */
  setImageModel (imagePath) {
    this.options.body = fs.createReadStream(imagePath)
  }

  execute () {
    rp.post(this.options)
      .then((response) => {
        console.log(JSON.parse(response))
      })
      .catch((err) => {
        console.log(err)
      })
  }

}

module.exports = ImageRecognition