var regeneratorRuntime = require("../lib/runtime.js");"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 模块化组件
 * @param {Object} options 配置项
 * @param {String} options.scope 组件的命名空间
 * @param {Object} options.data 组件的动态数据
 * @param {Object} options.methods 组件的事件函数
 */
var Component = function () {
    function Component() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, Component);

        Object.assign(this, {
            options: options
        });
        this.__init();
    }

    /**
     * 初始化
     */


    _createClass(Component, [{
        key: "__init",
        value: function __init() {
            this.page = getCurrentPages()[getCurrentPages().length - 1];
            this.setData = this.page.setData.bind(this.page);
            this.__initState();
        }

        /**
         * 初始化组件状态
         */

    }, {
        key: "__initState",
        value: function __initState() {
            this.options.data && this.__initData();
            this.options.methods && this.__initMethods();
        }

        /**
         * 绑定组件动态数据
         */

    }, {
        key: "__initData",
        value: function __initData() {
            var scope = this.options.scope;
            var data = this.options.data;

            this._data = {};

            // 筛选非函数类型，更改参数中函数的 this 指向
            if (!this.isEmptyObject(data)) {
                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                        if (typeof data[key] === "function") {
                            data[key] = data[key].bind(this);
                        } else {
                            this._data[key] = data[key];
                        }
                    }
                }
            }

            // 将数据同步到 page.data 上面方便渲染组件
            this.page.setData(_defineProperty({}, "" + scope, this._data));
        }

        /**
         * 绑定组件事件函数
         */

    }, {
        key: "__initMethods",
        value: function __initMethods() {
            var scope = this.options.scope;
            var methods = this.options.methods;

            // 筛选函数类型
            if (!this.isEmptyObject(methods)) {
                for (var key in methods) {
                    if (methods.hasOwnProperty(key) && typeof methods[key] === "function") {
                        this[key] = methods[key] = methods[key].bind(this);

                        // 将 methods 内的方法重命名并挂载到 page 上面，否则 template 内找不到事件
                        this.page[scope + "." + key] = methods[key];

                        // 将方法名同步至 page.data 上面，方便在模板内使用 {{ method }} 方式绑定事件
                        this.setData(_defineProperty({}, scope + "." + key, scope + "." + key));
                    }
                }
            }
        }

        /**
         * 获取组件的 data 数据
         */

    }, {
        key: "getComponentData",
        value: function getComponentData() {
            var data = this.page.data;
            var name = this.options.scope && this.options.scope.split(".");
            name.forEach(function (n, i) {
                data = data[n];
            });

            return data;
        }

        /**
         * 设置组件的data数据
         */

    }, {
        key: "setComponentData",
        value: function setComponentData(data) {
            var scope = this.options.scope;
            this._data = this.getComponentData();
            // 筛选非函数类型，更改参数中函数的 this 指向
            if (!this.isEmptyObject(data)) {
                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                        if (typeof data[key] === "function") {
                            data[key] = data[key].bind(this);
                        } else {
                            this._data[key] = data[key];
                        }
                    }
                }
            }
            // 将数据同步到 page.data 上面方便渲染组件
            this.page.setData(_defineProperty({}, "" + scope, this._data));
        }

        /**
         * 判断 object 是否为空
         */

    }, {
        key: "isEmptyObject",
        value: function isEmptyObject(e) {
            for (var t in e) {
                return !1;
            }return !0;
        }

        /**
         * 设置元素显示
         */

    }, {
        key: "setVisible",
        value: function setVisible() {
            var _setData2;

            var className = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "fadeIn";

            this.setData((_setData2 = {}, _defineProperty(_setData2, this.options.scope + ".animateCss", className), _defineProperty(_setData2, this.options.scope + ".visible", !0), _setData2));
        }

        /**
         * 设置元素隐藏
         */

    }, {
        key: "setHidden",
        value: function setHidden() {
            var _this = this;

            var className = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "fadeOut";
            var timer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 300;

            this.setData(_defineProperty({}, this.options.scope + ".animateCss", className));
            setTimeout(function () {
                _this.setData(_defineProperty({}, _this.options.scope + ".visible", !1));
            }, timer);
        }
    }]);

    return Component;
}();

module.exports = Component;