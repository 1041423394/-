let $fmlAutoSelect = require('../../components/fml')

var app = getApp();
Page({
    /**
     * 页面的初始数据
     */
    data: {
        startAddress: '请选择',
        endAddress: '请选择',
        countShow: false,
        count: 1,
        money: '0.00'

    },
    showSearchList(e) {
        var _this = this
        var index = e.currentTarget.dataset.index //0起点1终点
        $fmlAutoSelect.show({
            searchInput(index, selectArr) {

            },
            selectClick(index, item) {

            },

            cancel() {},

            selectCompail(item) {
                if (index == 0 && item.display != _this.data.endAddress) {
                    _this.setData({
                        startAddress: item.display,
                        startId: item.id
                    })
                } else if (index == 1 && item.display != _this.data.startAddress) {
                    _this.setData({
                        endAddress: item.display,
                        endId: item.id
                    })
                } else {
                    wx.showModal({
                        title: '提示',
                        content: '起点和终点不能一样'
                    })
                }

                if (_this.data.endAddress != '请选择' && _this.data.startAddress != '请选择') {
                    const count = _this.data.count
                    const startId = _this.data.startId
                    const endId = _this.data.endId
                    _this.setData({
                        countShow: true,
                        money: count * (Math.abs(endId - startId)) + '.00'
                    })
                }


            },
        })
    },
    // 张数增加和减少
    bindHandle(e) {
        var index = e.currentTarget.dataset.index //0减1加
        if (this.data.countShow) {
            const count = this.data.count
            const startId = this.data.startId
            const endId = this.data.endId
            const num = Math.abs(endId - startId)

            if (index == 0) {
                this.setData({
                    count: count > 1 ? (count - 1) : 1,
                    money: (count - 1) > 0 ? (count - 1) * num + '.00' : count * num + '.00'
                })
            } else {
                this.setData({
                    count: count > 7 ? 8 : (count + 1),
                    money: (count + 1) > 8 ? 8 * num + '.00' : (count + 1) * num + '.00'
                })
            }


        }

    },
    bindSubmit() {
        if (this.data.countShow) {
            let wxRequestPay = app.wxPromisify(wx.requestPayment)
            wxRequestPay({
                'timeStamp': '',
                'nonceStr': '',
                'package': '',
                'signType': 'MD5',
                'paySign': '',
            }).then(res => {
                    wx.showToast({
                        title: '支付成功',
                        icon: 'success',
                        duration: 1500,
                        mask: false,
                    });
                },
                err => {
                    wx.showModal({
                        title: app.globalData.projectName,
                        showCancel: false,
                        content: err.errMsg,
                    })
                })
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function() {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})