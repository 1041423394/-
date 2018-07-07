let Component = require('../component')
var filterService = require('../../service/filterService')
var app = getApp();

module.exports = {
    /**
     * 默认参数
     */
    setDefaults() {
        return {
            className: undefined,
            screenHeight: '',
            currentId: '', //当前点击的ID对象
            keys: [],
            selectArr: [],
            keyup: false,
            searchArr: [], //下拉列表
            selectClick() {}, //下拉列表单击
            searchInput() {}, //搜索
            cancel() {}
        }
    },
    show(opts = {}) {
        const options = Object.assign({
                animateCss: undefined,
                visible: !1,
            }, this.setDefaults(), opts)
            // 实例化组件
        const component = new Component({
            scope: `$fml.autoSelect`, //组件作用域
            data: options, //组件data数据
            methods: { //组件方法
                init: async function() {
                    var _this = this
                    wx.getSystemInfo({
                        success: function(res) {
                            var screenHeight = res.windowHeight - 45
                            _this.setComponentData({
                                screenHeight: screenHeight
                            })
                        }
                    })
                    var _this = this;
                    let result = filterService.getFilterData()
                        //var selectItem = res.body
                    _this.initSelect(result.data)

                },
                initSelect(selectItem) {
                    var keys = []
                    for (var i = 0; i < selectItem.length; i++) {
                        keys.push(selectItem[i]['key'])
                    }
                    this.setComponentData({
                        keys: keys,
                        selectArr: selectItem,
                        searchArr: selectItem
                    })

                },

                /**
                 * 隐藏
                 */
                removeModal(callback) {
                    if (this.removed) return !1
                    this.removed = !0
                    this.setHidden([`slideOutLeft`, `fadeOut`])
                },
                /**
                 * 显示
                 */
                showModal() {
                    if (this.removed) return !1
                    this.setVisible([`slideInRight`, `fadeIn`])
                },

                searchInput(e) {
                    var _this = this
                    const valInput = e.detail.value.toUpperCase()
                    const selectArr = _this._data.selectArr
                    if (valInput != '') {
                        this.setComponentData({
                            keyup: true,
                            searchArr: _this.searchHandle(selectArr, valInput)
                        })
                    } else {
                        this.setComponentData({
                            keyup: false,
                            searchArr: selectArr
                        })
                    }

                },
                searchHandle(selectArr, valInput) {
                    const select = []
                        //const keys=[]
                    for (var i = 0; i < selectArr.length; i++) {
                        var cols = selectArr[i]['cols']
                            //keys.push(selectArr[i]['key'])
                        for (var j = 0; j < cols.length; j++) {
                            if (cols[j]['searchs'].indexOf(valInput) > -1 || cols[j]['display'].indexOf(valInput) > -1) {
                                select.push(cols[j]);
                            }
                        }

                    }
                    //console.log(select)
                    return select
                },


                selectClick(e) {
                    var _this = this
                    const index = e.currentTarget.dataset.index
                    var componentData = this.getComponentData()
                    var keyItem = e.currentTarget.dataset.key
                    var keys = componentData.keys
                    var Pindex = keys.indexOf(keyItem)
                    if (Pindex > -1) {
                        var item = componentData.searchArr[Pindex]['cols'][index]
                    } else {
                        var item = componentData.searchArr[index]
                    }

                    options.selectCompail(item)
                    this.removeModal(options.cancel)

                },

                /**
                 * 取消按钮点击事件
                 */
                cancel() {
                    this.removeModal(options.cancel)
                }
            }
        })

        component.showModal()
        component.init()

        return component.cancel
    }
}