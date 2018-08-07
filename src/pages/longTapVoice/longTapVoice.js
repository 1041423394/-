const recorderManager = wx.getRecorderManager() //录音
const innerAudioContext = wx.createInnerAudioContext() //播放录音
let recordTimeInterval = null
let common = require('../../utils/util.js')
let app = getApp()
let btnPos_x_min = 0
let btnPos_x_max = 0
let btnPos_y_min = 0
let btnPos_y_max = 0
let moveStatus = false //手指移动是否超过安全范围

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
    recordVoice(e) {
        // 格式化
        this.setData({
            voiceStart: false,
            recordTime: 0,
            progress: 0,
            readyVoice: false,
            playVoice: false
        })
        clearInterval(recordTimeInterval)
        let detail = e.currentTarget
        this.initBtnPos(detail.offsetLeft, detail.offsetTop)
        wx.getSetting({
            success(res) {
                if (!res.authSetting['scope.record']) {
                    wx.authorize({
                        scope: 'scope.record',
                        success() {

                        },
                        fail() {
                            return
                        }
                    })
                }
            }
        })
        if (this.data.duration > 60000) {
            common.TIP.showErrMsg(_this, '录音时长最长不能超过10分钟')
            return
        }
        const options = {
            duration: this.data.duration,
            sampleRate: 44100,
            numberOfChannels: 1,
            encodeBitRate: 192000,
            format: 'mp3', //音频格式
            frameSize: 50
        }

        recorderManager.onStart(() => {
            this.setData({
                voiceStart: true
            })
            wx.vibrateShort() //手机震动 iPhone7以上及安卓机型有效

            this.interval()
        })
        recorderManager.start(options)
        recorderManager.onError((res) => {
            clearInterval(recordTimeInterval)
            this.setData({
                voiceStart: false,
                playVoice: false
            })
            common.TIP.showErrMsg(this, '录音出错')
            recorderManager.stop()
        })
    },
    // 完成录音
    endVoice(e) {
        clearInterval(recordTimeInterval)
        if (!moveStatus) {
            recorderManager.stop()
            this.setData({
                voiceStart: false,
                recordTime: 0,
                progress: 0
            })
            common.TIP.showErrMsg(this, '录音取消')
            moveStatus = true
            return
        }
        recorderManager.onStop((res) => {
            if (this.data.recordTime < 1) {
                this.setData({
                    readyVoice: false,
                    voiceStart: false
                })
                common.TIP.showErrMsg(this, '录音时间太短')
                clearInterval(recordTimeInterval)
                return
            }
            this.setData({
                voiceStart: false,
                readyVoice: true,
                tempFilePath: res.tempFilePath,
                playTime: this.data.recordTime,
                playProgress: this.data.progress

            })
        })
        recorderManager.stop()
    },
    //  录音计时
    interval() {
        clearInterval(recordTimeInterval)
        let _this = this
        recordTimeInterval = setInterval(function() {
            var recordTime = _this.data.recordTime += 1
            let progress = ((Number(recordTime) * 1000) / _this.data.duration) * 100
            if (_this.data.recordTime >= (_this.data.duration / 1000)) {
                _this.setData({
                    voiceStart: false
                })
                if (!_this.data.playVoice) {
                    common.TIP.showErrMsg(_this, '录音时长不能超过60s')
                }
                clearInterval(recordTimeInterval)
            }
            _this.setData({
                recordTime: recordTime,
                progress: progress
            })
        }, 1000)

    },
    // 删除录音
    delVoice() {
        if (!this.data.tempFilePath) {
            common.TIP.showErrMsg(this, '请先完成长按录音')
            return
        }
        clearInterval(recordTimeInterval)
        innerAudioContext.stop()
        this.setData({
            voiceStart: false,
            playVoice: false,
            recordTime: 0,
            progress: 0,
            readyVoice: false,
            tempFilePath: ''
        })
    },

    // 播放录音
    playVoice(e) {
        if (!this.data.tempFilePath) {
            common.TIP.showErrMsg(this, '请先完成长按录音')
            return
        }
        let detail = e.currentTarget

        innerAudioContext.src = this.data.tempFilePath
        this.setData({
            voiceStart: true,
            recordTime: 0,
            progress: 0,
            playVoice: true
        })
        innerAudioContext.onPlay(() => {
            this.interval()
        })
        innerAudioContext.play()
        innerAudioContext.onEnded(() => {
            clearInterval(recordTimeInterval)
            this.setData({
                voiceStart: false,
                playVoice: false,
                readyVoice: true
            })
        })
        innerAudioContext.onError((res) => {
            clearInterval(recordTimeInterval)
            this.setData({
                voiceStart: false,
                playVoice: false,
                readyVoice: false
            })
            common.TIP.showErrMsg(this, '音频播放出错')
            innerAudioContext.stop()
        })
    },
    // 停止播放
    stopVoice() {
        clearInterval(recordTimeInterval)
        innerAudioContext.stop()
        this.setData({
            voiceStart: false,
            playVoice: false,
            readyVoice: true,
            recordTime: this.data.playTime,
            progress: this.data.playProgress
        })

    },
    // 保存录音
    saveVoice() {
        if (!this.data.tempFilePath) {
            common.TIP.showErrMsg(this, '请先完成长按录音')
            return
        }
        this.stopVoice()

        common.TIP.showErrMsg(this, '请在saveVoice方法中完善请求参数')
        return //别忘记注释掉return


        wx.showLoading({
            title: '上传中',
            mask: true,
        });
        let tempFilePath = this.data.tempFilePath
        let wxUploadFile = app.wxPromisify(wx.uploadFile)
        wxUploadFile({
            url: '', //服务器地址
            filePath: tempFilePath, //上传的文件
            name: 'file', //字段key值
            formData: {}, //其他上传的参数
            header: {} //相关header头信息
        }).then(res => {
            wx.hideLoading();
            this.delVoice()
        }, err => {
            common.TIP.showErrMsg(this, err.errmsg)
            wx.hideLoading()
        })
    },
    // 手指滑动区域超过安全区域则松开取消录音
    moveFinger(e) {
        let detail = e.touches[0]
        let x = detail.pageX
        let y = detail.pageY
        if (x > btnPos_x_min && x < btnPos_x_max && y > btnPos_y_min && y < btnPos_y_max) {
            moveStatus = true;
        } else {
            console.log(moveStatus)
            moveStatus = false;
            common.TIP.showErrMsg(this, '松开取消录音')
        }
    },
    // 初始化录音按钮位置
    initBtnPos(offsetLeft, offsetTop) {
        btnPos_x_min = offsetLeft - 60
        btnPos_x_max = offsetLeft + 60
        btnPos_y_min = offsetTop - 60
        btnPos_y_max = offsetTop + 60
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let wxUser = wx.getStorageSync('wxUser');
        this.setData({
            userInfo: wxUser
        })
        wx.authorize({
            scope: 'scope.record',
            success() {

            },
            fail() {
                return
            }
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})