let app = getApp()
var common = {
    // 获取当前位置
    getLocation() {
        let wxGetLocation = this.wxPromisify(wx.getLocation)
        wxGetLocation().then(res => {
            let location = {
                lat: res.latitude,
                lng: res.longitude
            }
            return location
        })
    },
    //根据时间戳获取时间对象
    getLocalTime: function(nS) {
        return new Date(parseInt(nS));
    },
    //字符串补足位数
    strPad: function(str, length, pad_str, pad_type) {
        var str = str.toString()
        if (!length) {
            length = 2
        }
        if (!pad_str) {
            pad_str = '0'
        }
        if (!pad_type) {
            pad_type = 'left'
        }

        var length_pad = length - str.length
        switch (pad_type) {
            case 'left':
                for (var index = 0; index < length_pad; index++) {
                    str = pad_str + str
                }
                break;

            case 'right':
                for (var index = 0; index < length_pad; index++) {
                    str = str + pad_str
                }
                break;
        }
        return str
    },
    // 提示工具
    TIP: {
        showErrMsg: function(pageObj, errmsg) {
            pageObj.setData({
                    tips: {
                        hiddenErrmsg: false,
                        errmsg: errmsg
                    }

                })
                //3秒后关闭
            setTimeout(this.returnCloseErrMsg(pageObj), 3000)
        },
        closeErrMsg: function(pageObj) {
            pageObj.setData({
                tips: {
                    hiddenErrmsg: true,
                    errmsg: ''
                }
            })
        },
        returnCloseErrMsg: function(pageObj) {
            var self = this
            return function() {
                self.closeErrMsg(pageObj)
            }
        }
    },
    // 验证手机号
    verifyMobile: function(pageObj) {
        if (pageObj.data.mobile == '') {
            this.TIP.showErrMsg(pageObj, '请填写手机号码')
            return false
        }
        var re = /^1\d{10}/g
        if (!re.test(pageObj.data.mobile)) {
            this.TIP.showErrMsg(pageObj, '手机号码格式不正确')
            return false
        }
        return true
    },
    // 保存图片到本地相册
    savePhoto: function(canvasId, pageObj) {
        const wxCanvasToTempFilePath = app.wxPromisify(wx.canvasToTempFilePath)
        const wxSaveImageToPhotosAlbum = app.wxPromisify(wx.saveImageToPhotosAlbum)
        wxCanvasToTempFilePath({
            canvasId: canvasId
        }, this).then(res => {
            return wxSaveImageToPhotosAlbum({
                filePath: res.tempFilePath
            })
        }, err => {
            pageObj.setData({
                saveStatus: true
            })
            wx.getSetting({
                success(res) {
                    if (!res.authSetting['scope.writePhotosAlbum']) {
                        wx.openSetting({
                            success: function(res) {
                                wx.showModal({
                                    title: app.globalData.projectName,
                                    content: '如未提示保存成功，请重新点击保存',
                                    showCancel: false,
                                    confirmText: '知道了'

                                })
                            },
                            fail: function() {
                                wx.showModal({
                                    title: app.globalData.projectName,
                                    content: '海报保存失败，请重新尝试',
                                    showCancel: false,
                                    confirmText: '知道了'
                                })
                            }
                        })
                    }
                }
            })

        }).then(res => {
            pageObj.setData({
                saveStatus: true
            })
            wx.hideLoading()
            wx.showModal({
                title: app.globalData.projectName,
                content: '图片已保存至系统相册了',
                showCancel: false,
                confirmText: '知道了'

            })
        }, err => {
            pageObj.setData({
                saveStatus: true
            })
            wx.showModal({
                title: app.globalData.projectName,
                content: '图片保存失败',
                showCancel: false,
                confirmText: '知道了'
            })
        })
    },
    // 隐藏
    setHidden: function(pageObj, timer) {
        setTimeout(function() {
            pageObj.setData({
                booking_time_hidden: true
            })
        }, timer)
    }
}
module.exports = common