Page({
    /**
     * 页面的初始数据
     */
    data: {
    },
    /**
     * button 调出用户信息授权 1.3.0基础库支持，这里不做低版本兼容处理
     */
    getUserInfo: function(e) {
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo
      })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
  
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