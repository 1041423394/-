var regeneratorRuntime = require("../../lib/runtime.js");'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var filterService = require('../../service/filterService.js');
var app = getApp();
Page({
    /**
     * currentCity 当前城市
     * initialList 后台返回的城市列表信息
     * initCityList 初次渲染展示的城市列表 
     * searchResult 搜索结果数据 
     * keyup 是否输入搜索 true搜索 false未启动搜索
     * historyCity 历史访问城市 暂时缓存设置最新访问的5个城市信息
     * 
     */
    data: {
        currentCity: '杭州',
        initialList: [],
        initCityList: [],
        searchResult: [],
        keyup: false,
        historyCity: []
    },
    //搜索
    searchInput: function searchInput(e) {
        var valInput = e.detail.value.toLowerCase(); //搜索关键字
        var initialList = this.data.initialList; //检索数据
        if (valInput != '') {
            this.setData({
                keyup: true,
                searchResult: this.searchHandle(initialList, valInput)
            });
        } else {
            this.setData({
                keyup: false
            });
        }
    },

    // 输入值处理
    searchHandle: function searchHandle(initialList, valInput) {
        var searchResult = [];
        for (var i = 0; i < initialList.length; i++) {
            if (initialList[i]['pinyin'].indexOf(valInput) > -1 || initialList[i]['name'].indexOf(valInput) > -1) {
                searchResult.push(initialList[i]);
            }
        }
        return searchResult;
    },


    // 城市列表初始化处理
    initCity: function initCity(selectItem) {
        var initCityList = [],
            keys = []; //ABCD...
        for (var i = 0; i < selectItem.length; i++) {
            var searchList = {},
                cols = [],
                firstLetter = selectItem[i].pinyin.slice(0, 1).toUpperCase(),
                //获取pinyin字段第一个字符
            name = selectItem[i].name,
                //城市名
            id = selectItem[i].region_id,
                //城市标识id
            index = keys.indexOf(firstLetter); //取出来的首字母的位置
            // 判断取出来的首字母是否存在
            if (index > -1) {
                initCityList[index]['cols'].push({
                    region_id: id,
                    name: name
                });
            } else {
                keys.push(firstLetter);
                searchList['key'] = firstLetter;
                searchList['id'] = keys.length - 1;
                cols.push({
                    region_id: id,
                    name: name
                });
                searchList['cols'] = cols;
                initCityList.push(searchList);
            }
        }
        keys = keys.sort(); //按ABCD...顺序排序展示
        this.setData({
            keys: keys,
            initialList: selectItem,
            initCityList: initCityList
        });
    },


    //地址单击事件 
    selectClick: function selectClick(e) {
        var Pindex = e.currentTarget.dataset.id,
            //全部数据中的某条数据索引
        id = e.currentTarget.dataset.pid,
            Cindex = e.currentTarget.dataset.index; //cols中某条数据的索引
        if (typeof Pindex == 'number') {
            var item = this.data.initCityList[Pindex]['cols'][Cindex].name;
        } else {
            var item = this.data.searchResult[Cindex].name;
        }
        this.selectCompail(item, id);
    },


    //最近访问记录单击 
    historyClick: function historyClick(e) {
        var id = e.currentTarget.dataset.id;
        var item = e.currentTarget.dataset.item;
        this.selectCompail(item, id);
    },


    //单击完成回首页
    selectCompail: function selectCompail(item, id) {
        var oldHistoryCity = this.data.historyCity; //缓存中有的数据
        var newHistoryCity = [{ region_id: id, name: item }]; //单击产生的新数据
        var arrCity = []; //存储历史记录的城市ID
        var wxShowModal = app.wxPromisify(wx.showModal);
        if (oldHistoryCity) {
            oldHistoryCity.forEach(function (city) {
                arrCity.push(city.region_id);
            });
        }
        wxShowModal({
            title: app.globalData.projectName,
            content: '是否切换成所选城市'
        }).then(function (res) {
            if (res.confirm) {
                wx.setStorageSync('selectedCity', { id: id, name: item }); //存储当前选择的城市
                wx.reLaunch({
                    url: '../index/index'
                });
                if (oldHistoryCity) {
                    // 判断当前选择的城市是否存在于已有的缓存数据
                    if (arrCity.indexOf(id) < 0) {
                        var unshiftData = [{
                            region_id: id,
                            name: item
                        }];
                        oldHistoryCity.unshift(unshiftData[0]);
                    } else {
                        // 当前选择的数据永远放在第一位
                        var _unshiftData = oldHistoryCity.splice(arrCity.indexOf(id), 1);
                        oldHistoryCity.unshift(_unshiftData[0]);
                    }
                    // 只缓存五条数据
                    if (oldHistoryCity.length > 5) {
                        oldHistoryCity.splice(5, oldHistoryCity.length - 5);
                    }
                    wx.setStorage({
                        key: 'historyCity',
                        data: oldHistoryCity
                    });
                } else {
                    // 缓存选定的城市
                    wx.setStorage({
                        key: 'historyCity',
                        data: newHistoryCity
                    });
                }
            }
        });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(options) {
            var historyCity, cityList, result;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            historyCity = wx.getStorageSync('historyCity');
                            cityList = wx.getStorageSync('cityList');

                            this.setData({
                                historyCity: historyCity
                            });

                            if (!cityList) {
                                _context.next = 7;
                                break;
                            }

                            this.initCity(cityList);
                            _context.next = 12;
                            break;

                        case 7:
                            _context.next = 9;
                            return filterService.getCityList();

                        case 9:
                            result = _context.sent;

                            this.initCity(result.data);
                            wx.setStorageSync('cityList', result.data);

                        case 12:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));

        function onLoad(_x) {
            return _ref.apply(this, arguments);
        }

        return onLoad;
    }(),

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function onReady() {},

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function onShow() {},
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function onShareAppMessage() {}
});