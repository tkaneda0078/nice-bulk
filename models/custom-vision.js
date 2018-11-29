'use strict'

const rp = require('request-promise')
const fs = require('fs')
const util = require('./util')

class CustomVision {

  /**
   * constructor
   *
   */
  constructor () {
    this._apiUrl = 'https://southcentralus.api.cognitive.microsoft.com/customvision/v2.0/Prediction/'
    this._apiUrl += process.env.PROJECT_ID
    this._apiUrl += '/image?iterationId=' + process.env.ITERATION_ID

    this._options = {
      'method' : 'POST',
      'url'    : this._apiUrl,
      'headers': {
        'Prediction-Key': process.env.PREDICTION_KEY,
        'Content-Type'  : 'application/octet-stream'
      }
    }
  }

  /**
   * アップロード画像を設定
   *
   */
  async setImageModel (imagePath) {
    this._options.body = fs.createReadStream(imagePath)
  }

  /**
   * 画像認識
   *
   * @return int result 認識結果
   */
  async recognizeImage () {
    const response = await rp.post(this._options)
    const data = JSON.parse(response)
    // 判定結果の数値を整形する
    return util.formatSmallNumPercent(data.predictions[0].probability)
  }

}

module.exports = CustomVision