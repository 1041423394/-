var regeneratorRuntime = require("../../lib/runtime.js");'use strict';

var app = getApp();
var common = require('../../utils/util.js');
var timer = null;
var count = 0;
var allTime = 161; //音乐总时长
Page({
    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {},
        playMusic: false,
        progress: 0,
        loop: true, //是否是循环播放
        tips: {
            hiddenErrmsg: true,
            errmsg: ''
        }

    },
    // 播放音乐
    playMusic: function playMusic(e) {
        app.stopMusice();
        this.setData({
            playMusic: true
        });
        this.interval();
    },

    // 暂停音乐
    pauseMusic: function pauseMusic(e) {
        app.autoPlay();
        clearInterval(timer);
        this.setData({
            playMusic: false
        });
    },

    // 播发完毕
    endMusic: function endMusic(e) {
        app.autoPlay();

        clearInterval(timer);
        count = 0;
        this.setData({
            playMusic: false,
            progress: 0
        });
    },

    // 播放出错
    errMusic: function errMusic(e) {
        app.autoPlay();
        clearInterval(timer);
        var error = '';
        var errcode = e.detail.errMsg;
        common.TIP.showErrMsg(this, errcode);
    },

    // 循环时间
    interval: function interval() {
        clearInterval(timer);
        var that = this;
        var progress = 0;
        timer = setInterval(function () {
            count++;
            progress = count / allTime * 100;
            that.setData({
                progress: progress
            });
            if (count >= allTime) {
                clearInterval(timer);
                count = 0;
                that.setData({
                    progress: 0
                });
                if (that.data.loop) {
                    that.interval(); //循环播放事件
                }
            }
        }, 1000);
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function onLoad(options) {
        var wxUser = wx.getStorageSync('wxUser');
        this.setData({
            userInfo: wxUser
        });
        if (!wx.getStorageSync('audioPlay')) {
            app.autoPlay();
        }
    },
    onShow: function onShow() {
        count = 0;
        this.setData({
            progress: 0
        });
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function onReady() {},
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function onHide() {
        wx.setStorageSync('audioPlay', false);
    },
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function onUnload() {
        wx.setStorageSync('audioPlay', false);
    },
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzL2JnTXVzaWMvYmdNdXNpYy5qcyJdLCJuYW1lcyI6WyJhcHAiLCJnZXRBcHAiLCJjb21tb24iLCJyZXF1aXJlIiwidGltZXIiLCJjb3VudCIsImFsbFRpbWUiLCJQYWdlIiwiZGF0YSIsInVzZXJJbmZvIiwicGxheU11c2ljIiwicHJvZ3Jlc3MiLCJsb29wIiwidGlwcyIsImhpZGRlbkVycm1zZyIsImVycm1zZyIsImUiLCJzdG9wTXVzaWNlIiwic2V0RGF0YSIsImludGVydmFsIiwicGF1c2VNdXNpYyIsImF1dG9QbGF5IiwiY2xlYXJJbnRlcnZhbCIsImVuZE11c2ljIiwiZXJyTXVzaWMiLCJlcnJvciIsImVycmNvZGUiLCJkZXRhaWwiLCJlcnJNc2ciLCJUSVAiLCJzaG93RXJyTXNnIiwidGhhdCIsInNldEludGVydmFsIiwib25Mb2FkIiwib3B0aW9ucyIsInd4VXNlciIsInd4IiwiZ2V0U3RvcmFnZVN5bmMiLCJvblNob3ciLCJvblJlYWR5Iiwib25IaWRlIiwic2V0U3RvcmFnZVN5bmMiLCJvblVubG9hZCIsIm9uUHVsbERvd25SZWZyZXNoIiwib25SZWFjaEJvdHRvbSIsIm9uU2hhcmVBcHBNZXNzYWdlIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQUlBLE1BQU1DLFFBQVY7QUFDQSxJQUFJQyxTQUFTQyxRQUFRLHFCQUFSLENBQWI7QUFDQSxJQUFJQyxRQUFRLElBQVo7QUFDQSxJQUFJQyxRQUFRLENBQVo7QUFDQSxJQUFJQyxVQUFVLEdBQWQsQyxDQUFrQjtBQUNsQkMsS0FBSztBQUNEOzs7QUFHQUMsVUFBTTtBQUNGQyxrQkFBVSxFQURSO0FBRUZDLG1CQUFXLEtBRlQ7QUFHRkMsa0JBQVUsQ0FIUjtBQUlGQyxjQUFNLElBSkosRUFJVTtBQUNaQyxjQUFNO0FBQ0ZDLDBCQUFjLElBRFo7QUFFRkMsb0JBQVE7QUFGTjs7QUFMSixLQUpMO0FBZUQ7QUFDQUwsYUFoQkMscUJBZ0JTTSxDQWhCVCxFQWdCWTtBQUNUaEIsWUFBSWlCLFVBQUo7QUFDQSxhQUFLQyxPQUFMLENBQWE7QUFDVFIsdUJBQVc7QUFERixTQUFiO0FBR0EsYUFBS1MsUUFBTDtBQUNILEtBdEJBOztBQXVCRDtBQUNBQyxjQXhCQyxzQkF3QlVKLENBeEJWLEVBd0JhO0FBQ1ZoQixZQUFJcUIsUUFBSjtBQUNBQyxzQkFBY2xCLEtBQWQ7QUFDQSxhQUFLYyxPQUFMLENBQWE7QUFDVFIsdUJBQVc7QUFERixTQUFiO0FBR0gsS0E5QkE7O0FBK0JEO0FBQ0FhLFlBaENDLG9CQWdDUVAsQ0FoQ1IsRUFnQ1c7QUFDUmhCLFlBQUlxQixRQUFKOztBQUVBQyxzQkFBY2xCLEtBQWQ7QUFDQUMsZ0JBQVEsQ0FBUjtBQUNBLGFBQUthLE9BQUwsQ0FBYTtBQUNUUix1QkFBVyxLQURGO0FBRVRDLHNCQUFVO0FBRkQsU0FBYjtBQUlILEtBekNBOztBQTBDRDtBQUNBYSxZQTNDQyxvQkEyQ1FSLENBM0NSLEVBMkNXO0FBQ1JoQixZQUFJcUIsUUFBSjtBQUNBQyxzQkFBY2xCLEtBQWQ7QUFDQSxZQUFJcUIsUUFBUSxFQUFaO0FBQ0EsWUFBSUMsVUFBVVYsRUFBRVcsTUFBRixDQUFTQyxNQUF2QjtBQUNBMUIsZUFBTzJCLEdBQVAsQ0FBV0MsVUFBWCxDQUFzQixJQUF0QixFQUE0QkosT0FBNUI7QUFDSCxLQWpEQTs7QUFrREQ7QUFDQVAsWUFuREMsc0JBbURVO0FBQ1BHLHNCQUFjbEIsS0FBZDtBQUNBLFlBQUkyQixPQUFPLElBQVg7QUFDQSxZQUFJcEIsV0FBVyxDQUFmO0FBQ0FQLGdCQUFRNEIsWUFBWSxZQUFXO0FBQzNCM0I7QUFDQU0sdUJBQVlOLFFBQVFDLE9BQVQsR0FBb0IsR0FBL0I7QUFDQXlCLGlCQUFLYixPQUFMLENBQWE7QUFDVFAsMEJBQVVBO0FBREQsYUFBYjtBQUdBLGdCQUFJTixTQUFTQyxPQUFiLEVBQXNCO0FBQ2xCZ0IsOEJBQWNsQixLQUFkO0FBQ0FDLHdCQUFRLENBQVI7QUFDQTBCLHFCQUFLYixPQUFMLENBQWE7QUFDVFAsOEJBQVU7QUFERCxpQkFBYjtBQUdBLG9CQUFJb0IsS0FBS3ZCLElBQUwsQ0FBVUksSUFBZCxFQUFvQjtBQUNoQm1CLHlCQUFLWixRQUFMLEdBRGdCLENBQ0E7QUFDbkI7QUFDSjtBQUNKLFNBaEJPLEVBZ0JMLElBaEJLLENBQVI7QUFpQkgsS0F4RUE7O0FBeUVEOzs7QUFHQWMsWUFBUSxnQkFBU0MsT0FBVCxFQUFrQjtBQUN0QixZQUFJQyxTQUFTQyxHQUFHQyxjQUFILENBQWtCLFFBQWxCLENBQWI7QUFDQSxhQUFLbkIsT0FBTCxDQUFhO0FBQ1RULHNCQUFVMEI7QUFERCxTQUFiO0FBR0EsWUFBSSxDQUFDQyxHQUFHQyxjQUFILENBQWtCLFdBQWxCLENBQUwsRUFBcUM7QUFDakNyQyxnQkFBSXFCLFFBQUo7QUFDSDtBQUNKLEtBcEZBO0FBcUZEaUIsVUFyRkMsb0JBcUZRO0FBQ0xqQyxnQkFBUSxDQUFSO0FBQ0EsYUFBS2EsT0FBTCxDQUFhO0FBQ1RQLHNCQUFVO0FBREQsU0FBYjtBQUdILEtBMUZBOztBQTJGRDs7O0FBR0E0QixhQUFTLG1CQUFXLENBRW5CLENBaEdBO0FBaUdEOzs7QUFHQUMsWUFBUSxrQkFBVztBQUNmSixXQUFHSyxjQUFILENBQWtCLFdBQWxCLEVBQStCLEtBQS9CO0FBQ0gsS0F0R0E7QUF1R0Q7OztBQUdBQyxjQUFVLG9CQUFXO0FBQ2pCTixXQUFHSyxjQUFILENBQWtCLFdBQWxCLEVBQStCLEtBQS9CO0FBQ0gsS0E1R0E7QUE2R0Q7OztBQUdBRSx1QkFBbUIsNkJBQVcsQ0FFN0IsQ0FsSEE7QUFtSEQ7OztBQUdBQyxtQkFBZSx5QkFBVyxDQUV6QixDQXhIQTtBQXlIRDs7O0FBR0FDLHVCQUFtQiw2QkFBVyxDQUU3QjtBQTlIQSxDQUFMIiwiZmlsZSI6InBhZ2VzL2JnTXVzaWMvYmdNdXNpYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImxldCBhcHAgPSBnZXRBcHAoKVxubGV0IGNvbW1vbiA9IHJlcXVpcmUoJy4uLy4uL3V0aWxzL3V0aWwuanMnKVxubGV0IHRpbWVyID0gbnVsbFxubGV0IGNvdW50ID0gMFxubGV0IGFsbFRpbWUgPSAxNjEgLy/pn7PkuZDmgLvml7bplb9cblBhZ2Uoe1xuICAgIC8qKlxuICAgICAqIOmhtemdoueahOWIneWni+aVsOaNrlxuICAgICAqL1xuICAgIGRhdGE6IHtcbiAgICAgICAgdXNlckluZm86IHt9LFxuICAgICAgICBwbGF5TXVzaWM6IGZhbHNlLFxuICAgICAgICBwcm9ncmVzczogMCxcbiAgICAgICAgbG9vcDogdHJ1ZSwgLy/mmK/lkKbmmK/lvqrnjq/mkq3mlL5cbiAgICAgICAgdGlwczoge1xuICAgICAgICAgICAgaGlkZGVuRXJybXNnOiB0cnVlLFxuICAgICAgICAgICAgZXJybXNnOiAnJ1xuICAgICAgICB9XG5cbiAgICB9LFxuICAgIC8vIOaSreaUvumfs+S5kFxuICAgIHBsYXlNdXNpYyhlKSB7XG4gICAgICAgIGFwcC5zdG9wTXVzaWNlKClcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgIHBsYXlNdXNpYzogdHJ1ZVxuICAgICAgICB9KVxuICAgICAgICB0aGlzLmludGVydmFsKClcbiAgICB9LFxuICAgIC8vIOaaguWBnOmfs+S5kFxuICAgIHBhdXNlTXVzaWMoZSkge1xuICAgICAgICBhcHAuYXV0b1BsYXkoKVxuICAgICAgICBjbGVhckludGVydmFsKHRpbWVyKVxuICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgICAgcGxheU11c2ljOiBmYWxzZVxuICAgICAgICB9KVxuICAgIH0sXG4gICAgLy8g5pKt5Y+R5a6M5q+VXG4gICAgZW5kTXVzaWMoZSkge1xuICAgICAgICBhcHAuYXV0b1BsYXkoKVxuXG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGltZXIpXG4gICAgICAgIGNvdW50ID0gMFxuICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgICAgcGxheU11c2ljOiBmYWxzZSxcbiAgICAgICAgICAgIHByb2dyZXNzOiAwXG4gICAgICAgIH0pXG4gICAgfSxcbiAgICAvLyDmkq3mlL7lh7rplJlcbiAgICBlcnJNdXNpYyhlKSB7XG4gICAgICAgIGFwcC5hdXRvUGxheSgpXG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGltZXIpXG4gICAgICAgIGxldCBlcnJvciA9ICcnXG4gICAgICAgIGxldCBlcnJjb2RlID0gZS5kZXRhaWwuZXJyTXNnXG4gICAgICAgIGNvbW1vbi5USVAuc2hvd0Vyck1zZyh0aGlzLCBlcnJjb2RlKVxuICAgIH0sXG4gICAgLy8g5b6q546v5pe26Ze0XG4gICAgaW50ZXJ2YWwoKSB7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGltZXIpXG4gICAgICAgIGxldCB0aGF0ID0gdGhpc1xuICAgICAgICBsZXQgcHJvZ3Jlc3MgPSAwXG4gICAgICAgIHRpbWVyID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjb3VudCsrXG4gICAgICAgICAgICBwcm9ncmVzcyA9IChjb3VudCAvIGFsbFRpbWUpICogMTAwXG4gICAgICAgICAgICB0aGF0LnNldERhdGEoe1xuICAgICAgICAgICAgICAgIHByb2dyZXNzOiBwcm9ncmVzc1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGlmIChjb3VudCA+PSBhbGxUaW1lKSB7XG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aW1lcilcbiAgICAgICAgICAgICAgICBjb3VudCA9IDBcbiAgICAgICAgICAgICAgICB0aGF0LnNldERhdGEoe1xuICAgICAgICAgICAgICAgICAgICBwcm9ncmVzczogMFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgaWYgKHRoYXQuZGF0YS5sb29wKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoYXQuaW50ZXJ2YWwoKSAvL+W+queOr+aSreaUvuS6i+S7tlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgMTAwMClcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5Yqg6L29XG4gICAgICovXG4gICAgb25Mb2FkOiBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICAgIGxldCB3eFVzZXIgPSB3eC5nZXRTdG9yYWdlU3luYygnd3hVc2VyJyk7XG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgICB1c2VySW5mbzogd3hVc2VyXG4gICAgICAgIH0pXG4gICAgICAgIGlmICghd3guZ2V0U3RvcmFnZVN5bmMoJ2F1ZGlvUGxheScpKSB7XG4gICAgICAgICAgICBhcHAuYXV0b1BsYXkoKVxuICAgICAgICB9XG4gICAgfSxcbiAgICBvblNob3coKSB7XG4gICAgICAgIGNvdW50ID0gMFxuICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgICAgcHJvZ3Jlc3M6IDBcbiAgICAgICAgfSlcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5Yid5qyh5riy5p+T5a6M5oiQXG4gICAgICovXG4gICAgb25SZWFkeTogZnVuY3Rpb24oKSB7XG5cbiAgICB9LFxuICAgIC8qKlxuICAgICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i6ZqQ6JePXG4gICAgICovXG4gICAgb25IaWRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgd3guc2V0U3RvcmFnZVN5bmMoJ2F1ZGlvUGxheScsIGZhbHNlKVxuICAgIH0sXG4gICAgLyoqXG4gICAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLljbjovb1cbiAgICAgKi9cbiAgICBvblVubG9hZDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKCdhdWRpb1BsYXknLCBmYWxzZSlcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIOmhtemdouebuOWFs+S6i+S7tuWkhOeQhuWHveaVsC0t55uR5ZCs55So5oi35LiL5ouJ5Yqo5L2cXG4gICAgICovXG4gICAgb25QdWxsRG93blJlZnJlc2g6IGZ1bmN0aW9uKCkge1xuXG4gICAgfSxcbiAgICAvKipcbiAgICAgKiDpobXpnaLkuIrmi4nop6blupXkuovku7bnmoTlpITnkIblh73mlbBcbiAgICAgKi9cbiAgICBvblJlYWNoQm90dG9tOiBmdW5jdGlvbigpIHtcblxuICAgIH0sXG4gICAgLyoqXG4gICAgICog55So5oi354K55Ye75Y+z5LiK6KeS5YiG5LqrXG4gICAgICovXG4gICAgb25TaGFyZUFwcE1lc3NhZ2U6IGZ1bmN0aW9uKCkge1xuXG4gICAgfVxufSkiXX0=
