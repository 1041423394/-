var regeneratorRuntime = require("../../lib/runtime.js");'use strict';

var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    angle: 0,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  /**
   * button 调出用户信息授权 1.3.0基础库支持，这里不做低版本兼容处理
   */
  getUserInfo: function getUserInfo(e) {
    app.globalData.userInfo = e.detail.userInfo;
    wx.setStorageSync('userInfo', e.detail.userInfo);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function onLoad(options) {
    if (app.globalData.userInfo) {
      wx.redirectTo({
        url: '../index/index'
      });
    } else {
      app.userInfoReadyCallback = function (res) {
        app.globalData.userInfo = res.userInfo;
        wx.setStorageSync('userInfo', res.userInfo);
      };
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function onReady() {
    wx.onAccelerometerChange(function (res) {
      var angle = -(res.x * 30).toFixed(1);
      if (angle > 14) {
        angle = 14;
      } else if (angle < -14) {
        angle = -14;
      }
      if (that.data.angle !== angle) {
        that.setData({
          angle: angle
        });
      }
    });
  },
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzL2xvZ2luL2xvZ2luLmpzIl0sIm5hbWVzIjpbImFwcCIsImdldEFwcCIsIlBhZ2UiLCJkYXRhIiwiYW5nbGUiLCJjYW5JVXNlIiwid3giLCJnZXRVc2VySW5mbyIsImUiLCJnbG9iYWxEYXRhIiwidXNlckluZm8iLCJkZXRhaWwiLCJzZXRTdG9yYWdlU3luYyIsIm9uTG9hZCIsIm9wdGlvbnMiLCJyZWRpcmVjdFRvIiwidXJsIiwidXNlckluZm9SZWFkeUNhbGxiYWNrIiwicmVzIiwib25SZWFkeSIsIm9uQWNjZWxlcm9tZXRlckNoYW5nZSIsIngiLCJ0b0ZpeGVkIiwidGhhdCIsInNldERhdGEiLCJvbkhpZGUiLCJvblVubG9hZCIsIm9uUHVsbERvd25SZWZyZXNoIiwib25SZWFjaEJvdHRvbSIsIm9uU2hhcmVBcHBNZXNzYWdlIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQUlBLE1BQU1DLFFBQVY7QUFDQUMsS0FBSztBQUNIOzs7QUFHQUMsUUFBTTtBQUNKQyxXQUFPLENBREg7QUFFSkMsYUFBU0MsR0FBR0QsT0FBSCxDQUFXLDhCQUFYO0FBRkwsR0FKSDtBQVFIOzs7QUFHQUUsZUFBYSxxQkFBVUMsQ0FBVixFQUFhO0FBQ3hCUixRQUFJUyxVQUFKLENBQWVDLFFBQWYsR0FBMEJGLEVBQUVHLE1BQUYsQ0FBU0QsUUFBbkM7QUFDQUosT0FBR00sY0FBSCxDQUFrQixVQUFsQixFQUE4QkosRUFBRUcsTUFBRixDQUFTRCxRQUF2QztBQUNELEdBZEU7QUFlSDs7O0FBR0FHLFVBQVEsZ0JBQVVDLE9BQVYsRUFBbUI7QUFDekIsUUFBSWQsSUFBSVMsVUFBSixDQUFlQyxRQUFuQixFQUE2QjtBQUMzQkosU0FBR1MsVUFBSCxDQUFjO0FBQ1pDLGFBQUs7QUFETyxPQUFkO0FBR0QsS0FKRCxNQUlNO0FBQ0poQixVQUFJaUIscUJBQUosR0FBNEIsZUFBTztBQUNqQ2pCLFlBQUlTLFVBQUosQ0FBZUMsUUFBZixHQUEwQlEsSUFBSVIsUUFBOUI7QUFDQUosV0FBR00sY0FBSCxDQUFrQixVQUFsQixFQUE4Qk0sSUFBSVIsUUFBbEM7QUFDRCxPQUhEO0FBSUQ7QUFDRixHQTdCRTtBQThCSDs7O0FBR0FTLFdBQVMsbUJBQVk7QUFDbkJiLE9BQUdjLHFCQUFILENBQXlCLFVBQVVGLEdBQVYsRUFBZTtBQUN0QyxVQUFJZCxRQUFRLENBQUMsQ0FBQ2MsSUFBSUcsQ0FBSixHQUFRLEVBQVQsRUFBYUMsT0FBYixDQUFxQixDQUFyQixDQUFiO0FBQ0EsVUFBSWxCLFFBQVEsRUFBWixFQUFnQjtBQUFFQSxnQkFBUSxFQUFSO0FBQWEsT0FBL0IsTUFDSyxJQUFJQSxRQUFRLENBQUMsRUFBYixFQUFpQjtBQUFFQSxnQkFBUSxDQUFDLEVBQVQ7QUFBYztBQUN0QyxVQUFJbUIsS0FBS3BCLElBQUwsQ0FBVUMsS0FBVixLQUFvQkEsS0FBeEIsRUFBK0I7QUFDN0JtQixhQUFLQyxPQUFMLENBQWE7QUFDWHBCLGlCQUFPQTtBQURJLFNBQWI7QUFHRDtBQUNGLEtBVEQ7QUFVRCxHQTVDRTtBQTZDSDs7O0FBR0FxQixVQUFRLGtCQUFZLENBRW5CLENBbERFO0FBbURIOzs7QUFHQUMsWUFBVSxvQkFBWSxDQUVyQixDQXhERTtBQXlESDs7O0FBR0FDLHFCQUFtQiw2QkFBWSxDQUU5QixDQTlERTtBQStESDs7O0FBR0FDLGlCQUFlLHlCQUFZLENBRTFCLENBcEVFO0FBcUVIOzs7QUFHQUMscUJBQW1CLDZCQUFZLENBRTlCO0FBMUVFLENBQUwiLCJmaWxlIjoicGFnZXMvbG9naW4vbG9naW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgYXBwID0gZ2V0QXBwKClcblBhZ2Uoe1xuICAvKipcbiAgICog6aG16Z2i55qE5Yid5aeL5pWw5o2uXG4gICAqL1xuICBkYXRhOiB7XG4gICAgYW5nbGU6IDAsXG4gICAgY2FuSVVzZTogd3guY2FuSVVzZSgnYnV0dG9uLm9wZW4tdHlwZS5nZXRVc2VySW5mbycpXG4gIH0sXG4gIC8qKlxuICAgKiBidXR0b24g6LCD5Ye655So5oi35L+h5oGv5o6I5p2DIDEuMy4w5Z+656GA5bqT5pSv5oyB77yM6L+Z6YeM5LiN5YGa5L2O54mI5pys5YW85a655aSE55CGXG4gICAqL1xuICBnZXRVc2VySW5mbzogZnVuY3Rpb24gKGUpIHtcbiAgICBhcHAuZ2xvYmFsRGF0YS51c2VySW5mbyA9IGUuZGV0YWlsLnVzZXJJbmZvXG4gICAgd3guc2V0U3RvcmFnZVN5bmMoJ3VzZXJJbmZvJywgZS5kZXRhaWwudXNlckluZm8pXG4gIH0sXG4gIC8qKlxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdouWKoOi9vVxuICAgKi9cbiAgb25Mb2FkOiBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgIGlmIChhcHAuZ2xvYmFsRGF0YS51c2VySW5mbykge1xuICAgICAgd3gucmVkaXJlY3RUbyh7XG4gICAgICAgIHVybDogJy4uL2luZGV4L2luZGV4J1xuICAgICAgfSlcbiAgICB9IGVsc2V7XG4gICAgICBhcHAudXNlckluZm9SZWFkeUNhbGxiYWNrID0gcmVzID0+IHtcbiAgICAgICAgYXBwLmdsb2JhbERhdGEudXNlckluZm8gPSByZXMudXNlckluZm9cbiAgICAgICAgd3guc2V0U3RvcmFnZVN5bmMoJ3VzZXJJbmZvJywgcmVzLnVzZXJJbmZvKVxuICAgICAgfVxuICAgIH0gXG4gIH0sXG4gIC8qKlxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdouWIneasoea4suafk+WujOaIkFxuICAgKi9cbiAgb25SZWFkeTogZnVuY3Rpb24gKCkge1xuICAgIHd4Lm9uQWNjZWxlcm9tZXRlckNoYW5nZShmdW5jdGlvbiAocmVzKSB7XG4gICAgICB2YXIgYW5nbGUgPSAtKHJlcy54ICogMzApLnRvRml4ZWQoMSk7XG4gICAgICBpZiAoYW5nbGUgPiAxNCkgeyBhbmdsZSA9IDE0OyB9XG4gICAgICBlbHNlIGlmIChhbmdsZSA8IC0xNCkgeyBhbmdsZSA9IC0xNDsgfVxuICAgICAgaWYgKHRoYXQuZGF0YS5hbmdsZSAhPT0gYW5nbGUpIHtcbiAgICAgICAgdGhhdC5zZXREYXRhKHtcbiAgICAgICAgICBhbmdsZTogYW5nbGVcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0sXG4gIC8qKlxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdoumakOiXj1xuICAgKi9cbiAgb25IaWRlOiBmdW5jdGlvbiAoKSB7XG5cbiAgfSxcbiAgLyoqXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5Y246L29XG4gICAqL1xuICBvblVubG9hZDogZnVuY3Rpb24gKCkge1xuXG4gIH0sXG4gIC8qKlxuICAgKiDpobXpnaLnm7jlhbPkuovku7blpITnkIblh73mlbAtLeebkeWQrOeUqOaIt+S4i+aLieWKqOS9nFxuICAgKi9cbiAgb25QdWxsRG93blJlZnJlc2g6IGZ1bmN0aW9uICgpIHtcblxuICB9LFxuICAvKipcbiAgICog6aG16Z2i5LiK5ouJ6Kem5bqV5LqL5Lu255qE5aSE55CG5Ye95pWwXG4gICAqL1xuICBvblJlYWNoQm90dG9tOiBmdW5jdGlvbiAoKSB7XG5cbiAgfSxcbiAgLyoqXG4gICAqIOeUqOaIt+eCueWHu+WPs+S4iuinkuWIhuS6q1xuICAgKi9cbiAgb25TaGFyZUFwcE1lc3NhZ2U6IGZ1bmN0aW9uICgpIHtcblxuICB9XG59KSJdfQ==
