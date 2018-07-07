//app.js
let projectService = require('./service/projectRequest.js')
const innerAudioContext = wx.createInnerAudioContext()
innerAudioContext.title = '纪念'
innerAudioContext.epname = '纪念'
innerAudioContext.singer = '金岐文'
innerAudioContext.coverImgUrl = 'images/indexShare.png'
innerAudioContext.src = "https://wechat.fmlcoder.com/music/jinian.mp3"
innerAudioContext.onPlay(function() {
    wx.setStorageSync('audioPlay', true)
})
innerAudioContext.onError(function() {
    wx.setStorageSync('audioPlay', false)
})
innerAudioContext.onStop(function() {
    wx.setStorageSync('audioPlay', false)
})
innerAudioContext.onPause(function() {
    wx.setStorageSync('audioPlay', false)
})

App({
    onLaunch: function() {
        if (!wx.getStorageSync('openId')) {
            this.getOpenId()
        }
    },
    getOpenId() {
        wx.removeStorage({
            key: 'audioPlay'
        });
        let wxLogin = this.wxPromisify(wx.login)
        if (this.globalData.encryption || this.globalData.needUserInfo) {
            wxLogin().then(res => {
                this.globalData.code = res.code
            })
        } else {
            wxLogin().then(async(res) => {
                this.globalData.code = res.code
                let param = {
                    code: res.code
                }
                let result = await projectService.getOpenId({ params: param })
                this.globalData.openId = result.data.openid
                wx.setStorageSync('openId', result.data.openid)
            })
        }
    },
    // session校验，登录授权
    checkSession: function(param, userInfo) {
        let that = this
        wx.checkSession({
            success: function() {
                that.setUserInfo(param, userInfo)
            },
            fail: () => {
                let wxLogin = app.wxPromisify(wx.login)
                wxLogin().then((res) => {
                    wx.getUserInfo({
                        success: function(res) {
                            that.setUserInfo(param, res.userInfo)
                        }
                    })
                })
            }
        })
    },
    // 登陆态用户信息存储
    setUserInfo: async function(param, userInfo) {
        wx.navigateBack();
        let result = await projectService.getOpenId({ params: param })
        app.globalData.openId = result.data.openid
        app.globalData.userInfo = userInfo
        wx.setStorageSync('userInfo', userInfo)
        wx.setStorageSync('openId', result.data.openid)
        wx.navigateBack()
    },
    // 检查是否授权登陆
    checkAuthLogin: function() {
        let wxUser = wx.getStorageSync('wxUser')
        if (!wxUser) {
            wx.navigateTo({
                url: '../login/login',

            })
        }
    },
    // es6
    wxPromisify: function(fn) {
        return function(obj = {}) {
            return new Promise((resolve, reject) => {
                obj.success = function(res) {
                    resolve(res)
                }
                obj.fail = function(res) {
                    reject(res)
                }
                fn(obj)
            })
        }
    },
    // 背景音乐自动播放
    autoPlay() {
        innerAudioContext.play()
        innerAudioContext.autoplay = true
        innerAudioContext.loop = true
    },
    // 背景音乐停止
    stopMusice() {
        innerAudioContext.stop()
    },
    /**
     * 全局变量
     * @param {boolean} encryption 是否需要多端判定为同一用户
     * @param {boolean} needUserInfo是否需要用户头像，名称
     * @param {string} projectName 项目名称
     * 
     */
    globalData: {
        debug: 1,
        defaultImg: './images/noimg.jpg',
        needUserInfo: true,
        encryption: true,
        openId: null,
        userInfo: null,
        code: '',
        projectName: 'wechat-frame'
    }
})
Array.prototype.remove = function(val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};