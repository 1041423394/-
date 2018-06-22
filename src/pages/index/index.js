Page({
  /**
   * 页面的初始数据
   */
  data: {
  },
  // 模块对应页面
  taohandle:function (e){
    let src=e.curretTarget.dataset.src
    wx.navigateTo({
      url: './'+src+'/'+src
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
    return {
      title: '小程序常用组件二次封装，开箱即用',
      path: '/page/index/index',
      imageUrl:'../../images/indexShare.png'
    }
  }
})

