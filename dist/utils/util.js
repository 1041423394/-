var regeneratorRuntime = require("../lib/runtime.js");'use strict';

var app = getApp();
var common = {
    // 弹窗
    showModal: function showModal(content) {
        var wxShowModal = app.wxPromisify(wx.showModal);
        wxShowModal({
            title: app.globalData.projectName,
            content: content,
            showCancel: false,
            confirmText: '好的'
        });
    },

    // 获取当前位置
    getLocation: function getLocation() {
        var wxGetLocation = this.wxPromisify(wx.getLocation);
        wxGetLocation().then(function (res) {
            var location = {
                lat: res.latitude,
                lng: res.longitude
            };
            return location;
        });
    },

    //根据时间戳获取时间对象
    getLocalTime: function getLocalTime(nS) {
        return new Date(parseInt(nS));
    },
    //字符串补足位数
    strPad: function strPad(str, length, pad_str, pad_type) {
        var str = str.toString();
        if (!length) {
            length = 2;
        }
        if (!pad_str) {
            pad_str = '0';
        }
        if (!pad_type) {
            pad_type = 'left';
        }

        var length_pad = length - str.length;
        switch (pad_type) {
            case 'left':
                for (var index = 0; index < length_pad; index++) {
                    str = pad_str + str;
                }
                break;

            case 'right':
                for (var index = 0; index < length_pad; index++) {
                    str = str + pad_str;
                }
                break;
        }
        return str;
    },
    // 提示工具
    TIP: {
        showErrMsg: function showErrMsg(pageObj, errmsg) {
            pageObj.setData({
                tips: {
                    hiddenErrmsg: false,
                    errmsg: errmsg
                }

            });
            //3秒后关闭
            setTimeout(this.returnCloseErrMsg(pageObj), 3000);
        },
        closeErrMsg: function closeErrMsg(pageObj) {
            pageObj.setData({
                tips: {
                    hiddenErrmsg: true,
                    errmsg: ''
                }
            });
        },
        returnCloseErrMsg: function returnCloseErrMsg(pageObj) {
            var self = this;
            return function () {
                self.closeErrMsg(pageObj);
            };
        }
    },
    // 验证手机号
    verifyMobile: function verifyMobile(pageObj) {
        if (pageObj.data.mobile == '') {
            this.TIP.showErrMsg(pageObj, '请填写手机号码');
            return false;
        }
        var re = /^1\d{10}/g;
        if (!re.test(pageObj.data.mobile)) {
            this.TIP.showErrMsg(pageObj, '手机号码格式不正确');
            return false;
        }
        return true;
    },
    // 保存图片到本地相册
    savePhoto: function savePhoto(canvasId, pageObj) {
        var wxCanvasToTempFilePath = app.wxPromisify(wx.canvasToTempFilePath);
        var wxSaveImageToPhotosAlbum = app.wxPromisify(wx.saveImageToPhotosAlbum);
        wxCanvasToTempFilePath({
            canvasId: canvasId
        }, this).then(function (res) {
            return wxSaveImageToPhotosAlbum({
                filePath: res.tempFilePath
            });
        }, function (err) {
            pageObj.setData({
                saveStatus: true
            });
            wx.getSetting({
                success: function success(res) {
                    if (!res.authSetting['scope.writePhotosAlbum']) {
                        wx.openSetting({
                            success: function success(res) {
                                wx.showModal({
                                    title: app.globalData.projectName,
                                    content: '如未提示保存成功，请重新点击保存',
                                    showCancel: false,
                                    confirmText: '知道了'

                                });
                            },
                            fail: function fail() {
                                wx.showModal({
                                    title: app.globalData.projectName,
                                    content: '海报保存失败，请重新尝试',
                                    showCancel: false,
                                    confirmText: '知道了'
                                });
                            }
                        });
                    }
                }
            });
        }).then(function (res) {
            pageObj.setData({
                saveStatus: true
            });
            wx.hideLoading();
            wx.showModal({
                title: app.globalData.projectName,
                content: '图片已保存至系统相册了',
                showCancel: false,
                confirmText: '知道了'

            });
        }, function (err) {
            pageObj.setData({
                saveStatus: true
            });
            wx.showModal({
                title: app.globalData.projectName,
                content: '图片保存失败',
                showCancel: false,
                confirmText: '知道了'
            });
        });
    },
    // 隐藏
    setHidden: function setHidden(pageObj, timer) {
        setTimeout(function () {
            pageObj.setData({
                booking_time_hidden: true
            });
        }, timer);
    },
    formatTime: function formatTime(date) {
        // + ' ' + [hour, minute, second].map(formatNumber).join(':')
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        // const hour = date.getHours()
        // const minute = date.getMinutes()
        // const second = date.getSeconds()

        return [year, month, day].map(common.formatNumber).join('-');
    },

    formatNumber: function formatNumber(n) {
        n = n.toString();
        return n[1] ? n : '0' + n;
    },
    compareTime: function compareTime(nowD, otherD) {
        return new Date(nowD.replace(/-/g, "\/")) > new Date(otherD.replace(/-/g, "\/"));
    }

};
module.exports = common;