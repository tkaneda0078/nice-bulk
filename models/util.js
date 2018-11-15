'use strict'

class Util {

  constructor() {}

  /**
   * 少数をパーセントに変換する
   *
   */
  static formatSmallNumPercent (num) {
    return Math.floor(num * 10000) / 100
  }

}

module.exports = Util