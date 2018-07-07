const uploadOss = require('../../lib/uploadAliyun.js');
let common = require('../../utils/util.js')
let app = getApp()
Page({
    /**
     * 页面的初始数据
     */
    data: {
        imageArray: [],
        tips: {
            hiddenErrmsg: true,
            errmsg: ''
        }
    },
    // 添加图片
    chooseImage() {
        let _this = this
        let wxChooseImage = app.wxPromisify(wx.chooseImage)
        wxChooseImage({ count: 6 })
            .then(res => {
                let tempFilePath = res.tempFilePaths
                _this.setData({
                    imageArray: tempFilePath
                })
            })
    },
    // 预览图片
    previewImage(e) {
        let _this = this
        let src = e.currentTarget.dataset.src
        wx.previewImage({
            urls: _this.data.imageArray,
            current: src
        })
    },
    // 删除图片
    delImage(e) {
        let index = e.currentTarget.dataset.index
        this.data.imageArray.splice(index, 1)
        this.setData({
            imageArray: this.data.imageArray
        })
    },
    // 上传
    uploadHandle() {
        console.log(this.data.imageArray.length)
        if (this.data.imageArray.length <= 0) {
            common.TIP.showErrMsg(this, '请先选择上传的图片')
            return
        }
        let imageArray = this.data.imageArray
        imageArray.forEach((temp, index) => {
            this.uploadFile(temp, index)
        });

    },

    //上传阿里云
    uploadFile(data, length) {
        wx.showLoading({
            title: '数据传送中...',
            mask: true,
        });
        let _this = this
        let wxRequest = app.wxPromisify(wx.request)
        wxRequest({
            data: {
                'dir': 'voice/' //上传的文件路径
            },
            method: 'POST',
            url: '', //后台换取阿里oss 凭证接口
        }).then(res => {
            uploadOss({
                filePath: data,
                dir: 'voice/', //上传的文件路径
                accessid: res.data.accessid,
                signature: res.data.signature,
                policy: res.data.policy,
                success(res) {
                    // 如果多个文件同时操作，等所有图片上传完毕的操作下方的
                    if ((that.data.imageArray.length - 1) == length) {
                        wx.hideLoading();
                        console.log(res) //上传成功返回的oss返回的值，作为传给自己服务器的参数值
                    }
                },
                fail(err) {
                    common.TIP.showErrMsg(_this, '上传阿里oss失败')
                }
            })
        }, err => {
            common.TIP.showErrMsg(_this, '获取凭证失败')
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {},

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

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