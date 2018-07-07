let app = getApp();

Page({
    /**
     * 页面的初始数据
     */
    data: {},
    // 模块对应页面
    tapHandle: function(e) {
        let src = e.currentTarget.dataset.src
        wx.navigateTo({
            url: '../' + src + '/' + src
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        app.checkAuthLogin()
        console.log(options.nickName)
    },
    onShow: function() {},
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
        let userName = wx.getStorageSync('userInfo').nickName;
        return {
            title: '小程序常用组件二次封装，开箱即用',
            path: '/pages/index/index?nickName=' + userName,
            imageUrl: '../../images/indexShare.png'
        }
    }
})