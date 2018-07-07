var regeneratorRuntime = require("../../lib/runtime.js");'use strict';

var app = getApp();
var projectService = require('../../service/projectRequest.js');
var common = require('../../utils/util.js');
Page({
    /**
     * 页面的初始数据
     * @param {number} angle 头像运动角度
     * @param {boolean} canIUse 是否支持用button.open-type的形式获取用户信息
     * @param {object}  dialog 版本兼容弹窗相关信息
     */
    data: {
        angle: 0, //
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        dialog: {
            closeStyle: '',
            icon: 'icon-sorry',
            title: '微信版本过低',
            info: '请前往微信更新微信版本至最新，风里雨里我们在这里等你回来。',
            btn: '好的'
        },
        tips: {
            hiddenErrmsg: true,
            errmsg: ''
        }
    },
    /**
     * button 调出用户信息授权 1.3.0基础库支持，这里不做低版本兼容处理
     */
    getUserInfo: function getUserInfo(e) {
        if (!e.detail.userInfo) {
            common.TIP.showErrMsg(this, '请允许微信授权');
            return;
        }
        wx.setStorageSync('wxUser', e.detail.userInfo);

        var userInfo = wx.getStorageSync('userInfo');
        if (userInfo) {
            wx.navigateBack();
            return;
        }

        // encryptedData此处就是为了获取uionid
        var param = {
            // nickName:e.detail.userInfo.nickName,
            // avatarUrl:e.detail.userInfo.avatarUrl,
            encryptedData: e.detail.encryptedData,
            iv: e.detail.iv,
            code: app.globalData.code
        };
        wx.showModal({
            title: 'wechat-frame',
            content: '正式接口删除此段代码',
            success: function success(res) {
                wx.navigateBack();
            }
        });
        return;

        app.checkSession(param, e.detail.userInfo);
    },
    /**
     * 关闭弹窗
     */
    closeDialog: function closeDialog() {
        wx.navigateBack({
            delta: 0
        });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function onLoad(options) {
        if (app.globalData.userInfo) {
            wx.redirectTo({
                url: '../index/index'
            });
        } else if (this.data.canIUse) {
            app.userInfoReadyCallback = function (res) {
                app.globalData.userInfo = res.userInfo;
                wx.setStorageSync('userInfo', res.userInfo);
            };
        }
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function onReady() {
        var that = this;
        wx.onAccelerometerChange(function (res) {
            var angle = -(res.x * 30).toFixed(1);
            if (angle > 14) {
                angle = 14;
            } else if (angle < -14) {
                angle = -14;
            }
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
    onShareAppMessage: function onShareAppMessage() {}
});