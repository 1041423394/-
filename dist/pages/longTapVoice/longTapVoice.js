var regeneratorRuntime = require("../../lib/runtime.js");'use strict';

var recorderManager = wx.getRecorderManager(); //录音
var innerAudioContext = wx.createInnerAudioContext(); //播放录音
var recordTimeInterval = null;
var common = require('../../utils/util.js');
var app = getApp();
var btnPos_x_min = 0;
var btnPos_x_max = 0;
var btnPos_y_min = 0;
var btnPos_y_max = 0;
var moveStatus = false; //手指移动是否超过安全范围

Page({
    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {},
        voiceStart: false, //是否开始录音，动画控制
        recordTime: 0, //录音时长
        progress: 0, //进度条
        duration: 60000, //录音时长（不可超过10分钟）
        readyVoice: false, //是否录音完成
        playVoice: false, //是否在播放录音
        tips: {
            hiddenErrmsg: true,
            errmsg: ''
        }
    },
    //录音
    recordVoice: function recordVoice(e) {
        var _this2 = this;

        // 格式化
        this.setData({
            voiceStart: false,
            recordTime: 0,
            progress: 0,
            readyVoice: false,
            playVoice: false
        });
        clearInterval(recordTimeInterval);
        var detail = e.currentTarget;
        this.initBtnPos(detail.offsetLeft, detail.offsetTop);
        wx.getSetting({
            success: function success(res) {
                if (!res.authSetting['scope.record']) {
                    wx.authorize({
                        scope: 'scope.record',
                        success: function success() {},
                        fail: function fail() {
                            return;
                        }
                    });
                }
            }
        });
        if (this.data.duration > 60000) {
            common.TIP.showErrMsg(_this, '录音时长最长不能超过10分钟');
            return;
        }
        var options = {
            duration: this.data.duration,
            sampleRate: 44100,
            numberOfChannels: 1,
            encodeBitRate: 192000,
            format: 'mp3', //音频格式
            frameSize: 50
        };

        recorderManager.onStart(function () {
            _this2.setData({
                voiceStart: true
            });
            wx.vibrateShort(); //手机震动 iPhone7以上及安卓机型有效

            _this2.interval();
        });
        recorderManager.start(options);
        recorderManager.onError(function (res) {
            clearInterval(recordTimeInterval);
            _this2.setData({
                voiceStart: false,
                playVoice: false
            });
            common.TIP.showErrMsg(_this2, '录音出错');
            recorderManager.stop();
        });
    },

    // 完成录音
    endVoice: function endVoice(e) {
        var _this3 = this;

        clearInterval(recordTimeInterval);
        if (!moveStatus) {
            recorderManager.stop();
            this.setData({
                voiceStart: false,
                recordTime: 0,
                progress: 0
            });
            common.TIP.showErrMsg(this, '录音取消');
            moveStatus = true;
            return;
        }
        recorderManager.onStop(function (res) {
            if (_this3.data.recordTime < 1) {
                _this3.setData({
                    readyVoice: false,
                    voiceStart: false
                });
                common.TIP.showErrMsg(_this3, '录音时间太短');
                clearInterval(recordTimeInterval);
                return;
            }
            _this3.setData({
                voiceStart: false,
                readyVoice: true,
                tempFilePath: res.tempFilePath,
                playTime: _this3.data.recordTime,
                playProgress: _this3.data.progress

            });
        });
        recorderManager.stop();
    },

    //  录音计时
    interval: function interval() {
        clearInterval(recordTimeInterval);
        var _this = this;
        recordTimeInterval = setInterval(function () {
            var recordTime = _this.data.recordTime += 1;
            var progress = Number(recordTime) * 1000 / _this.data.duration * 100;
            if (_this.data.recordTime >= _this.data.duration / 1000) {
                _this.setData({
                    voiceStart: false
                });
                if (!_this.data.playVoice) {
                    common.TIP.showErrMsg(_this, '录音时长不能超过60s');
                }
                clearInterval(recordTimeInterval);
            }
            _this.setData({
                recordTime: recordTime,
                progress: progress
            });
        }, 1000);
    },

    // 删除录音
    delVoice: function delVoice() {
        if (!this.data.tempFilePath) {
            common.TIP.showErrMsg(this, '请先完成长按录音');
            return;
        }
        clearInterval(recordTimeInterval);
        innerAudioContext.stop();
        this.setData({
            voiceStart: false,
            playVoice: false,
            recordTime: 0,
            progress: 0,
            readyVoice: false,
            tempFilePath: ''
        });
    },


    // 播放录音
    playVoice: function playVoice(e) {
        var _this4 = this;

        if (!this.data.tempFilePath) {
            common.TIP.showErrMsg(this, '请先完成长按录音');
            return;
        }
        var detail = e.currentTarget;

        innerAudioContext.src = this.data.tempFilePath;
        this.setData({
            voiceStart: true,
            recordTime: 0,
            progress: 0,
            playVoice: true
        });
        innerAudioContext.onPlay(function () {
            _this4.interval();
        });
        innerAudioContext.play();
        innerAudioContext.onEnded(function () {
            clearInterval(recordTimeInterval);
            _this4.setData({
                voiceStart: false,
                playVoice: false,
                readyVoice: true
            });
        });
        innerAudioContext.onError(function (res) {
            clearInterval(recordTimeInterval);
            _this4.setData({
                voiceStart: false,
                playVoice: false,
                readyVoice: false
            });
            common.TIP.showErrMsg(_this4, '音频播放出错');
            innerAudioContext.stop();
        });
    },

    // 停止播放
    stopVoice: function stopVoice() {
        clearInterval(recordTimeInterval);
        innerAudioContext.stop();
        this.setData({
            voiceStart: false,
            playVoice: false,
            readyVoice: true,
            recordTime: this.data.playTime,
            progress: this.data.playProgress
        });
    },

    // 保存录音
    saveVoice: function saveVoice() {
        var _this5 = this;

        if (!this.data.tempFilePath) {
            common.TIP.showErrMsg(this, '请先完成长按录音');
            return;
        }
        this.stopVoice();

        common.TIP.showErrMsg(this, '请在saveVoice方法中完善请求参数');
        return; //别忘记注释掉return


        wx.showLoading({
            title: '上传中',
            mask: true
        });
        var tempFilePath = this.data.tempFilePath;
        var wxUploadFile = app.wxPromisify(wx.uploadFile);
        wxUploadFile({
            url: '', //服务器地址
            filePath: tempFilePath, //上传的文件
            name: 'file', //字段key值
            formData: {}, //其他上传的参数
            header: {} //相关header头信息
        }).then(function (res) {
            wx.hideLoading();
            _this5.delVoice();
        }, function (err) {
            common.TIP.showErrMsg(_this5, err.errmsg);
            wx.hideLoading();
        });
    },

    // 手指滑动区域超过安全区域则松开取消录音
    moveFinger: function moveFinger(e) {
        var detail = e.touches[0];
        var x = detail.pageX;
        var y = detail.pageY;
        if (x > btnPos_x_min && x < btnPos_x_max && y > btnPos_y_min && y < btnPos_y_max) {
            moveStatus = true;
        } else {
            console.log(moveStatus);
            moveStatus = false;
            common.TIP.showErrMsg(this, '松开取消录音');
        }
    },

    // 初始化录音按钮位置
    initBtnPos: function initBtnPos(offsetLeft, offsetTop) {
        btnPos_x_min = offsetLeft - 60;
        btnPos_x_max = offsetLeft + 60;
        btnPos_y_min = offsetTop - 60;
        btnPos_y_max = offsetTop + 60;
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function onLoad(options) {
        var wxUser = wx.getStorageSync('wxUser');
        this.setData({
            userInfo: wxUser
        });
        wx.authorize({
            scope: 'scope.record',
            success: function success() {},
            fail: function fail() {
                return;
            }
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