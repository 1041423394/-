var regeneratorRuntime = require("../../lib/runtime.js");"use strict";

var regeneratorRuntime = require("../../lib/runtime.js");
"use strict";
var app = getApp();
var common = require('../../utils/util.js');

Page({
    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {},
        hiddenCanvas: true, //隐藏canvas
        saveStatus: true //防止多次重复保存
    },
    // 绘制保存的图片
    drawPhoto: function drawPhoto(bg, logo) {
        var that = this;
        that.setData({
            hiddenCanvas: false
        });
        var ctx = wx.createCanvasContext('shareCanvas');
        var canvasId = 'shareCanvas';
        // 底图
        ctx.drawImage(bg, 0, 0, 354, 474);

        // 用户头像
        ctx.save();
        ctx.arc((354 - 80) / 2 + 40, 60, 40, 0, 2 * Math.PI);
        ctx.clip();
        ctx.drawImage(logo, (354 - 80) / 2, 20, 80, 80);
        ctx.restore();
        ctx.strokeStyle = 'rgba(255,255,255,0)';
        // 昵称

        ctx.setTextAlign('center');
        ctx.setFillStyle('#F3AD39');
        ctx.setFontSize(21);
        ctx.fillText(that.data.userInfo.nickName, 354 / 2, 125);
        // 段位
        ctx.lineJoin = "round";
        ctx.lineWidth = 10;
        ctx.fillStyle = "rgba(255,255,255,0.74)";
        ctx.fillRect(26, 140, 300, 176);

        ctx.setFontSize(32);
        ctx.setFillStyle('#232323');
        ctx.shadowColor = 'rgba(255,255,255,0.5)';
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 4;
        ctx.shadowBlur = 10;
        ctx.fillText('wechat-frame', 354 / 2, 180);

        ctx.setFillStyle('#FFD700');
        ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 4;
        ctx.shadowBlur = 10;
        ctx.fillText('Author：fengml', 354 / 2, 222);

        //结果 
        ctx.setFillStyle('#333');
        ctx.setFontSize(18);
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowBlur = 0;
        ctx.setTextAlign('left');
        ctx.fillText('读书明理做人不作秀，登科治国做', 40, 265);
        ctx.fillText('事不做官', 40, 295);

        ctx.stroke();

        ctx.draw(true, function () {
            that.setData({
                hiddenCanvas: true
            });
            common.savePhoto(canvasId, that);
        });
    },

    // 点击保存
    saveHandle: function saveHandle() {
        if (!this.data.saveStatus) {
            return;
        }
        wx.showLoading({
            title: '海报生成中。。。'
        });
        this.data.saveStatus = false;
        var that = this;
        var getImageInfo = app.wxPromisify(wx.getImageInfo);
        Promise.all([getImageInfo({ src: 'https://wechat.fmlcoder.com/images/share.png' }), getImageInfo({ src: that.data.userInfo.avatarUrl })]).then(function (result) {
            that.drawPhoto(result[0].path, result[1].path);
        }).catch(function (error) {
            console.log(error);
        });
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function onLoad(options) {
        var wxUser = wx.getStorageSync('wxUser');
        this.setData({
            userInfo: wxUser
        });
    },
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
    onShareAppMessage: function onShareAppMessage() {}
});