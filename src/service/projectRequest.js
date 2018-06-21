let fml = require('fmlService.js')
let openid = wx.getStorageSync('openid') ? wx.getStorageSync('openid') : 'o3WtG4zxnhEMU_Cw8oYwV8NsphwI'
/**
 * @param {object} Interface 各接口地址
 * @param {string} answerRight 答对题数的接口
 * @param {string} getOpenId 获取用户openid
 */
let Interface = {
  'answerRight': 'question/answer-questions',
  'getOpenId':'common/init'
}

let answerRight =function (obj) {
  return  fml.request({
    header: {
      'open-id': openid
    },
    url: Interface.answerRight,
    data: obj.params,
    method: 'POST'
  })
}

let getOpenId =function (obj) {
  return  fml.request({
    header: {
      'open-id': openid
    },
    url: Interface.getOpenId,
    data: obj.params,
    method: 'POST'
  })
}

module.exports = {
  answerRight: answerRight,
  getOpenId:getOpenId
}