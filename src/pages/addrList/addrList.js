var regeneratorRuntime = require("../../lib/runtime.js");
const filterService = require('../../service/filterService')
let app = getApp()
Page({
    data: {
        onshow: false,
        loading: 0,
        nullContent: 0, //是否有地址信息
        downUp: 0, //上啦加载
        canAjax: true,
        pageSize: 10,
        dataList: [],
        delBtnWidth: 120 //删除按钮宽度单位（rpx）

    },
    //获取元素自适应后的实际宽度
    getEleWidth: function(w) {
        let real = 0;
        try {
            let res = wx.getSystemInfoSync().windowWidth;
            let scale = (750 / 2) / (w / 2); //以宽度750px设计稿做宽度的自适应
            real = Math.floor(res / scale);
            return real;
        } catch (e) {
            return false;
        }
    },
    // 右滑删除按钮的位置
    initEleWidth: function() {
        let delBtnWidth = this.getEleWidth(this.data.delBtnWidth);
        this.setData({
            delBtnWidth: delBtnWidth
        });
    },
    //  触摸左移开始
    touchS: function(e) {
        if (e.touches.length == 1) {
            this.setData({
                startX: e.touches[0].clientX
            });
        }
    },
    //触摸左移移动
    touchM: function(e) {
        let index = e.currentTarget.dataset.index;
        if (e.touches.length == 1) {
            let moveX = e.touches[0].clientX;
            let disX = this.data.startX - moveX;
            let delBtnWidth = this.data.delBtnWidth;
            let left = "";
            if (disX == 0 || disX < 0) { //如果移动距离小于等于0，container位置不变
                left = "margin-left:0px";
            } else if (disX > 0) { //移动距离大于0，container left值等于手指移动距离
                left = "margin-left:-" + disX + "px";
                if (disX >= delBtnWidth) {
                    left = "left:-" + delBtnWidth + "px";
                }
            }
            let list = this.data.dataList;
            if (index != "" && index != null) {
                list[parseInt(index)].left = left;
                this.setData({
                    dataList: list
                })
            }
        }
    },
    //触摸左移结束
    touchE: function(e) {
        let index = e.currentTarget.dataset.index;
        if (e.changedTouches.length == 1) {
            let endX = e.changedTouches[0].clientX;
            let disX = this.data.startX - endX;
            let delBtnWidth = this.data.delBtnWidth;
            //如果距离小于删除按钮的1/2，不显示删除按钮
            let left = disX > delBtnWidth / 2 ? "margin-left:-" + delBtnWidth + "px" : "margin-left:0px";
            let list = this.data.dataList;
            if (index !== "" && index != null) {
                list[parseInt(index)].left = left;
                this.setData({
                    dataList: list
                })
            }
        }
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
        let result = await filterService.getAddrList({ params: param })
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
    // 删除
    addressDelete(e) {
        let that = this
        let address_id = e.currentTarget.dataset.addrid
        let addrIndex = e.currentTarget.dataset.index
        let dataList = this.data.dataList
        let wxShowModal = app.wxPromisify(wx.showModal)
        wxShowModal({
            title: app.globalData.projectName,
            content: '确定删除当前地址吗？'
        }).then(async function(res) {
            if (res.confirm) {
                let param = {
                    address_id: address_id
                }
                await filterService.deleteAddr({ params: param })
                wx.hideLoading()
                wx.showToast({
                    title: '删除成功',
                    icon: 'success'
                })
                dataList.splice(addrIndex, 1)
                    //更新列表的状态  
                that.setData({
                    dataList: dataList
                });
            }
        })

    },
    // 编辑
    editAddress(e) {
        let addrIndex = e.currentTarget.dataset.index
        let editAddr = this.data.dataList[addrIndex]
        let address_id = e.currentTarget.dataset.id
        wx.setStorageSync('editAddr', editAddr) //地址编辑
        wx.navigateTo({
            url: '../addrEdit/addrEdit?address_id=' + address_id,
        })
    },
    // 新增地址
    newAddress(e) {
        wx.navigateTo({
            url: '../addrEdit/addrEdit',
        })
    },
    // 获取当前地址
    getAddress(e) {
        let address_id = e.currentTarget.dataset.id
        console.log(address_id)
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.initEleWidth();

        if (!this.data.onshow) {
            this.initQuery()
        }
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        let pages = getCurrentPages();
        let currPage = pages[pages.length - 1];
        this.setData({ //将携带的参数赋值
            onshow: currPage.data.onshow
        });
        if (this.data.onshow) {
            this.setData({
                pageSize: 10,
                p: 1,
                dataList: []
            })
            this.initQuery()
        }

    },



    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {
        this.setData({
            pageSize: 10,
            p: 1,
            dataList: []
        })
        this.initQuery()
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {
        if (this.data.dataList.length == 0) {
            return
        }
        let _this = this;
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
    onShareAppMessage: function(res) {

    }
})