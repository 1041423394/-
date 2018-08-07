import initCalendar, { setTodoLabels, switchView, jump } from '../../template/calendar/index';
const common = require('../../utils/util.js')
let projectService = require('../../service/filterService.js')
let date = new Date()
let nowD = common.formatTime(date)
let app = getApp()
let currentYear = date.getFullYear()
let currentMonth = date.getMonth() + 1
let currentDay = date.getDate()

Page({
    /**
     * 页面的初始数据
     */
    data: {
        currentYear: currentYear,
        currentMonth: currentMonth,
        colorText: ['#F5B2B2', '#F7D794', '#D1D6DC', '#ABB6D5'], //月数据颜色
        tab: ['列表', '月'], //头部切换tab内容
        state: 0, //哪个tab选中
        nullContent: 1,
        plan: false,
        sevenList: [],
        timeList: [], //列表
        monthList: [], //月数据弹窗数据
        daysPlan: [], //月计划
        tabBtnWidth: 104,
        pageSize: 4,
        page: 1,
        timeDay: nowD,
        newsArr: [], //资讯
        nowD: nowD,
        weekView: true,
        show: false //弹窗
    },

    // tab切换
    tabHandle(e) {
        let state = e.currentTarget.dataset.state
        this.setData({
            state: state
        })
        if (state == 0) {
            this.setData({
                weekView: true
            })
            this.onShow()
        } else {
            this.setData({
                plan: true,
                weekView: false
            })

            this.onShow()
        }
    },

    // 删除任务
    delTask(e) {
        let taskid = e.currentTarget.dataset.taskid
        let index = e.currentTarget.dataset.index
        let state = e.currentTarget.dataset.state

        wx.showModal({
            title: app.globalData.projectName,
            content: '确定要删除当前任务吗？',
            success: async(res) => {
                if (res.confirm) {
                    let param = {}
                    let result = await projectService.delTask({ params: param })
                    if (this.data.state == 1) {
                        this.getMothData()
                    }
                    this.data.timeList.splice(index, 1)
                    this.setData({
                        timeList: this.data.timeList
                    })
                    wx.showToast({
                        title: '删除成功',
                        icon: 'none'
                    });
                }
            }
        });
    },
    // 获取任务
    getMyTask: async function() {
        let param = {}
        let result = await projectService.getMyTask({ params: param })
        console.log(result.data.data.length)
        if (result.data.data.length != 0) {
            this.setData({
                nullContent: 1
            })
            this.setData({
                timeList: result.data.data
            })

        } else {
            this.setData({
                nullContent: 0
            })
        }

    },

    // 获取月数据
    getMothData: async function() {
        let param = {}
        let result = await projectService.monthData({ params: param })
            // if (result.data.code == '000000') {
        let dates = result.data.data
        if (dates.length == 0) {
            wx.showToast({
                title: '当月无计划',
                icon: 'none'
            })
            return
        }
        dates.forEach(item => {
            this.data.daysPlan.push({
                year: item.year,
                month: item.month,
                day: item.day,
                plan: item.note
            })
        });
        setTodoLabels({
            pos: 'bottom',
            dotColor: '#40',
            days: this.data.daysPlan
        });
        this.setData({
                daysPlan: this.data.daysPlan
            })
            // }
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
        var tabBtnWidth = this.getEleWidth(this.data.tabBtnWidth);
        this.setData({
            tabBtnWidth: tabBtnWidth
        });
    },
    //  触摸左移开始
    touchS: function touchS(e) {
        let id = e.currentTarget.dataset.id
        if (id == 0) {
            return
        }
        if (e.touches.length == 1) {
            this.setData({
                startX: e.touches[0].clientX
            });
        }
    },
    //触摸左移移动
    touchM: function touchM(e) {
        let index = e.currentTarget.dataset.index
        let id = e.currentTarget.dataset.id
        if (id == 0) {
            return
        }
        if (e.touches.length == 1) {
            var moveX = e.touches[0].clientX;
            var disX = this.data.startX - moveX;
            var tabBtnWidth = this.data.tabBtnWidth;
            var left = "";
            if (disX == 0 || disX < 0) {
                //如果移动距离小于等于0，container位置不变
                left = "margin-left:0px";
            } else if (disX > 0) {
                //移动距离大于0，container left值等于手指移动距离
                left = "margin-left:-" + disX + "px";
                if (disX >= tabBtnWidth) {
                    left = "left:-" + tabBtnWidth + "px";
                }
            }
            var list = this.data.timeList;
            if (index != "" && index != null) {
                list[parseInt(index)].left = left;
                this.setData({
                    timeList: list
                })

            }
        }
    },
    //触摸左移结束
    touchE: function touchE(e) {
        let index = e.currentTarget.dataset.index
        let id = e.currentTarget.dataset.id
        if (id == 0) {
            return
        }
        if (e.changedTouches.length == 1) {
            var endX = e.changedTouches[0].clientX;
            var disX = this.data.startX - endX;
            var tabBtnWidth = this.data.tabBtnWidth;
            //如果距离小于删除按钮的1/2，不显示删除按钮
            var left = disX > tabBtnWidth / 2 ? "margin-left:-" + tabBtnWidth + "px" : "margin-left:0px";
            var list = this.data.timeList;

            if (index !== "" && index != null) {
                list[parseInt(index)].left = left;
                this.setData({
                    timeList: list
                })
            }
        }
    },
    onShow() {

        app.checkAuthLogin()
            // this.data.state = 0
        if (this.data.state == 0) {
            this.getMyTask()
        }

        initCalendar({
            afterTapDay: (currentSelect, allSelectedDays, handle) => {
                if (handle) {
                    this.setData({
                        currentMonth: allSelectedDays,
                        currentYear: currentSelect
                    })
                    this.getMothData()

                } else {
                    let date = currentSelect.year + '-' + currentSelect.month + '-' + currentSelect.day
                    this.setData({
                        nowD: date
                    })
                    if (!this.data.weekView && currentSelect.plan) {
                        this.getMyTask()
                            // 弹窗请求输出更多
                        this.setData({
                            show: true
                        })
                    }
                    if (this.data.state == 0) {
                        this.getMyTask()
                    }
                }
            }

        });
        if (this.data.state == 1) {
            this.getMothData()

        }
        this.setData({
            infoDetail: false
        })
        if (this.data.state == 0) {
            switchView('week')
        } else {
            switchView('month')

        }

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        app.checkAuthLogin()
        let wxInfo = wx.getStorageSync('wxInfo')
        let height = 'height:' + wx.getSystemInfoSync().windowHeight + 'px'
        this.setData({
            wxInfo: wxInfo,
            webHeight: height
        })

    },
    // 取消弹窗
    cancelHandle() {
        this.setData({
            show: false
        })
    },
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
        wx.stopPullDownRefresh(); //停止当前刷新
        this.getMyTask();
        this.getMothData()

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