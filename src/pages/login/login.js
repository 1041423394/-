let app = getApp()
let projectService=require('../../service/projectRequest.js')
Page({
  /**
   * 页面的初始数据
   * @param {number} angle 头像运动角度
   * @param {boolean} canIUse 是否支持用button.open-type的形式获取用户信息
   * @param {object}  dialog 版本兼容弹窗相关信息
   */
  data: {
    angle: 0,//
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    dialog:{
      closeStyle:'',
      icon:'icon-sorry',
      title:'微信版本过低',
      info:'请前往微信更新微信版本至最新，风里雨里我们在这里等你回来。',
      btn:'好的'

    }
  },
  /**
   * button 调出用户信息授权 1.3.0基础库支持，这里不做低版本兼容处理
   */
  getUserInfo: function (e) {
    let userInfo=wx.getStorageSync('userInfo')
    app.globalData.userInfo = e.detail.userInfo

    if(userInfo)return
    wx.checkSession({
      success:()=>{
        let param={
          encryptedData:e.detail.encryptedData,
          iv:e.detail.iv,
          code:app.globalData.code
        }
        let result=projectService.getOpenId({params:param})
        wx.setStorageSync('userInfo', e.detail.userInfo)
      },
      fail:()=>{
        
      }
    })
   
  },
  /**
   * 关闭弹窗
   */
  closeDialog:()=>{
    wx.navigateBack()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      wx.redirectTo({
        url: '../index/index'
      })
    } else if(this.data.canIUse){
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