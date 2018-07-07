var regeneratorRuntime = require("../../lib/runtime.js");'use strict';

var uploadOss = require('../../lib/uploadAliyun.js');
var common = require('../../utils/util.js');
var app = getApp();
Page({
    /**
     * 页面的初始数据
     */
    data: {
        imageArray: [],
        tips: {
            hiddenErrmsg: true,
            errmsg: ''
        }
    },
    // 添加图片
    chooseImage: function chooseImage() {
        var _this = this;
        var wxChooseImage = app.wxPromisify(wx.chooseImage);
        wxChooseImage({ count: 6 }).then(function (res) {
            var tempFilePath = res.tempFilePaths;
            _this.setData({
                imageArray: tempFilePath
            });
        });
    },

    // 预览图片
    previewImage: function previewImage(e) {
        var _this = this;
        var src = e.currentTarget.dataset.src;
        wx.previewImage({
            urls: _this.data.imageArray,
            current: src
        });
    },

    // 删除图片
    delImage: function delImage(e) {
        var index = e.currentTarget.dataset.index;
        this.data.imageArray.splice(index, 1);
        this.setData({
            imageArray: this.data.imageArray
        });
    },

    // 上传
    uploadHandle: function uploadHandle() {
        var _this2 = this;

        console.log(this.data.imageArray.length);
        if (this.data.imageArray.length <= 0) {
            common.TIP.showErrMsg(this, '请先选择上传的图片');
            return;
        }
        var imageArray = this.data.imageArray;
        imageArray.forEach(function (temp, index) {
            _this2.uploadFile(temp, index);
        });
    },


    //上传阿里云
    uploadFile: function uploadFile(data, length) {
        wx.showLoading({
            title: '数据传送中...',
            mask: true
        });
        var _this = this;
        var wxRequest = app.wxPromisify(wx.request);
        wxRequest({
            data: {
                'dir': 'voice/' //上传的文件路径
            },
            method: 'POST',
            url: '' //后台换取阿里oss 凭证接口
        }).then(function (res) {
            uploadOss({
                filePath: data,
                dir: 'voice/', //上传的文件路径
                accessid: res.data.accessid,
                signature: res.data.signature,
                policy: res.data.policy,
                success: function success(res) {
                    // 如果多个文件同时操作，等所有图片上传完毕的操作下方的
                    if (that.data.imageArray.length - 1 == length) {
                        wx.hideLoading();
                        console.log(res); //上传成功返回的oss返回的值，作为传给自己服务器的参数值
                    }
                },
                fail: function fail(err) {
                    common.TIP.showErrMsg(_this, '上传阿里oss失败');
                }
            });
        }, function (err) {
            common.TIP.showErrMsg(_this, '获取凭证失败');
        });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function onLoad(options) {},

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