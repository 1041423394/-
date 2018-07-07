var regeneratorRuntime = require("../../lib/runtime.js");
"use strict";
var app = getApp();
var filterService = require('../../service/filterService');
Page({
    data: {
        defaultImg: app.globalData.defaultImg,
        loading: 0,
        nullContent: 1,
        downUp: 0,
        canAjax: true,
        pageSize: 10,
        p: 1,
        dataList: []
    },

    //列表初始化
    initQuery: async function() {
        if (!this.data.canAjax) {
            return;
        }
        this.data.canAjax = false;
        var param = {
            pageSize: this.data.pageSize,
            p: this.data.p
        }
        let result = await filterService.getProductList({ queryParam: param })
        this.initData(result)
    },
    initData: function(res) {
        this.data.canAjax = true;
        this.setData({
            downUp: 0,
            loading: 1
        })
        wx.stopPullDownRefresh();
        var queryData = res.data; //获取请求的数据
        // 没数据的情况
        if (queryData.length == 0) {
            this.setData({
                downUp: 2
            })
        }
        for (var i = 0; i < queryData.length; i++) {
            this.data.dataList.push(queryData[i])
        }

        this.setData({
                dataList: this.data.dataList
            })
            // 没有任何数据不包括上拉加载
        if (this.data.dataList.length == 0) {
            this.setData({
                downUp: 0,
                nullContent: 0

            })
        } else {
            this.setData({
                nullContent: 1
            })
        }
    },

    /**商品单击 */
    listClick: function(e) {
        var id = e.currentTarget.dataset.id;
        var shopid = e.currentTarget.dataset.shopid;
        console.log('商品单击')
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.initQuery()
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
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh(); //停止当前刷新
        this.setData({
            dataList: [],
            p: 1
        })
        this.initQuery()

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {
        if (this.data.downUp == 2 || this.data.dataList.length % this.data.pageSize > 0) { //没数据了，不用再请求了
            this.setData({
                downUp: 2
            })
            return
        }
        var pageNum = this.data.dataList.length / this.data.pageSize + 1
        this.setData({
            downUp: 1,
            p: pageNum
        })

        this.initQuery()

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})