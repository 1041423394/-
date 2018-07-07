let app = getApp()
let common = require('../../utils/util.js')
let timer = null
let count = 0
let allTime = 161 //音乐总时长
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
    playMusic(e) {
        app.stopMusice()
        this.setData({
            playMusic: true
        })
        this.interval()
    },
    // 暂停音乐
    pauseMusic(e) {
        app.autoPlay()
        clearInterval(timer)
        this.setData({
            playMusic: false
        })
    },
    // 播发完毕
    endMusic(e) {
        app.autoPlay()

        clearInterval(timer)
        count = 0
        this.setData({
            playMusic: false,
            progress: 0
        })
    },
    // 播放出错
    errMusic(e) {
        app.autoPlay()
        clearInterval(timer)
        let error = ''
        let errcode = e.detail.errMsg
        common.TIP.showErrMsg(this, errcode)
    },
    // 循环时间
    interval() {
        clearInterval(timer)
        let that = this
        let progress = 0
        timer = setInterval(function() {
            count++
            progress = (count / allTime) * 100
            that.setData({
                progress: progress
            })
            if (count >= allTime) {
                clearInterval(timer)
                count = 0
                that.setData({
                    progress: 0
                })
                if (that.data.loop) {
                    that.interval() //循环播放事件
                }
            }
        }, 1000)
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let wxUser = wx.getStorageSync('wxUser');
        this.setData({
            userInfo: wxUser
        })
        if (!wx.getStorageSync('audioPlay')) {
            app.autoPlay()
        }
    },
    onShow() {
        count = 0
        this.setData({
            progress: 0
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
        wx.setStorageSync('audioPlay', false)
    },
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {
        wx.setStorageSync('audioPlay', false)
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