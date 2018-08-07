var regeneratorRuntime = require("../../lib/runtime.js");'use strict';

var app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {},
  // 模块对应页面
  tapHandle: function tapHandle(e) {
    var src = e.currentTarget.dataset.src;
    wx.navigateTo({
      url: '../' + src + '/' + src
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function onLoad(options) {
    app.checkAuthLogin();
    console.log(options.nickName);
  },
  onShow: function onShow() {},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function onReady() {},
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function onHide() {},
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function onUnload() {},
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function onPullDownRefresh() {},
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function onReachBottom() {},
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function onShareAppMessage() {
    var userName = wx.getStorageSync('userInfo').nickName;
    return {
      title: '小程序常用组件二次封装，开箱即用',
      path: '/pages/index/index?nickName=' + userName,
      imageUrl: '../../images/indexShare.png'
    };
  }
});