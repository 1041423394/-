var regeneratorRuntime = require("../../lib/runtime.js");'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var Component = require('../component');
var filterService = require('../../service/filterService');
var app = getApp();

module.exports = {
    /**
     * 默认参数
     */
    setDefaults: function setDefaults() {
        return {
            className: undefined,
            screenHeight: '',
            currentId: '', //当前点击的ID对象
            keys: [],
            selectArr: [],
            keyup: false,
            searchArr: [], //下拉列表
            selectClick: function selectClick() {},
            //下拉列表单击
            searchInput: function searchInput() {},
            //搜索
            cancel: function cancel() {}
        };
    },
    show: function show() {
        var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        var options = Object.assign({
            animateCss: undefined,
            visible: !1
        }, this.setDefaults(), opts);
        // 实例化组件
        var component = new Component({
            scope: '$fml.autoSelect', //组件作用域
            data: options, //组件data数据
            methods: { //组件方法
                init: function () {
                    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                        var _this, result;

                        return regeneratorRuntime.wrap(function _callee$(_context) {
                            while (1) {
                                switch (_context.prev = _context.next) {
                                    case 0:
                                        _this = this;

                                        wx.getSystemInfo({
                                            success: function success(res) {
                                                var screenHeight = res.windowHeight - 45;
                                                _this.setComponentData({
                                                    screenHeight: screenHeight
                                                });
                                            }
                                        });
                                        _this = this;
                                        result = filterService.getFilterData();
                                        //var selectItem = res.body

                                        _this.initSelect(result.data);

                                    case 5:
                                    case 'end':
                                        return _context.stop();
                                }
                            }
                        }, _callee, this);
                    }));

                    function init() {
                        return _ref.apply(this, arguments);
                    }

                    return init;
                }(),
                initSelect: function initSelect(selectItem) {
                    var keys = [];
                    for (var i = 0; i < selectItem.length; i++) {
                        keys.push(selectItem[i]['key']);
                    }
                    this.setComponentData({
                        keys: keys,
                        selectArr: selectItem,
                        searchArr: selectItem
                    });
                },


                /**
                 * 隐藏
                 */
                removeModal: function removeModal(callback) {
                    if (this.removed) return !1;
                    this.removed = !0;
                    this.setHidden(['slideOutLeft', 'fadeOut']);
                },

                /**
                 * 显示
                 */
                showModal: function showModal() {
                    if (this.removed) return !1;
                    this.setVisible(['slideInRight', 'fadeIn']);
                },
                searchInput: function searchInput(e) {
                    var _this = this;
                    var valInput = e.detail.value.toUpperCase();
                    var selectArr = _this._data.selectArr;
                    if (valInput != '') {
                        this.setComponentData({
                            keyup: true,
                            searchArr: _this.searchHandle(selectArr, valInput)
                        });
                    } else {
                        this.setComponentData({
                            keyup: false,
                            searchArr: selectArr
                        });
                    }
                },
                searchHandle: function searchHandle(selectArr, valInput) {
                    var select = [];
                    //const keys=[]
                    for (var i = 0; i < selectArr.length; i++) {
                        var cols = selectArr[i]['cols'];
                        //keys.push(selectArr[i]['key'])
                        for (var j = 0; j < cols.length; j++) {
                            if (cols[j]['searchs'].indexOf(valInput) > -1 || cols[j]['display'].indexOf(valInput) > -1) {
                                select.push(cols[j]);
                            }
                        }
                    }
                    //console.log(select)
                    return select;
                },
                selectClick: function selectClick(e) {
                    var _this = this;
                    var index = e.currentTarget.dataset.index;
                    var componentData = this.getComponentData();
                    var keyItem = e.currentTarget.dataset.key;
                    var keys = componentData.keys;
                    var Pindex = keys.indexOf(keyItem);
                    if (Pindex > -1) {
                        var item = componentData.searchArr[Pindex]['cols'][index];
                    } else {
                        var item = componentData.searchArr[index];
                    }

                    options.selectCompail(item);
                    this.removeModal(options.cancel);
                },


                /**
                 * 取消按钮点击事件
                 */
                cancel: function cancel() {
                    this.removeModal(options.cancel);
                }
            }
        });

        component.showModal();
        component.init();

        return component.cancel;
    }
};