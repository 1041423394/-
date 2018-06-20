var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    angle: 0,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  /**
   * button 调出用户信息授权 1.3.0基础库支持，这里不做低版本兼容处理
   */
  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    wx.setStorageSync('userInfo', e.detail.userInfo)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      wx.redirectTo({
        url: '../index/index'
      })
    } else{
      app.userInfoReadyCallback = res => {
        app.globalData.userInfo = res.userInfo
        wx.setStorageSync('userInfo', res.userInfo)
      }
    } 
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.onAccelerometerChange(function (res) {
      var angle = -(res.x * 30).toFixed(1);
      if (angle > 14) { angle = 14; }
      else if (angle < -14) { angle = -14; }
      if (that.data.angle !== angle) {
        that.setData({
          angle: angle
        });
      }
    });
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})