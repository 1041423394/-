var regeneratorRuntime = require("../../lib/runtime.js");'use strict';

var app = getApp();
var common = require('../../utils/util.js');
var timer = null;
var count = 0;
var allTime = 161; //音乐总时长
Page({
    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {},
        playMusic: false,
        progress: 0,
        loop: true, //是否是循环播放
        tips: {
            hiddenErrmsg: true,
            errmsg: ''
        }

    },
    // 播放音乐
    playMusic: function playMusic(e) {
        app.stopMusice();
        this.setData({
            playMusic: true
        });
        this.interval();
    },

    // 暂停音乐
    pauseMusic: function pauseMusic(e) {
        app.autoPlay();
        clearInterval(timer);
        this.setData({
            playMusic: false
        });
    },

    // 播发完毕
    endMusic: function endMusic(e) {
        app.autoPlay();

        clearInterval(timer);
        count = 0;
        this.setData({
            playMusic: false,
            progress: 0
        });
    },

    // 播放出错
    errMusic: function errMusic(e) {
        app.autoPlay();
        clearInterval(timer);
        var error = '';
        var errcode = e.detail.errMsg;
        common.TIP.showErrMsg(this, errcode);
    },

    // 循环时间
    interval: function interval() {
        clearInterval(timer);
        var that = this;
        var progress = 0;
        timer = setInterval(function () {
            count++;
            progress = count / allTime * 100;
            that.setData({
                progress: progress
            });
            if (count >= allTime) {
                clearInterval(timer);
                count = 0;
                that.setData({
                    progress: 0
                });
                if (that.data.loop) {
                    that.interval(); //循环播放事件
                }
            }
        }, 1000);
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function onLoad(options) {
        var wxUser = wx.getStorageSync('wxUser');
        this.setData({
            userInfo: wxUser
        });
        if (!wx.getStorageSync('audioPlay')) {
            app.autoPlay();
        }
    },
    onShow: function onShow() {
        count = 0;
        this.setData({
            progress: 0
        });
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function onReady() {},
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function onHide() {
        wx.setStorageSync('audioPlay', false);
    },
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function onUnload() {
        wx.setStorageSync('audioPlay', false);
    },
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
    onShareAppMessage: function onShareAppMessage() {}
});