'use strict'

const rp = require('request-promise')
const fs = require('fs')

class ImageRecognition {

  constructor () {
    this.apiUrl = 'https://southcentralus.api.cognitive.microsoft.com/customvision/v2.0/Prediction/'
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

  /**
   * 認識実行
   *
   * todo 同期処理に修正
   */
  execute () {
    rp.post(this.options)
      .then((response) => {
        let data = JSON.parse(response)
        // 判定結果の数値を整形する
        let result = Math.floor(data.predictions[0].probability * 10000) / 100

        return result
      })
      .catch((err) => {
        console.log(err)
      })
  }

}

module.exports = ImageRecognition