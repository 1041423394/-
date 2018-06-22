var common = {
  // 提示工具
  TIP: {
    showErrMsg: function (pageObj, errmsg) {
      pageObj.setData({
        tips:{
          hiddenErrmsg: false,
          errmsg: errmsg
        }
        
      })
      //3秒后关闭
      setTimeout(this.returnCloseErrMsg(pageObj), 3000)
    },
    closeErrMsg: function (pageObj) {
      pageObj.setData({
        tips:{
          hiddenErrmsg: true,
          errmsg: ''
        }
      })
    },
    returnCloseErrMsg: function (pageObj) {
      var self = this
      return function () {
        self.closeErrMsg(pageObj)
      }
    }
  },
  // 验证手机号
  verifyMobile: function (pageObj) {
    if (pageObj.data.mobile == '') {
      this.TIP.showErrMsg(pageObj, '请填写手机号码')
      return false
    }
    var re = /^1\d{10}/g
    if (!re.test(pageObj.data.mobile)) {
      this.TIP.showErrMsg(pageObj, '手机号码格式不正确')
      return false
    }
    return true
  }
}
module.exports = common