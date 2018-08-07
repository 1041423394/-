var regeneratorRuntime = require("../../lib/runtime.js");"use strict";

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var regeneratorRuntime = require("../../lib/runtime.js");
var filterService = require('../../service/filterService');
var app = getApp();
Page({
    data: {
        onshow: false,
        loading: 0,
        nullContent: 0, //是否有地址信息
        downUp: 0, //上啦加载
        canAjax: true,
        pageSize: 10,
        dataList: [],
        delBtnWidth: 120 //删除按钮宽度单位（rpx）

    },
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
        var delBtnWidth = this.getEleWidth(this.data.delBtnWidth);
        this.setData({
            delBtnWidth: delBtnWidth
        });
    },
    //  触摸左移开始
    touchS: function touchS(e) {
        if (e.touches.length == 1) {
            this.setData({
                startX: e.touches[0].clientX
            });
        }
    },
    //触摸左移移动
    touchM: function touchM(e) {
        var index = e.currentTarget.dataset.index;
        if (e.touches.length == 1) {
            var moveX = e.touches[0].clientX;
            var disX = this.data.startX - moveX;
            var delBtnWidth = this.data.delBtnWidth;
            var left = "";
            if (disX == 0 || disX < 0) {
                //如果移动距离小于等于0，container位置不变
                left = "margin-left:0px";
            } else if (disX > 0) {
                //移动距离大于0，container left值等于手指移动距离
                left = "margin-left:-" + disX + "px";
                if (disX >= delBtnWidth) {
                    left = "left:-" + delBtnWidth + "px";
                }
            }
            var list = this.data.dataList;
            if (index != "" && index != null) {
                list[parseInt(index)].left = left;
                this.setData({
                    dataList: list
                });
            }
        }
    },
    //触摸左移结束
    touchE: function touchE(e) {
        var index = e.currentTarget.dataset.index;
        if (e.changedTouches.length == 1) {
            var endX = e.changedTouches[0].clientX;
            var disX = this.data.startX - endX;
            var delBtnWidth = this.data.delBtnWidth;
            //如果距离小于删除按钮的1/2，不显示删除按钮
            var left = disX > delBtnWidth / 2 ? "margin-left:-" + delBtnWidth + "px" : "margin-left:0px";
            var list = this.data.dataList;
            if (index !== "" && index != null) {
                list[parseInt(index)].left = left;
                this.setData({
                    dataList: list
                });
            }
        }
    },
    //列表初始化
    initQuery: function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
            var param, result;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            if (this.data.canAjax) {
                                _context.next = 2;
                                break;
                            }

                            return _context.abrupt("return");

                        case 2:
                            this.data.canAjax = false;
                            param = {
                                pageSize: this.data.pageSize,
                                p: this.data.p
                            };
                            _context.next = 6;
                            return filterService.getAddrList({ params: param });

                        case 6:
                            result = _context.sent;

                            this.initData(result);

                        case 8:
                        case "end":
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));

        function initQuery() {
            return _ref.apply(this, arguments);
        }

        return initQuery;
    }(),
    initData: function initData(res) {
        this.data.canAjax = true;
        this.setData({
            downUp: 0,
            loading: 1
        });
        wx.stopPullDownRefresh();
        var queryData = res.data; //获取请求的数据
        // 没数据的情况
        if (queryData.length == 0) {
            this.setData({
                downUp: 2
            });
        }
        for (var i = 0; i < queryData.length; i++) {
            this.data.dataList.push(queryData[i]);
        }

        this.setData({
            dataList: this.data.dataList
        });
        // 没有任何数据不包括上拉加载
        if (this.data.dataList.length == 0) {
            this.setData({
                downUp: 0,
                nullContent: 0

            });
        } else {
            this.setData({
                nullContent: 1
            });
        }
    },
    // 删除
    addressDelete: function addressDelete(e) {
        var that = this;
        var address_id = e.currentTarget.dataset.addrid;
        var addrIndex = e.currentTarget.dataset.index;
        var dataList = this.data.dataList;
        var wxShowModal = app.wxPromisify(wx.showModal);
        wxShowModal({
            title: app.globalData.projectName,
            content: '确定删除当前地址吗？'
        }).then(function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(res) {
                var param;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                if (!res.confirm) {
                                    _context2.next = 8;
                                    break;
                                }

                                param = {
                                    address_id: address_id
                                };
                                _context2.next = 4;
                                return filterService.deleteAddr({ params: param });

                            case 4:
                                wx.hideLoading();
                                wx.showToast({
                                    title: '删除成功',
                                    icon: 'success'
                                });
                                dataList.splice(addrIndex, 1);
                                //更新列表的状态  
                                that.setData({
                                    dataList: dataList
                                });

                            case 8:
                            case "end":
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            return function (_x) {
                return _ref2.apply(this, arguments);
            };
        }());
    },

    // 编辑
    editAddress: function editAddress(e) {
        var addrIndex = e.currentTarget.dataset.index;
        var editAddr = this.data.dataList[addrIndex];
        var address_id = e.currentTarget.dataset.id;
        wx.setStorageSync('editAddr', editAddr); //地址编辑
        wx.navigateTo({
            url: '../addrEdit/addrEdit?address_id=' + address_id
        });
    },

    // 新增地址
    newAddress: function newAddress(e) {
        wx.navigateTo({
            url: '../addrEdit/addrEdit'
        });
    },

    // 获取当前地址
    getAddress: function getAddress(e) {
        var address_id = e.currentTarget.dataset.id;
        console.log(address_id);
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function onLoad(options) {
        this.initEleWidth();

        if (!this.data.onshow) {
            this.initQuery();
        }
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function onShow() {
        var pages = getCurrentPages();
        var currPage = pages[pages.length - 1];
        this.setData({ //将携带的参数赋值
            onshow: currPage.data.onshow
        });
        if (this.data.onshow) {
            this.setData({
                pageSize: 10,
                p: 1,
                dataList: []
            });
            this.initQuery();
        }
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function onPullDownRefresh() {
        this.setData({
            pageSize: 10,
            p: 1,
            dataList: []
        });
        this.initQuery();
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function onReachBottom() {
        if (this.data.dataList.length == 0) {
            return;
        }
        var _this = this;
        if (this.data.downUp == 2 || this.data.dataList.length % this.data.pageSize > 0) {
            //没数据了，不用再请求了
            this.setData({
                downUp: 2
            });
            return;
        }
        var pageNum = this.data.dataList.length / this.data.pageSize + 1;
        this.setData({
            downUp: 1,
            p: pageNum
        });

        this.initQuery();
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function onShareAppMessage(res) {}
});