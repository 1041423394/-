var regeneratorRuntime = require("../../lib/runtime.js");'use strict';

var util = require('../../utils/util');
Page({
    /**
     * 页面的初始数据
     */
    data: {
        booking_time_hidden: true, //时间弹窗是否出现
        booking_time_show: '立即', //初显示的值
        booking_time_value: '立即', //提交的值
        booking_time_days: [], //哪一天  今天 明天 后天
        booking_time_hours: [], //时
        booking_time_minus: [], //分
        animatedClass: 'slideInUp'
    },
    //监听预约时间变动
    bindBookingTimeChange: function bindBookingTimeChange(e) {
        var val = e.detail.value;
        this.initBookingTime(false, val[0], val[1]);
        var showBookingTime = '立即';
        if (val[0] != 0 | val[1] != 0) {
            showBookingTime = this.data.booking_time_days[val[0]]['id'] + ' ' + this.data.booking_time_hours[val[1]] + ':' + this.data.booking_time_minus[val[2]];
        }
        this.setData({
            booking_time_show: showBookingTime,
            booking_time_day_index: val[0],
            booking_time_hour_index: val[1],
            booking_time_minu_index: val[2]
        });
    },
    //取消预约时间
    canclelBookingTime: function canclelBookingTime() {
        var that = this;
        this.setData({
            booking_time_show: this.data.booking_time_value,
            animatedClass: 'slideOutDown'
        });
        util.setHidden(that, 800);
    },
    //确定预约时间
    submitBookingTime: function submitBookingTime(booking_time_hidden) {
        var that = this;
        this.setData({
            booking_time_value: this.data.booking_time_show,
            animatedClass: 'slideOutDown'
        });
        util.setHidden(that, 800);
    },
    //打开预约时间
    openBookingTime: function openBookingTime() {
        this.setData({
            booking_time_hidden: false,
            animatedClass: 'slideInUp'

        });
    },
    //预约时间初始化及重新渲染
    initBookingTime: function initBookingTime() {
        var isFirst = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
        var newDayIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var newHourIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

        var timeObj = new Date();
        var time = Date.parse(timeObj);
        var data = {};
        if (isFirst) {
            data.booking_time_days = bookingTimeObj.initBookingTmeDay(time);
        }
        if (isFirst | newDayIndex != this.data.booking_time_day_index) {
            data.booking_time_hours = bookingTimeObj.initBookingTmeHour(timeObj, newDayIndex);
        }
        data.booking_time_minus = bookingTimeObj.initBookingTimeMinute(timeObj, newDayIndex, newHourIndex, this.data.booking_time_hours[newHourIndex]);
        this.setData(data);
    },

    //初始化分钟，timeObj时间日期对象，dayIndex选中的日期，hourIndex选中的小时索引,hourValue选中的小时值
    initBookingTimeMinute: function initBookingTimeMinute(timeObj, dayIndex, hourIndex, hourValue) {
        //var timeObj = new Date()
        var minutes = [];
        var nowHour = timeObj.getHours(); //当前小时
        var nowMinu = timeObj.getMinutes(); //当前分钟
        for (var i = 0; i <= 45; i += 15) {
            if (dayIndex == 0 && (hourValue == nowHour && i <= nowMinu) | hourIndex == 0) {
                continue;
            }
            var val = i.toString();
            minutes.push(util.strPad(val));
        }
        if (minutes.length == 0) {
            minutes.push(' ');
        }
        return minutes;
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function onLoad(options) {},
    onShow: function onShow() {
        this.initBookingTime(); //预约时间初始化
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function onReady() {},
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function onHide() {},
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function onUnload() {},
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function onPullDownRefresh() {},
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function onReachBottom() {},
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function onShareAppMessage() {}
});
//预约时间三栏生成对象
var bookingTimeObj = {
    //初始化日期。time当前时间戳
    initBookingTmeDay: function initBookingTmeDay(time) {
        var days = [];
        var daysShow = ['今天', '明天', '后天'];
        for (var i = 0; i <= 2; i++) {
            var itemTime = time + i * 24 * 60 * 60 * 1000;
            var itemDate = util.getLocalTime(itemTime);
            var item = itemDate.getMonth() + 1;
            var item = itemDate.getFullYear() + '-' + util.strPad(itemDate.getMonth() + 1) + '-' + util.strPad(itemDate.getDate());
            days.push({ 'id': item, 'name': daysShow[i] });
        }
        return days;
    },
    //初始化小时，timeObj时间日期对象，dayIndex选中的日期
    initBookingTmeHour: function initBookingTmeHour(timeObj, dayIndex) {
        var hours = [];
        var nowHour = timeObj.getHours(); //当前小时
        var nowMinu = timeObj.getMinutes(); //当前分钟
        if (nowMinu >= 45) {
            nowHour++;
        }
        if (dayIndex == 0) {
            hours.push('立即');
        }
        for (var i = 0; i <= 23; i++) {
            if (dayIndex == 0 & i < nowHour) {
                //今天
                continue;
            }
            hours.push(util.strPad(i.toString()));
        }
        return hours;
    },
    //初始化分钟，timeObj时间日期对象，dayIndex选中的日期，hourIndex选中的小时索引,hourValue选中的小时值
    initBookingTimeMinute: function initBookingTimeMinute(timeObj, dayIndex, hourIndex, hourValue) {
        //var timeObj = new Date()
        var minutes = [];
        var nowHour = timeObj.getHours(); //当前小时
        var nowMinu = timeObj.getMinutes(); //当前分钟
        for (var i = 0; i <= 45; i += 15) {
            if (dayIndex == 0 && (hourValue == nowHour && i <= nowMinu) | hourIndex == 0) {
                continue;
            }
            var val = i.toString();
            minutes.push(util.strPad(val));
        }
        if (minutes.length == 0) {
            minutes.push(' ');
        }
        return minutes;
    }
};