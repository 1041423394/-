var regeneratorRuntime = require("lib/runtime.js");'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

//app.js
var projectService = require('./service/projectRequest.js');
var innerAudioContext = wx.createInnerAudioContext();
innerAudioContext.title = '纪念';
innerAudioContext.epname = '纪念';
innerAudioContext.singer = '金岐文';
innerAudioContext.coverImgUrl = 'images/indexShare.png';
innerAudioContext.src = "https://wechat.fmlcoder.com/music/jinian.mp3";
innerAudioContext.onPlay(function () {
    wx.setStorageSync('audioPlay', true);
});
innerAudioContext.onError(function () {
    wx.setStorageSync('audioPlay', false);
});
innerAudioContext.onStop(function () {
    wx.setStorageSync('audioPlay', false);
});
innerAudioContext.onPause(function () {
    wx.setStorageSync('audioPlay', false);
});

App({
    onLaunch: function onLaunch() {
        if (!wx.getStorageSync('openId')) {
            this.getOpenId();
        }
    },
    getOpenId: function getOpenId() {
        var _this = this;

        wx.removeStorage({
            key: 'audioPlay'
        });
        var wxLogin = this.wxPromisify(wx.login);
        if (this.globalData.encryption || this.globalData.needUserInfo) {
            wxLogin().then(function (res) {
                _this.globalData.code = res.code;
            });
        } else {
            wxLogin().then(function () {
                var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(res) {
                    var param, result;
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    _this.globalData.code = res.code;
                                    param = {
                                        code: res.code
                                    };
                                    _context.next = 4;
                                    return projectService.getOpenId({ params: param });

                                case 4:
                                    result = _context.sent;

                                    _this.globalData.openId = result.data.openid;
                                    wx.setStorageSync('openId', result.data.openid);

                                case 7:
                                case 'end':
                                    return _context.stop();
                            }
                        }
                    }, _callee, _this);
                }));

                return function (_x) {
                    return _ref.apply(this, arguments);
                };
            }());
        }
    },

    // session校验，登录授权
    checkSession: function checkSession(param, userInfo) {
        var that = this;
        wx.checkSession({
            success: function success() {
                that.setUserInfo(param, userInfo);
            },
            fail: function fail() {
                var wxLogin = app.wxPromisify(wx.login);
                wxLogin().then(function (res) {
                    wx.getUserInfo({
                        success: function success(res) {
                            that.setUserInfo(param, res.userInfo);
                        }
                    });
                });
            }
        });
    },
    // 登陆态用户信息存储
    setUserInfo: function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(param, userInfo) {
            var result;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            wx.navigateBack();
                            _context2.next = 3;
                            return projectService.getOpenId({ params: param });

                        case 3:
                            result = _context2.sent;

                            app.globalData.openId = result.data.openid;
                            app.globalData.userInfo = userInfo;
                            wx.setStorageSync('userInfo', userInfo);
                            wx.setStorageSync('openId', result.data.openid);
                            wx.navigateBack();

                        case 9:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, this);
        }));

        function setUserInfo(_x2, _x3) {
            return _ref2.apply(this, arguments);
        }

        return setUserInfo;
    }(),
    // 检查是否授权登陆
    checkAuthLogin: function checkAuthLogin() {
        var wxUser = wx.getStorageSync('wxUser');
        if (!wxUser) {
            wx.navigateTo({
                url: '../login/login'

            });
        }
    },
    // es6
    wxPromisify: function wxPromisify(fn) {
        return function () {
            var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            return new Promise(function (resolve, reject) {
                obj.success = function (res) {
                    resolve(res);
                };
                obj.fail = function (res) {
                    reject(res);
                };
                fn(obj);
            });
        };
    },
    // 背景音乐自动播放
    autoPlay: function autoPlay() {
        innerAudioContext.play();
        innerAudioContext.autoplay = true;
        innerAudioContext.loop = true;
    },

    // 背景音乐停止
    stopMusice: function stopMusice() {
        innerAudioContext.stop();
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
});
Array.prototype.remove = function (val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};