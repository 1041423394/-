let fml = require('fmlService.js');
let openid = wx.getStorageSync('openid') ? wx.getStorageSync('openid') : 'o3WtG4zxnhEMU_Cw8oYwV8NsphwI';
/**
 * @param {object} Interface 各接口地址
 * @param {string} answerRight 答对题数的接口
 */
let Interface = {
  'answerRight': 'question/answer-questions'
};
let answerRight = function (obj) {
  return new Promise(function (resolve, reject) {
    fml.request({
      header: {
        'open-id': openid
      },
      url: Interface.answerRight,
      data: obj.params,
      method: 'POST',
      success: function (res) {
        resolve(res)
      }
    })
  })
}
module.exports = {
  answerRight: answerRight
}