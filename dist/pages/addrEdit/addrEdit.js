var regeneratorRuntime = require("../../lib/runtime.js");'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var util = require('../../utils/util');
var regeneratorRuntime = require("../../lib/runtime.js");
var TIP = util.TIP;
var area = require('../../lib/area');
var filterService = require('../../service/filterService');
var provinces = []; //省
var citys = []; //城市
var countys = []; //区县
var index = [0, 0, 0];
var t = 0;
var show = true;
var moveY = 200;
var _areaInfo = []; //省市区
Page({
    /**
     * 页面的初始数据
     */
    data: {
        tips: {
            hiddenErrmsg: true,
            errmsg: ''
        },
        show: show,
        is_default: 0, //是否设为默认
        provinces: provinces,
        citys: citys,
        countys: countys,
        value: [0, 0, 0],
        lat: '',
        lng: '',
        address_id: '',
        classStyle: 'slideInUp'
    },
    // 获取城市信息
    areaInfo: function areaInfo() {
        var that = this;
        var param = {
            command: 'regionList'
        };
        area.getAreaInfo(function (arr) {
            _areaInfo = arr;
            getProvinceData(that);
        });
    },

    // 城市选择t
    translate: function translate(e) {
        this.setData({
            classStyle: 'slideInUp'
        });
        if (t == 0) {
            moveY = 0;
            show = false;
            t = 1;
        } else {
            moveY = 200;
            show = true;
            t = 0;
        }
        animationEvents(this, moveY, show);
    },
    // 获取地址
    getReceiveAddr: function getReceiveAddr() {
        var _this = this;
        wx.chooseLocation({
            success: function success(res) {
                _this.setData({
                    receive_addr: res.name,
                    receive_extralAddr: res.address,
                    lat: res.latitude,
                    lng: res.longitude
                });
            }
        });
    },


    // 设为默认值
    defaultChange: function defaultChange(e) {
        var isdefault = e.detail.value.length > 0 ? 1 : 0;
        this.setData({
            is_default: isdefault
        });
    },


    //保存地址
    confirmSave: function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(e) {
            var queryParam, userInfo, re, param, pages, prevPage;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            queryParam = e.detail.value;
                            userInfo = wx.getStorageSync('userInfo');

                            if (queryParam.receive_name) {
                                _context.next = 5;
                                break;
                            }

                            TIP.showErrMsg(this, '请填写收货人姓名');
                            return _context.abrupt('return');

                        case 5:
                            if (queryParam.receive_mobile) {
                                _context.next = 8;
                                break;
                            }

                            TIP.showErrMsg(this, '请填写收货人联系电话');
                            return _context.abrupt('return');

                        case 8:
                            if (queryParam.receive_addr) {
                                _context.next = 11;
                                break;
                            }

                            TIP.showErrMsg(this, '请填写收货地址');
                            return _context.abrupt('return');

                        case 11:
                            re = /^1\d{10}/g;

                            if (re.test(queryParam.receive_mobile)) {
                                _context.next = 15;
                                break;
                            }

                            TIP.showErrMsg(this, '手机号码格式不正确');
                            return _context.abrupt('return');

                        case 15:
                            param = {
                                consignee: queryParam.receive_name,
                                address: queryParam.receive_addr,
                                building: queryParam.receive_extralAddr,
                                mobile: queryParam.receive_mobile,
                                lat: this.data.lat,
                                lng: this.data.lng,
                                is_default: this.data.is_default
                            };
                            _context.next = 18;
                            return filterService.confirmAddr({ params: param });

                        case 18:
                            wx.showToast({
                                title: '保存成功',
                                icon: 'success',
                                duration: 2000
                            });
                            // 返回页面是否做刷新动作
                            pages = getCurrentPages(); //当前页面

                            prevPage = pages[pages.length - 2]; //上一页面

                            prevPage.setData({ //直接给上移页面赋值
                                onshow: true
                            });
                            wx.navigateBack();

                        case 23:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));

        function confirmSave(_x) {
            return _ref.apply(this, arguments);
        }

        return confirmSave;
    }(),
    onShow: function onShow() {},
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function onLoad(options) {
        this.areaInfo();
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function onReady() {
        this.animation = wx.createAnimation({
            transformOrigin: "50% 50%",
            duration: 0,
            timingFunction: "ease",
            delay: 0
        });
        this.animation.translateY(200 + 'vh').step();
        this.setData({
            animation: this.animation.export(),
            show: show
        });
    },
    //滑动事件
    bindChange: function bindChange(e) {
        var val = e.detail.value;
        if (index[0] != val[0]) {
            val[1] = 0;
            val[2] = 0;
            getCityArr(val[0], this); //获取地级市数据
            getCountyInfo(val[0], val[1], this); //获取区县数据
        } else {
            //若省份column未做滑动，地级市做了滑动则定位区县第一位
            if (index[1] != val[1]) {
                val[2] = 0;
                getCountyInfo(val[0], val[1], this); //获取区县数据
            }
        }
        index = val;
        //更新数据
        this.setData({
            value: [val[0], val[1], val[2]],
            province: provinces[val[0]].name,
            city: citys[val[1]].name,
            county: countys[val[2]].name
        });
    },
    //隐藏弹窗浮层
    hiddenFloatView: function hiddenFloatView(e) {
        this.setData({
            classStyle: 'slideOutDown'
        });
        moveY = 200;
        setTimeout(function () {
            show = true;
        }, 300);
        t = 0;
        animationEvents(this, moveY, show);
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function onShareAppMessage(res) {}

});
//动画事件
function animationEvents(that, moveY, show) {

    that.animation = wx.createAnimation({
        transformOrigin: "50% 50%",
        duration: 400,
        timingFunction: "ease",
        delay: 0
    });
    that.animation.translateY(moveY + 'vh').step();

    that.setData({
        animation: that.animation.export(),
        show: show
    });
}
//获取省份数据
function getProvinceData(that) {
    var s;
    provinces = [];
    var num = 0;
    for (var i = 0; i < _areaInfo.length; i++) {
        s = _areaInfo[i];
        if (s.di == "00" && s.xian == "00") {
            provinces[num] = s;
            num++;
        }
    }
    that.setData({
        provinces: provinces
    });

    //初始化调一次
    getCityArr(0, that);
    getCountyInfo(0, 0, that);
}

// 获取地级市数据
function getCityArr(count, that) {
    var c;
    citys = [];
    var num = 0;
    for (var i = 0; i < _areaInfo.length; i++) {
        c = _areaInfo[i];
        if (c.xian == "00" && c.sheng == provinces[count].sheng && c.di != "00") {
            citys[num] = c;
            num++;
        }
    }
    if (citys.length == 0) {
        citys[0] = {
            name: ''
        };
    }

    that.setData({
        city: "",
        citys: citys,
        value: [count, 0, 0]
    });
}

// 获取区县数据
function getCountyInfo(column0, column1, that) {
    var c;
    countys = [];
    var num = 0;
    for (var i = 0; i < _areaInfo.length; i++) {
        c = _areaInfo[i];
        if (c.xian != "00" && c.sheng == provinces[column0].sheng && c.di == citys[column1].di) {
            countys[num] = c;
            num++;
        }
    }
    if (countys.length == 0) {
        countys[0] = {
            name: ''
        };
    }
    that.setData({
        county: "",
        countys: countys,
        value: [column0, column1, 0]
    });
}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzL2FkZHJFZGl0L2FkZHJFZGl0LmpzIl0sIm5hbWVzIjpbInV0aWwiLCJyZXF1aXJlIiwicmVnZW5lcmF0b3JSdW50aW1lIiwiVElQIiwiYXJlYSIsImZpbHRlclNlcnZpY2UiLCJwcm92aW5jZXMiLCJjaXR5cyIsImNvdW50eXMiLCJpbmRleCIsInQiLCJzaG93IiwibW92ZVkiLCJhcmVhSW5mbyIsIlBhZ2UiLCJkYXRhIiwidGlwcyIsImhpZGRlbkVycm1zZyIsImVycm1zZyIsImlzX2RlZmF1bHQiLCJ2YWx1ZSIsImxhdCIsImxuZyIsImFkZHJlc3NfaWQiLCJjbGFzc1N0eWxlIiwidGhhdCIsInBhcmFtIiwiY29tbWFuZCIsImdldEFyZWFJbmZvIiwiYXJyIiwiZ2V0UHJvdmluY2VEYXRhIiwidHJhbnNsYXRlIiwiZSIsInNldERhdGEiLCJhbmltYXRpb25FdmVudHMiLCJnZXRSZWNlaXZlQWRkciIsIl90aGlzIiwid3giLCJjaG9vc2VMb2NhdGlvbiIsInN1Y2Nlc3MiLCJyZXMiLCJyZWNlaXZlX2FkZHIiLCJuYW1lIiwicmVjZWl2ZV9leHRyYWxBZGRyIiwiYWRkcmVzcyIsImxhdGl0dWRlIiwibG9uZ2l0dWRlIiwiZGVmYXVsdENoYW5nZSIsImlzZGVmYXVsdCIsImRldGFpbCIsImxlbmd0aCIsImNvbmZpcm1TYXZlIiwicXVlcnlQYXJhbSIsInVzZXJJbmZvIiwiZ2V0U3RvcmFnZVN5bmMiLCJyZWNlaXZlX25hbWUiLCJzaG93RXJyTXNnIiwicmVjZWl2ZV9tb2JpbGUiLCJyZSIsInRlc3QiLCJjb25zaWduZWUiLCJidWlsZGluZyIsIm1vYmlsZSIsImNvbmZpcm1BZGRyIiwicGFyYW1zIiwic2hvd1RvYXN0IiwidGl0bGUiLCJpY29uIiwiZHVyYXRpb24iLCJwYWdlcyIsImdldEN1cnJlbnRQYWdlcyIsInByZXZQYWdlIiwib25zaG93IiwibmF2aWdhdGVCYWNrIiwib25TaG93Iiwib25Mb2FkIiwib3B0aW9ucyIsIm9uUmVhZHkiLCJhbmltYXRpb24iLCJjcmVhdGVBbmltYXRpb24iLCJ0cmFuc2Zvcm1PcmlnaW4iLCJ0aW1pbmdGdW5jdGlvbiIsImRlbGF5IiwidHJhbnNsYXRlWSIsInN0ZXAiLCJleHBvcnQiLCJiaW5kQ2hhbmdlIiwidmFsIiwiZ2V0Q2l0eUFyciIsImdldENvdW50eUluZm8iLCJwcm92aW5jZSIsImNpdHkiLCJjb3VudHkiLCJoaWRkZW5GbG9hdFZpZXciLCJzZXRUaW1lb3V0Iiwib25TaGFyZUFwcE1lc3NhZ2UiLCJzIiwibnVtIiwiaSIsImRpIiwieGlhbiIsImNvdW50IiwiYyIsInNoZW5nIiwiY29sdW1uMCIsImNvbHVtbjEiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxJQUFJQSxPQUFPQyxRQUFRLGtCQUFSLENBQVg7QUFDQSxJQUFJQyxxQkFBcUJELFFBQVEsc0JBQVIsQ0FBekI7QUFDQSxJQUFJRSxNQUFNSCxLQUFLRyxHQUFmO0FBQ0EsSUFBSUMsT0FBT0gsUUFBUSxnQkFBUixDQUFYO0FBQ0EsSUFBSUksZ0JBQWdCSixRQUFRLDZCQUFSLENBQXBCO0FBQ0EsSUFBSUssWUFBWSxFQUFoQixDLENBQW9CO0FBQ3BCLElBQUlDLFFBQVEsRUFBWixDLENBQWdCO0FBQ2hCLElBQUlDLFVBQVUsRUFBZCxDLENBQWtCO0FBQ2xCLElBQUlDLFFBQVEsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsQ0FBWjtBQUNBLElBQUlDLElBQUksQ0FBUjtBQUNBLElBQUlDLE9BQU8sSUFBWDtBQUNBLElBQUlDLFFBQVEsR0FBWjtBQUNBLElBQUlDLFlBQVcsRUFBZixDLENBQW1CO0FBQ25CQyxLQUFLO0FBQ0c7OztBQUdBQyxVQUFNO0FBQ0ZDLGNBQU07QUFDRkMsMEJBQWMsSUFEWjtBQUVGQyxvQkFBUTtBQUZOLFNBREo7QUFLRlAsY0FBTUEsSUFMSjtBQU1GUSxvQkFBWSxDQU5WLEVBTWE7QUFDZmIsbUJBQVdBLFNBUFQ7QUFRRkMsZUFBT0EsS0FSTDtBQVNGQyxpQkFBU0EsT0FUUDtBQVVGWSxlQUFPLENBQUMsQ0FB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QUFWLElBQWtCRSxFQUFFQyxLQUFGLElBQVdqRyxVQUFVa0csT0FBVixFQUFtQkQsS0FBaEQsSUFBeURELEVBQUVILEVBQUYsSUFBUTVGLE1BQU1rRyxPQUFOLEVBQWVOLEVBQXBGLEVBQXdGO0FBQ3BGM0Ysb0JBQVF5RixHQUFSLElBQWVLLENBQWY7QUFDQUw7QUFDSDtBQUNKO0FBQ0QsUUFBSXpGLFFBQVEwQyxNQUFSLElBQWtCLENBQXRCLEVBQXlCO0FBQ3JCMUMsZ0JBQVEsQ0FBUixJQUFhO0FBQ1RrQyxrQkFBTTtBQURHLFNBQWI7QUFHSDtBQUNEakIsU0FBS1EsT0FBTCxDQUFhO0FBQ1QyRCxnQkFBUSxFQURDO0FBRVRwRixpQkFBU0EsT0FGQTtBQUdUWSxlQUFPLENBQUNvRixPQUFELEVBQVVDLE9BQVYsRUFBbUIsQ0FBbkI7QUFIRSxLQUFiO0FBS0giLCJmaWxlIjoicGFnZXMvYWRkckVkaXQvYWRkckVkaXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJsZXQgdXRpbCA9IHJlcXVpcmUoJy4uLy4uL3V0aWxzL3V0aWwnKVxudmFyIHJlZ2VuZXJhdG9yUnVudGltZSA9IHJlcXVpcmUoXCIuLi8uLi9saWIvcnVudGltZS5qc1wiKTtcbmxldCBUSVAgPSB1dGlsLlRJUFxubGV0IGFyZWEgPSByZXF1aXJlKCcuLi8uLi9saWIvYXJlYScpXG52YXIgZmlsdGVyU2VydmljZSA9IHJlcXVpcmUoJy4uLy4uL3NlcnZpY2UvZmlsdGVyU2VydmljZScpO1xudmFyIHByb3ZpbmNlcyA9IFtdOyAvL+ecgVxudmFyIGNpdHlzID0gW107IC8v5Z+O5biCXG52YXIgY291bnR5cyA9IFtdOyAvL+WMuuWOv1xudmFyIGluZGV4ID0gWzAsIDAsIDBdO1xudmFyIHQgPSAwO1xudmFyIHNob3cgPSB0cnVlO1xudmFyIG1vdmVZID0gMjAwO1xudmFyIGFyZWFJbmZvID0gW107IC8v55yB5biC5Yy6XG5QYWdlKHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIOmhtemdoueahOWIneWni+aVsOaNrlxuICAgICAgICAgKi9cbiAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgdGlwczoge1xuICAgICAgICAgICAgICAgIGhpZGRlbkVycm1zZzogdHJ1ZSxcbiAgICAgICAgICAgICAgICBlcnJtc2c6ICcnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2hvdzogc2hvdyxcbiAgICAgICAgICAgIGlzX2RlZmF1bHQ6IDAsIC8v5piv5ZCm6K6+5Li66buY6K6kXG4gICAgICAgICAgICBwcm92aW5jZXM6IHByb3ZpbmNlcyxcbiAgICAgICAgICAgIGNpdHlzOiBjaXR5cyxcbiAgICAgICAgICAgIGNvdW50eXM6IGNvdW50eXMsXG4gICAgICAgICAgICB2YWx1ZTogWzAsIDAsIDBdLFxuICAgICAgICAgICAgbGF0OiAnJyxcbiAgICAgICAgICAgIGxuZzogJycsXG4gICAgICAgICAgICBhZGRyZXNzX2lkOiAnJyxcbiAgICAgICAgICAgIGNsYXNzU3R5bGU6ICdzbGlkZUluVXAnXG4gICAgICAgIH0sXG4gICAgICAgIC8vIOiOt+WPluWfjuW4guS/oeaBr1xuICAgICAgICBhcmVhSW5mbygpIHtcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpc1xuICAgICAgICAgICAgbGV0IHBhcmFtID0ge1xuICAgICAgICAgICAgICAgIGNvbW1hbmQ6ICdyZWdpb25MaXN0J1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYXJlYS5nZXRBcmVhSW5mbyhmdW5jdGlvbihhcnIpIHtcbiAgICAgICAgICAgICAgICBhcmVhSW5mbyA9IGFyclxuICAgICAgICAgICAgICAgIGdldFByb3ZpbmNlRGF0YSh0aGF0KTtcblxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSxcbiAgICAgICAgLy8g5Z+O5biC6YCJ5oupdFxuICAgICAgICB0cmFuc2xhdGU6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgICAgICAgY2xhc3NTdHlsZTogJ3NsaWRlSW5VcCdcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBpZiAodCA9PSAwKSB7XG4gICAgICAgICAgICAgICAgbW92ZVkgPSAwO1xuICAgICAgICAgICAgICAgIHNob3cgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0ID0gMTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbW92ZVkgPSAyMDA7XG4gICAgICAgICAgICAgICAgc2hvdyA9IHRydWU7XG4gICAgICAgICAgICAgICAgdCA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhbmltYXRpb25FdmVudHModGhpcywgbW92ZVksIHNob3cpO1xuXG4gICAgICAgIH0sXG4gICAgICAgIC8vIOiOt+WPluWcsOWdgFxuICAgICAgICBnZXRSZWNlaXZlQWRkcigpIHtcbiAgICAgICAgICAgIGxldCBfdGhpcyA9IHRoaXNcbiAgICAgICAgICAgIHd4LmNob29zZUxvY2F0aW9uKHtcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWNlaXZlX2FkZHI6IHJlcy5uYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVjZWl2ZV9leHRyYWxBZGRyOiByZXMuYWRkcmVzcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhdDogcmVzLmxhdGl0dWRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgbG5nOiByZXMubG9uZ2l0dWRlXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSxcblxuICAgICAgICAvLyDorr7kuLrpu5jorqTlgLxcbiAgICAgICAgZGVmYXVsdENoYW5nZShlKSB7XG4gICAgICAgICAgICBsZXQgaXNkZWZhdWx0ID0gZS5kZXRhaWwudmFsdWUubGVuZ3RoID4gMCA/IDEgOiAwXG4gICAgICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgICAgICAgIGlzX2RlZmF1bHQ6IGlzZGVmYXVsdFxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSxcblxuICAgICAgICAvL+S/neWtmOWcsOWdgFxuICAgICAgICBjb25maXJtU2F2ZTogYXN5bmMgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgbGV0IHF1ZXJ5UGFyYW0gPSBlLmRldGFpbC52YWx1ZVxuICAgICAgICAgICAgbGV0IHVzZXJJbmZvID0gd3guZ2V0U3RvcmFnZVN5bmMoJ3VzZXJJbmZvJylcblxuICAgICAgICAgICAgaWYgKCFxdWVyeVBhcmFtLnJlY2VpdmVfbmFtZSkge1xuICAgICAgICAgICAgICAgIFRJUC5zaG93RXJyTXNnKHRoaXMsICfor7floavlhpnmlLbotKfkurrlp5PlkI0nKVxuICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFxdWVyeVBhcmFtLnJlY2VpdmVfbW9iaWxlKSB7XG4gICAgICAgICAgICAgICAgVElQLnNob3dFcnJNc2codGhpcywgJ+ivt+Whq+WGmeaUtui0p+S6uuiBlOezu+eUteivnScpXG4gICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXF1ZXJ5UGFyYW0ucmVjZWl2ZV9hZGRyKSB7XG4gICAgICAgICAgICAgICAgVElQLnNob3dFcnJNc2codGhpcywgJ+ivt+Whq+WGmeaUtui0p+WcsOWdgCcpXG4gICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgcmUgPSAvXjFcXGR7MTB9L2dcbiAgICAgICAgICAgIGlmICghcmUudGVzdChxdWVyeVBhcmFtLnJlY2VpdmVfbW9iaWxlKSkge1xuICAgICAgICAgICAgICAgIFRJUC5zaG93RXJyTXNnKHRoaXMsICfmiYvmnLrlj7fnoIHmoLzlvI/kuI3mraPnoa4nKVxuICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgcGFyYW0gPSB7XG4gICAgICAgICAgICAgICAgY29uc2lnbmVlOiBxdWVyeVBhcmFtLnJlY2VpdmVfbmFtZSxcbiAgICAgICAgICAgICAgICBhZGRyZXNzOiBxdWVyeVBhcmFtLnJlY2VpdmVfYWRkcixcbiAgICAgICAgICAgICAgICBidWlsZGluZzogcXVlcnlQYXJhbS5yZWNlaXZlX2V4dHJhbEFkZHIsXG4gICAgICAgICAgICAgICAgbW9iaWxlOiBxdWVyeVBhcmFtLnJlY2VpdmVfbW9iaWxlLFxuICAgICAgICAgICAgICAgIGxhdDogdGhpcy5kYXRhLmxhdCxcbiAgICAgICAgICAgICAgICBsbmc6IHRoaXMuZGF0YS5sbmcsXG4gICAgICAgICAgICAgICAgaXNfZGVmYXVsdDogdGhpcy5kYXRhLmlzX2RlZmF1bHRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGF3YWl0IGZpbHRlclNlcnZpY2UuY29uZmlybUFkZHIoeyBwYXJhbXM6IHBhcmFtIH0pXG4gICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ+S/neWtmOaIkOWKnycsXG4gICAgICAgICAgICAgICAgICAgIGljb246ICdzdWNjZXNzJyxcbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDIwMDBcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC8vIOi/lOWbnumhtemdouaYr+WQpuWBmuWIt+aWsOWKqOS9nFxuICAgICAgICAgICAgbGV0IHBhZ2VzID0gZ2V0Q3VycmVudFBhZ2VzKCk7IC8v5b2T5YmN6aG16Z2iXG4gICAgICAgICAgICBsZXQgcHJldlBhZ2UgPSBwYWdlc1twYWdlcy5sZW5ndGggLSAyXTsgLy/kuIrkuIDpobXpnaJcbiAgICAgICAgICAgIHByZXZQYWdlLnNldERhdGEoeyAvL+ebtOaOpee7meS4iuenu+mhtemdoui1i+WAvFxuICAgICAgICAgICAgICAgIG9uc2hvdzogdHJ1ZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB3eC5uYXZpZ2F0ZUJhY2soKVxuXG4gICAgICAgIH0sXG4gICAgICAgIG9uU2hvdzogZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgfSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5Yqg6L29XG4gICAgICAgICAqL1xuICAgICAgICBvbkxvYWQ6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAgICAgICAgIHRoaXMuYXJlYUluZm8oKVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdouWIneasoea4suafk+WujOaIkFxuICAgICAgICAgKi9cbiAgICAgICAgb25SZWFkeTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IHd4LmNyZWF0ZUFuaW1hdGlvbih7XG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtT3JpZ2luOiBcIjUwJSA1MCVcIixcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogMCxcbiAgICAgICAgICAgICAgICB0aW1pbmdGdW5jdGlvbjogXCJlYXNlXCIsXG4gICAgICAgICAgICAgICAgZGVsYXk6IDBcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi50cmFuc2xhdGVZKDIwMCArICd2aCcpLnN0ZXAoKTtcbiAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uOiB0aGlzLmFuaW1hdGlvbi5leHBvcnQoKSxcbiAgICAgICAgICAgICAgICBzaG93OiBzaG93XG4gICAgICAgICAgICB9KVxuICAgICAgICB9LFxuICAgICAgICAvL+a7keWKqOS6i+S7tlxuICAgICAgICBiaW5kQ2hhbmdlOiBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICB2YXIgdmFsID0gZS5kZXRhaWwudmFsdWVcbiAgICAgICAgICAgIGlmIChpbmRleFswXSAhPSB2YWxbMF0pIHtcbiAgICAgICAgICAgICAgICB2YWxbMV0gPSAwO1xuICAgICAgICAgICAgICAgIHZhbFsyXSA9IDA7XG4gICAgICAgICAgICAgICAgZ2V0Q2l0eUFycih2YWxbMF0sIHRoaXMpOyAvL+iOt+WPluWcsOe6p+W4guaVsOaNrlxuICAgICAgICAgICAgICAgIGdldENvdW50eUluZm8odmFsWzBdLCB2YWxbMV0sIHRoaXMpOyAvL+iOt+WPluWMuuWOv+aVsOaNrlxuICAgICAgICAgICAgfSBlbHNlIHsgLy/oi6XnnIHku71jb2x1bW7mnKrlgZrmu5HliqjvvIzlnLDnuqfluILlgZrkuobmu5HliqjliJnlrprkvY3ljLrljr/nrKzkuIDkvY1cbiAgICAgICAgICAgICAgICBpZiAoaW5kZXhbMV0gIT0gdmFsWzFdKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbFsyXSA9IDA7XG4gICAgICAgICAgICAgICAgICAgIGdldENvdW50eUluZm8odmFsWzBdLCB2YWxbMV0sIHRoaXMpOyAvL+iOt+WPluWMuuWOv+aVsOaNrlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGluZGV4ID0gdmFsO1xuICAgICAgICAgICAgLy/mm7TmlrDmlbDmja5cbiAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgICAgICAgdmFsdWU6IFt2YWxbMF0sIHZhbFsxXSwgdmFsWzJdXSxcbiAgICAgICAgICAgICAgICBwcm92aW5jZTogcHJvdmluY2VzW3ZhbFswXV0ubmFtZSxcbiAgICAgICAgICAgICAgICBjaXR5OiBjaXR5c1t2YWxbMV1dLm5hbWUsXG4gICAgICAgICAgICAgICAgY291bnR5OiBjb3VudHlzW3ZhbFsyXV0ubmFtZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSxcbiAgICAgICAgLy/pmpDol4/lvLnnqpfmta7lsYJcbiAgICAgICAgaGlkZGVuRmxvYXRWaWV3KGUpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgICAgICAgY2xhc3NTdHlsZTogJ3NsaWRlT3V0RG93bidcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBtb3ZlWSA9IDIwMDtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgc2hvdyA9IHRydWU7XG4gICAgICAgICAgICB9LCAzMDApXG4gICAgICAgICAgICB0ID0gMDtcbiAgICAgICAgICAgIGFuaW1hdGlvbkV2ZW50cyh0aGlzLCBtb3ZlWSwgc2hvdyk7XG5cbiAgICAgICAgfSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIOeUqOaIt+eCueWHu+WPs+S4iuinkuWIhuS6q1xuICAgICAgICAgKi9cbiAgICAgICAgb25TaGFyZUFwcE1lc3NhZ2U6IGZ1bmN0aW9uKHJlcykge1xuXG4gICAgICAgIH1cblxuXG4gICAgfSlcbiAgICAvL+WKqOeUu+S6i+S7tlxuZnVuY3Rpb24gYW5pbWF0aW9uRXZlbnRzKHRoYXQsIG1vdmVZLCBzaG93KSB7XG5cbiAgICB0aGF0LmFuaW1hdGlvbiA9IHd4LmNyZWF0ZUFuaW1hdGlvbih7XG4gICAgICAgIHRyYW5zZm9ybU9yaWdpbjogXCI1MCUgNTAlXCIsXG4gICAgICAgIGR1cmF0aW9uOiA0MDAsXG4gICAgICAgIHRpbWluZ0Z1bmN0aW9uOiBcImVhc2VcIixcbiAgICAgICAgZGVsYXk6IDBcbiAgICB9KVxuICAgIHRoYXQuYW5pbWF0aW9uLnRyYW5zbGF0ZVkobW92ZVkgKyAndmgnKS5zdGVwKClcblxuICAgIHRoYXQuc2V0RGF0YSh7XG4gICAgICAgIGFuaW1hdGlvbjogdGhhdC5hbmltYXRpb24uZXhwb3J0KCksXG4gICAgICAgIHNob3c6IHNob3dcbiAgICB9KVxuXG59XG4vL+iOt+WPluecgeS7veaVsOaNrlxuZnVuY3Rpb24gZ2V0UHJvdmluY2VEYXRhKHRoYXQpIHtcbiAgICB2YXIgcztcbiAgICBwcm92aW5jZXMgPSBbXTtcbiAgICB2YXIgbnVtID0gMDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZWFJbmZvLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHMgPSBhcmVhSW5mb1tpXTtcbiAgICAgICAgaWYgKHMuZGkgPT0gXCIwMFwiICYmIHMueGlhbiA9PSBcIjAwXCIpIHtcbiAgICAgICAgICAgIHByb3ZpbmNlc1tudW1dID0gcztcbiAgICAgICAgICAgIG51bSsrO1xuICAgICAgICB9XG4gICAgfVxuICAgIHRoYXQuc2V0RGF0YSh7XG4gICAgICAgIHByb3ZpbmNlczogcHJvdmluY2VzXG4gICAgfSlcblxuICAgIC8v5Yid5aeL5YyW6LCD5LiA5qyhXG4gICAgZ2V0Q2l0eUFycigwLCB0aGF0KTtcbiAgICBnZXRDb3VudHlJbmZvKDAsIDAsIHRoYXQpO1xuXG5cbn1cblxuLy8g6I635Y+W5Zyw57qn5biC5pWw5o2uXG5mdW5jdGlvbiBnZXRDaXR5QXJyKGNvdW50LCB0aGF0KSB7XG4gICAgdmFyIGM7XG4gICAgY2l0eXMgPSBbXTtcbiAgICB2YXIgbnVtID0gMDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZWFJbmZvLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGMgPSBhcmVhSW5mb1tpXTtcbiAgICAgICAgaWYgKGMueGlhbiA9PSBcIjAwXCIgJiYgYy5zaGVuZyA9PSBwcm92aW5jZXNbY291bnRdLnNoZW5nICYmIGMuZGkgIT0gXCIwMFwiKSB7XG4gICAgICAgICAgICBjaXR5c1tudW1dID0gYztcbiAgICAgICAgICAgIG51bSsrO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChjaXR5cy5sZW5ndGggPT0gMCkge1xuICAgICAgICBjaXR5c1swXSA9IHtcbiAgICAgICAgICAgIG5hbWU6ICcnXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgdGhhdC5zZXREYXRhKHtcbiAgICAgICAgY2l0eTogXCJcIixcbiAgICAgICAgY2l0eXM6IGNpdHlzLFxuICAgICAgICB2YWx1ZTogW2NvdW50LCAwLCAwXVxuICAgIH0pXG59XG5cbi8vIOiOt+WPluWMuuWOv+aVsOaNrlxuZnVuY3Rpb24gZ2V0Q291bnR5SW5mbyhjb2x1bW4wLCBjb2x1bW4xLCB0aGF0KSB7XG4gICAgdmFyIGM7XG4gICAgY291bnR5cyA9IFtdO1xuICAgIHZhciBudW0gPSAwO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJlYUluZm8ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgYyA9IGFyZWFJbmZvW2ldO1xuICAgICAgICBpZiAoYy54aWFuICE9IFwiMDBcIiAmJiBjLnNoZW5nID09IHByb3ZpbmNlc1tjb2x1bW4wXS5zaGVuZyAmJiBjLmRpID09IGNpdHlzW2NvbHVtbjFdLmRpKSB7XG4gICAgICAgICAgICBjb3VudHlzW251bV0gPSBjO1xuICAgICAgICAgICAgbnVtKys7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKGNvdW50eXMubGVuZ3RoID09IDApIHtcbiAgICAgICAgY291bnR5c1swXSA9IHtcbiAgICAgICAgICAgIG5hbWU6ICcnXG4gICAgICAgIH07XG4gICAgfVxuICAgIHRoYXQuc2V0RGF0YSh7XG4gICAgICAgIGNvdW50eTogXCJcIixcbiAgICAgICAgY291bnR5czogY291bnR5cyxcbiAgICAgICAgdmFsdWU6IFtjb2x1bW4wLCBjb2x1bW4xLCAwXVxuICAgIH0pXG59Il19
