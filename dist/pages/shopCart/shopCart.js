var regeneratorRuntime = require("../../lib/runtime.js");"use strict";

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * ps：数据加减删除都有请求接口做数据库对应数据更改，但前台未进行数据的重新请求渲染，次放法适合不允许多端一起在线操作
 */

var regeneratorRuntime = require("../../lib/runtime.js");
"use strict";
var app = getApp();
var filterService = require('../../service/filterService');
Page({
    data: {
        saveHidden: true, //结算按钮隐藏与否
        totalPrice: 0, //总价
        totalScoreToPay: 0, //购买所积累的积分
        allSelect: true, //是否全选
        noSelect: false, //是否有选中的商品
        list: [], //循环的数据
        selectedID: [], //选中的ID，这里用逗号隔开
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
    onLoad: function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
            var shopList, that, shopCarInfoMem;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            this.initEleWidth();
                            shopList = [];
                            that = this;
                            // 获取购物车数据

                            _context.next = 5;
                            return filterService.getShopCart();

                        case 5:
                            shopCarInfoMem = _context.sent;

                            if (shopCarInfoMem && shopCarInfoMem.shopList) {
                                shopList = shopCarInfoMem.shopList;
                                shopList.forEach(function (item) {
                                    that.data.selectedID.push(item.goodsId);
                                });
                            }
                            this.data.list = shopList;
                            this.setGoodsList(this.getSaveHide(), this.totalPrice(), this.allSelect(), this.noSelect(), shopList);

                        case 9:
                        case "end":
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));

        function onLoad() {
            return _ref.apply(this, arguments);
        }

        return onLoad;
    }(),
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
            var list = this.data.list;
            if (index != "" && index != null) {
                list[parseInt(index)].left = left;
                this.setGoodsList(this.getSaveHide(), this.totalPrice(), this.allSelect(), this.noSelect(), list);
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
            var list = this.data.list;
            if (index !== "" && index != null) {
                list[parseInt(index)].left = left;
                this.setGoodsList(this.getSaveHide(), this.totalPrice(), this.allSelect(), this.noSelect(), list);
            }
        }
    },
    // 单条数据删除
    delItem: function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(e) {
            var index, list, selectedID, param;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            index = e.currentTarget.dataset.index;
                            list = this.data.list;
                            selectedID = this.data.selectedID;
                            param = {
                                id: e.currentTarget.dataset.id //当前数据ID
                            };
                            _context2.next = 6;
                            return filterService.delCartList({ params: param });

                        case 6:
                            list.splice(index, 1);
                            this.setGoodsList(this.getSaveHide(), this.totalPrice(), this.allSelect(), this.noSelect(), list);

                        case 8:
                        case "end":
                            return _context2.stop();
                    }
                }
            }, _callee2, this);
        }));

        function delItem(_x) {
            return _ref2.apply(this, arguments);
        }

        return delItem;
    }(),
    // 单条选择
    selectTap: function selectTap(e) {
        var index = e.currentTarget.dataset.index;
        var id = e.currentTarget.dataset.id;
        var list = this.data.list;
        if (index !== "" && index != null) {
            list[parseInt(index)].active = !list[parseInt(index)].active;
            this.setGoodsList(this.getSaveHide(), this.totalPrice(), this.allSelect(), this.noSelect(), list);
        }
    },
    // 计算总价
    totalPrice: function totalPrice() {
        //通过接口计算价格
        // let param={
        //   id:this.data.selectedID
        // }
        // let result=await filterService.totalPrice()
        // 前台计算价格
        var list = this.data.list;
        var total = 0;
        var totalScoreToPay = 0;
        for (var i = 0; i < list.length; i++) {
            var curItem = list[i];
            if (curItem.active) {
                total += parseFloat(curItem.price) * curItem.number;
                totalScoreToPay += curItem.score * curItem.number;
            }
        }
        this.data.totalScoreToPay = totalScoreToPay;
        total = parseFloat(total.toFixed(2)); //js浮点计算bug，取两位小数精度
        return total;
    },
    // 是否全选
    allSelect: function allSelect() {
        var list = this.data.list;
        var allSelect = false;
        for (var i = 0; i < list.length; i++) {
            var curItem = list[i];
            if (curItem.active) {
                allSelect = true;
            } else {
                allSelect = false;
                break;
            }
        }
        return allSelect;
    },
    // 是否没有全选为了结算，删除按钮是否变灰色
    noSelect: function noSelect() {
        var list = this.data.list;
        var noSelect = 0;
        for (var i = 0; i < list.length; i++) {
            var curItem = list[i];
            if (!curItem.active) {
                noSelect++;
            }
        }
        if (noSelect == list.length) {
            return true;
        } else {
            return false;
        }
    },
    // 
    setGoodsList: function setGoodsList(saveHidden, total, allSelect, noSelect, list) {
        this.setData({
            saveHidden: saveHidden,
            totalPrice: total,
            allSelect: allSelect,
            noSelect: noSelect,
            list: list,
            selectedID: this.selectedID(list),
            totalScoreToPay: this.data.totalScoreToPay
        });
    },
    // 全选事件
    bindAllSelect: function bindAllSelect() {
        var currentAllSelect = this.data.allSelect;
        var list = this.data.list;
        if (currentAllSelect) {
            for (var i = 0; i < list.length; i++) {
                var curItem = list[i];
                curItem.active = false;
            }
        } else {
            for (var _i = 0; _i < list.length; _i++) {
                var _curItem = list[_i];
                _curItem.active = true;
            }
        }

        this.setGoodsList(this.getSaveHide(), this.totalPrice(), !currentAllSelect, this.noSelect(), list);
    },
    // 商品数量增加
    jiaBtnTap: function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(e) {
            var index, list, param, carShopBeanStores, result;
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            index = e.currentTarget.dataset.index;
                            list = that.data.list;

                            if (!(index !== "" && index != null)) {
                                _context3.next = 11;
                                break;
                            }

                            // 添加判断当前商品购买数量是否超过当前商品可购买库存
                            param = {
                                id: list[parseInt(index)].goodsId
                            };
                            carShopBeanStores = 0;
                            _context3.next = 7;
                            return filterService.addShopCart({ params: param });

                        case 7:
                            result = _context3.sent;

                            carShopBeanStores = result.stores; //库存
                            if (list[parseInt(index)].number < carShopBeanStores) {
                                list[parseInt(index)].number++;
                                this.setGoodsList(this.getSaveHide(), this.totalPrice(), this.allSelect(), this.noSelect(), list);
                            }
                            this.setData({
                                curTouchGoodStore: carShopBeanStores
                            });

                        case 11:
                        case "end":
                            return _context3.stop();
                    }
                }
            }, _callee3, this);
        }));

        function jiaBtnTap(_x2) {
            return _ref3.apply(this, arguments);
        }

        return jiaBtnTap;
    }(),
    // 商品数量减少
    jianBtnTap: function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(e) {
            var index, param, list, result;
            return regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            index = e.currentTarget.dataset.index;
                            param = {
                                id: list[parseInt(index)].goodsId
                            };
                            list = this.data.list;

                            if (!(index !== "" && index != null)) {
                                _context4.next = 10;
                                break;
                            }

                            if (!(list[parseInt(index)].number > 1)) {
                                _context4.next = 10;
                                break;
                            }

                            _context4.next = 7;
                            return filterService.cutShopCart({ params: param });

                        case 7:
                            result = _context4.sent;

                            list[parseInt(index)].number--;
                            this.setGoodsList(this.getSaveHide(), this.totalPrice(), this.allSelect(), this.noSelect(), list);

                        case 10:
                        case "end":
                            return _context4.stop();
                    }
                }
            }, _callee4, this);
        }));

        function jianBtnTap(_x3) {
            return _ref4.apply(this, arguments);
        }

        return jianBtnTap;
    }(),
    // 编辑
    editTap: function editTap() {
        var list = this.data.list;
        for (var i = 0; i < list.length; i++) {
            var curItem = list[i];
            curItem.active = false;
        }
        this.setGoodsList(!this.getSaveHide(), this.totalPrice(), this.allSelect(), this.noSelect(), list);
    },
    // 完成
    saveTap: function saveTap() {
        console.log(this.data.selectedID);
        var list = this.data.list;
        for (var i = 0; i < list.length; i++) {
            var curItem = list[i];
            curItem.active = true;
        }
        this.setGoodsList(!this.getSaveHide(), this.totalPrice(), this.allSelect(), this.noSelect(), list);
    },
    getSaveHide: function getSaveHide() {
        var saveHidden = this.data.saveHidden;
        return saveHidden;
    },
    // 删除选中的
    deleteSelected: function deleteSelected() {
        var list = this.data.list;
        list = list.filter(function (curGoods) {
            return !curGoods.active;
        });
        this.setGoodsList(this.getSaveHide(), this.totalPrice(), this.allSelect(), this.noSelect(), list);
    },
    // 选中的数据ID
    selectedID: function selectedID(list) {
        var selectedID = [];
        list.forEach(function (item) {
            if (item.active) {
                selectedID.push(item.goodsId);
            }
        });
        return selectedID;
    },

    // 结算
    toPayOrder: function () {
        var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
            var param;
            return regeneratorRuntime.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                            wx.showLoading();

                            if (!this.data.noSelect) {
                                _context5.next = 4;
                                break;
                            }

                            wx.hideLoading();
                            return _context5.abrupt("return");

                        case 4:
                            param = {
                                selectedID: this.data.selectedID
                            };
                            _context5.next = 7;
                            return filterService.confirmOrder({ params: param });

                        case 7:
                            wx.hideLoading();
                            wx.navigateTo({
                                url: '../index/index'
                            });

                        case 9:
                        case "end":
                            return _context5.stop();
                    }
                }
            }, _callee5, this);
        }));

        function toPayOrder() {
            return _ref5.apply(this, arguments);
        }

        return toPayOrder;
    }()
});