var regeneratorRuntime = require("../../lib/runtime.js");'use strict';

var _index = require('../../template/calendar/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var common = require('../../utils/util.js');
var projectService = require('../../service/filterService.js');
var date = new Date();
var nowD = common.formatTime(date);
var app = getApp();
var currentYear = date.getFullYear();
var currentMonth = date.getMonth() + 1;
var currentDay = date.getDate();

Page({
    /**
     * 页面的初始数据
     */
    data: {
        currentYear: currentYear,
        currentMonth: currentMonth,
        colorText: ['#F5B2B2', '#F7D794', '#D1D6DC', '#ABB6D5'], //月数据颜色
        tab: ['列表', '月'], //头部切换tab内容
        state: 0, //哪个tab选中
        nullContent: 1,
        plan: false,
        sevenList: [],
        timeList: [], //列表
        monthList: [], //月数据弹窗数据
        daysPlan: [], //月计划
        tabBtnWidth: 104,
        pageSize: 4,
        page: 1,
        timeDay: nowD,
        newsArr: [], //资讯
        nowD: nowD,
        weekView: true,
        show: false //弹窗
    },

    // tab切换
    tabHandle: function tabHandle(e) {
        var state = e.currentTarget.dataset.state;
        this.setData({
            state: state
        });
        if (state == 0) {
            this.setData({
                weekView: true
            });
            this.onShow();
        } else {
            this.setData({
                plan: true,
                weekView: false
            });

            this.onShow();
        }
    },


    // 删除任务
    delTask: function delTask(e) {
        var _this = this;

        var taskid = e.currentTarget.dataset.taskid;
        var index = e.currentTarget.dataset.index;
        var state = e.currentTarget.dataset.state;

        wx.showModal({
            title: app.globalData.projectName,
            content: '确定要删除当前任务吗？',
            success: function () {
                var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(res) {
                    var param, result;
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    if (!res.confirm) {
                                        _context.next = 9;
                                        break;
                                    }

                                    param = {};
                                    _context.next = 4;
                                    return projectService.delTask({ params: param });

                                case 4:
                                    result = _context.sent;

                                    if (_this.data.state == 1) {
                                        _this.getMothData();
                                    }
                                    _this.data.timeList.splice(index, 1);
                                    _this.setData({
                                        timeList: _this.data.timeList
                                    });
                                    wx.showToast({
                                        title: '删除成功',
                                        icon: 'none'
                                    });

                                case 9:
                                case 'end':
                                    return _context.stop();
                            }
                        }
                    }, _callee, _this);
                }));

                return function success(_x) {
                    return _ref.apply(this, arguments);
                };
            }()
        });
    },

    // 获取任务
    getMyTask: function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
            var param, result;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            param = {};
                            _context2.next = 3;
                            return projectService.getMyTask({ params: param });

                        case 3:
                            result = _context2.sent;

                            console.log(result.data.data.length);
                            if (result.data.data.length != 0) {
                                this.setData({
                                    nullContent: 1
                                });
                                this.setData({
                                    timeList: result.data.data
                                });
                            } else {
                                this.setData({
                                    nullContent: 0
                                });
                            }

                        case 6:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, this);
        }));

        function getMyTask() {
            return _ref2.apply(this, arguments);
        }

        return getMyTask;
    }(),

    // 获取月数据
    getMothData: function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
            var _this2 = this;

            var param, result, dates;
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            param = {};
                            _context3.next = 3;
                            return projectService.monthData({ params: param });

                        case 3:
                            result = _context3.sent;

                            // if (result.data.code == '000000') {
                            dates = result.data.data;

                            if (!(dates.length == 0)) {
                                _context3.next = 8;
                                break;
                            }

                            wx.showToast({
                                title: '当月无计划',
                                icon: 'none'
                            });
                            return _context3.abrupt('return');

                        case 8:
                            dates.forEach(function (item) {
                                _this2.data.daysPlan.push({
                                    year: item.year,
                                    month: item.month,
                                    day: item.day,
                                    plan: item.note
                                });
                            });
                            (0, _index.setTodoLabels)({
                                pos: 'bottom',
                                dotColor: '#40',
                                days: this.data.daysPlan
                            });
                            this.setData({
                                daysPlan: this.data.daysPlan
                            });
                            // }

                        case 11:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, this);
        }));

        function getMothData() {
            return _ref3.apply(this, arguments);
        }

        return getMothData;
    }(),

    //获取元素自适应后的实际宽度
    getEleWidth: function getEleWidth(w) {
        var real = 0;
        try {
            var res = wx.getSystemInfoSync().windowWidth;
            var scale = 750 / 2 / (w / 2); //以宽度750px设计稿做宽度的自适应
            real = Math.floor(res / scale);
            return real;
        } catch (e) {
            return false;
        }
    },
    // 右滑删除按钮的位置
    initEleWidth: function initEleWidth() {
        var tabBtnWidth = this.getEleWidth(this.data.tabBtnWidth);
        this.setData({
            tabBtnWidth: tabBtnWidth
        });
    },
    //  触摸左移开始
    touchS: function touchS(e) {
        var id = e.currentTarget.dataset.id;
        if (id == 0) {
            return;
        }
        if (e.touches.length == 1) {
            this.setData({
                startX: e.touches[0].clientX
            });
        }
    },
    //触摸左移移动
    touchM: function touchM(e) {
        var index = e.currentTarget.dataset.index;
        var id = e.currentTarget.dataset.id;
        if (id == 0) {
            return;
        }
        if (e.touches.length == 1) {
            var moveX = e.touches[0].clientX;
            var disX = this.data.startX - moveX;
            var tabBtnWidth = this.data.tabBtnWidth;
            var left = "";
            if (disX == 0 || disX < 0) {
                //如果移动距离小于等于0，container位置不变
                left = "margin-left:0px";
            } else if (disX > 0) {
                //移动距离大于0，container left值等于手指移动距离
                left = "margin-left:-" + disX + "px";
                if (disX >= tabBtnWidth) {
                    left = "left:-" + tabBtnWidth + "px";
                }
            }
            var list = this.data.timeList;
            if (index != "" && index != null) {
                list[parseInt(index)].left = left;
                this.setData({
                    timeList: list
                });
            }
        }
    },
    //触摸左移结束
    touchE: function touchE(e) {
        var index = e.currentTarget.dataset.index;
        var id = e.currentTarget.dataset.id;
        if (id == 0) {
            return;
        }
        if (e.changedTouches.length == 1) {
            var endX = e.changedTouches[0].clientX;
            var disX = this.data.startX - endX;
            var tabBtnWidth = this.data.tabBtnWidth;
            //如果距离小于删除按钮的1/2，不显示删除按钮
            var left = disX > tabBtnWidth / 2 ? "margin-left:-" + tabBtnWidth + "px" : "margin-left:0px";
            var list = this.data.timeList;

            if (index !== "" && index != null) {
                list[parseInt(index)].left = left;
                this.setData({
                    timeList: list
                });
            }
        }
    },
    onShow: function onShow() {
        var _this3 = this;

        app.checkAuthLogin();
        // this.data.state = 0
        if (this.data.state == 0) {
            this.getMyTask();
        }

        (0, _index2.default)({
            afterTapDay: function afterTapDay(currentSelect, allSelectedDays, handle) {
                if (handle) {
                    _this3.setData({
                        currentMonth: allSelectedDays,
                        currentYear: currentSelect
                    });
                    _this3.getMothData();
                } else {
                    var _date = currentSelect.year + '-' + currentSelect.month + '-' + currentSelect.day;
                    _this3.setData({
                        nowD: _date
                    });
                    if (!_this3.data.weekView && currentSelect.plan) {
                        _this3.getMyTask();
                        // 弹窗请求输出更多
                        _this3.setData({
                            show: true
                        });
                    }
                    if (_this3.data.state == 0) {
                        _this3.getMyTask();
                    }
                }
            }

        });
        if (this.data.state == 1) {
            this.getMothData();
        }
        this.setData({
            infoDetail: false
        });
        if (this.data.state == 0) {
            (0, _index.switchView)('week');
        } else {
            // (0, _index.switchView)('month');
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function onLoad(options) {
        app.checkAuthLogin();
        var wxInfo = wx.getStorageSync('wxInfo');
        var height = 'height:' + wx.getSystemInfoSync().windowHeight + 'px';
        this.setData({
            wxInfo: wxInfo,
            webHeight: height
        });
    },
    // 取消弹窗
    cancelHandle: function cancelHandle() {
        this.setData({
            show: false
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
    onPullDownRefresh: function onPullDownRefresh() {
        wx.stopPullDownRefresh(); //停止当前刷新
        this.getMyTask();
        this.getMothData();
    },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function onReachBottom() {},
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function onShareAppMessage() {}
});