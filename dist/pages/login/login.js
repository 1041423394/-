var regeneratorRuntime = require("../../lib/runtime.js");'use strict';

var app = getApp();
var projectService = require('../../service/projectRequest.js');
Page({
  /**
   * 页面的初始数据
   * @param {number} angle 头像运动角度
   * @param {boolean} canIUse 是否支持用button.open-type的形式获取用户信息
   * @param {object}  dialog 版本兼容弹窗相关信息
   */
  data: {
    angle: 0, //
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    dialog: {
      closeStyle: '',
      icon: 'icon-sorry',
      title: '微信版本过低',
      info: '请前往微信更新微信版本至最新，风里雨里我们在这里等你回来。',
      btn: '好的'

    }
  },
  /**
   * button 调出用户信息授权 1.3.0基础库支持，这里不做低版本兼容处理
   */
  getUserInfo: function getUserInfo(e) {
    var userInfo = wx.getStorageSync('userInfo');
    app.globalData.userInfo = e.detail.userInfo;

    if (userInfo) return;
    wx.checkSession({
      success: function success() {
        var param = {
          encryptedData: e.detail.encryptedData,
          iv: e.detail.iv,
          code: app.globalData.code
        };
        var result = projectService.getOpenId({ params: param });
        wx.setStorageSync('userInfo', e.detail.userInfo);
      },
      fail: function fail() {}
    });
  },
  /**
   * 关闭弹窗
   */
  closeDialog: function closeDialog() {
    wx.navigateBack();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function onLoad(options) {
    if (app.globalData.userInfo) {
      wx.redirectTo({
        url: '../index/index'
      });
    } else if (this.data.canIUse) {
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzL2xvZ2luL2xvZ2luLmpzIl0sIm5hbWVzIjpbImFwcCIsImdldEFwcCIsInByb2plY3RTZXJ2aWNlIiwicmVxdWlyZSIsIlBhZ2UiLCJkYXRhIiwiYW5nbGUiLCJjYW5JVXNlIiwid3giLCJkaWFsb2ciLCJjbG9zZVN0eWxlIiwiaWNvbiIsInRpdGxlIiwiaW5mbyIsImJ0biIsImdldFVzZXJJbmZvIiwiZSIsInVzZXJJbmZvIiwiZ2V0U3RvcmFnZVN5bmMiLCJnbG9iYWxEYXRhIiwiZGV0YWlsIiwiY2hlY2tTZXNzaW9uIiwic3VjY2VzcyIsInBhcmFtIiwiZW5jcnlwdGVkRGF0YSIsIml2IiwiY29kZSIsInJlc3VsdCIsImdldE9wZW5JZCIsInBhcmFtcyIsInNldFN0b3JhZ2VTeW5jIiwiZmFpbCIsImNsb3NlRGlhbG9nIiwibmF2aWdhdGVCYWNrIiwib25Mb2FkIiwib3B0aW9ucyIsInJlZGlyZWN0VG8iLCJ1cmwiLCJ1c2VySW5mb1JlYWR5Q2FsbGJhY2siLCJyZXMiLCJvblJlYWR5Iiwib25BY2NlbGVyb21ldGVyQ2hhbmdlIiwieCIsInRvRml4ZWQiLCJ0aGF0Iiwic2V0RGF0YSIsIm9uSGlkZSIsIm9uVW5sb2FkIiwib25QdWxsRG93blJlZnJlc2giLCJvblJlYWNoQm90dG9tIiwib25TaGFyZUFwcE1lc3NhZ2UiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSUEsTUFBTUMsUUFBVjtBQUNBLElBQUlDLGlCQUFlQyxRQUFRLGlDQUFSLENBQW5CO0FBQ0FDLEtBQUs7QUFDSDs7Ozs7O0FBTUFDLFFBQU07QUFDSkMsV0FBTyxDQURILEVBQ0s7QUFDVEMsYUFBU0MsR0FBR0QsT0FBSCxDQUFXLDhCQUFYLENBRkw7QUFHSkUsWUFBTztBQUNMQyxrQkFBVyxFQUROO0FBRUxDLFlBQUssWUFGQTtBQUdMQyxhQUFNLFFBSEQ7QUFJTEMsWUFBSywrQkFKQTtBQUtMQyxXQUFJOztBQUxDO0FBSEgsR0FQSDtBQW1CSDs7O0FBR0FDLGVBQWEscUJBQVVDLENBQVYsRUFBYTtBQUN4QixRQUFJQyxXQUFTVCxHQUFHVSxjQUFILENBQWtCLFVBQWxCLENBQWI7QUFDQWxCLFFBQUltQixVQUFKLENBQWVGLFFBQWYsR0FBMEJELEVBQUVJLE1BQUYsQ0FBU0gsUUFBbkM7O0FBRUEsUUFBR0EsUUFBSCxFQUFZO0FBQ1pULE9BQUdhLFlBQUgsQ0FBZ0I7QUFDZEMsZUFBUSxtQkFBSTtBQUNWLFlBQUlDLFFBQU07QUFDUkMseUJBQWNSLEVBQUVJLE1BQUYsQ0FBU0ksYUFEZjtBQUVSQyxjQUFHVCxFQUFFSSxNQUFGLENBQVNLLEVBRko7QUFHUkMsZ0JBQUsxQixJQUFJbUIsVUFBSixDQUFlTztBQUhaLFNBQVY7QUFLQSxZQUFJQyxTQUFPekIsZUFBZTBCLFNBQWYsQ0FBeUIsRUFBQ0MsUUFBT04sS0FBUixFQUF6QixDQUFYO0FBQ0FmLFdBQUdzQixjQUFILENBQWtCLFVBQWxCLEVBQThCZCxFQUFFSSxNQUFGLENBQVNILFFBQXZDO0FBQ0QsT0FUYTtBQVVkYyxZQUFLLGdCQUFJLENBRVI7QUFaYSxLQUFoQjtBQWVELEdBMUNFO0FBMkNIOzs7QUFHQUMsZUFBWSx1QkFBSTtBQUNkeEIsT0FBR3lCLFlBQUg7QUFDRCxHQWhERTtBQWlESDs7O0FBR0FDLFVBQVEsZ0JBQVVDLE9BQVYsRUFBbUI7QUFDekIsUUFBSW5DLElBQUltQixVQUFKLENBQWVGLFFBQW5CLEVBQTZCO0FBQzNCVCxTQUFHNEIsVUFBSCxDQUFjO0FBQ1pDLGFBQUs7QUFETyxPQUFkO0FBR0QsS0FKRCxNQUlPLElBQUcsS0FBS2hDLElBQUwsQ0FBVUUsT0FBYixFQUFxQjtBQUMxQlAsVUFBSXNDLHFCQUFKLEdBQTRCLGVBQU87QUFDakN0QyxZQUFJbUIsVUFBSixDQUFlRixRQUFmLEdBQTBCc0IsSUFBSXRCLFFBQTlCO0FBQ0FULFdBQUdzQixjQUFILENBQWtCLFVBQWxCLEVBQThCUyxJQUFJdEIsUUFBbEM7QUFDRCxPQUhEO0FBSUQ7QUFDRixHQS9ERTtBQWdFSDs7O0FBR0F1QixXQUFTLG1CQUFZO0FBQ25CaEMsT0FBR2lDLHFCQUFILENBQXlCLFVBQVVGLEdBQVYsRUFBZTtBQUN0QyxVQUFJakMsUUFBUSxDQUFDLENBQUNpQyxJQUFJRyxDQUFKLEdBQVEsRUFBVCxFQUFhQyxPQUFiLENBQXFCLENBQXJCLENBQWI7QUFDQSxVQUFJckMsUUFBUSxFQUFaLEVBQWdCO0FBQUVBLGdCQUFRLEVBQVI7QUFBYSxPQUEvQixNQUNLLElBQUlBLFFBQVEsQ0FBQyxFQUFiLEVBQWlCO0FBQUVBLGdCQUFRLENBQUMsRUFBVDtBQUFjO0FBQ3RDLFVBQUlzQyxLQUFLdkMsSUFBTCxDQUFVQyxLQUFWLEtBQW9CQSxLQUF4QixFQUErQjtBQUM3QnNDLGFBQUtDLE9BQUwsQ0FBYTtBQUNYdkMsaUJBQU9BO0FBREksU0FBYjtBQUdEO0FBQ0YsS0FURDtBQVVELEdBOUVFO0FBK0VIOzs7QUFHQXdDLFVBQVEsa0JBQVksQ0FFbkIsQ0FwRkU7QUFxRkg7OztBQUdBQyxZQUFVLG9CQUFZLENBRXJCLENBMUZFO0FBMkZIOzs7QUFHQUMscUJBQW1CLDZCQUFZLENBRTlCLENBaEdFO0FBaUdIOzs7QUFHQUMsaUJBQWUseUJBQVksQ0FFMUIsQ0F0R0U7QUF1R0g7OztBQUdBQyxxQkFBbUIsNkJBQVksQ0FFOUI7QUE1R0UsQ0FBTCIsImZpbGUiOiJwYWdlcy9sb2dpbi9sb2dpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImxldCBhcHAgPSBnZXRBcHAoKVxubGV0IHByb2plY3RTZXJ2aWNlPXJlcXVpcmUoJy4uLy4uL3NlcnZpY2UvcHJvamVjdFJlcXVlc3QuanMnKVxuUGFnZSh7XG4gIC8qKlxuICAgKiDpobXpnaLnmoTliJ3lp4vmlbDmja5cbiAgICogQHBhcmFtIHtudW1iZXJ9IGFuZ2xlIOWktOWDj+i/kOWKqOinkuW6plxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IGNhbklVc2Ug5piv5ZCm5pSv5oyB55SoYnV0dG9uLm9wZW4tdHlwZeeahOW9ouW8j+iOt+WPlueUqOaIt+S/oeaBr1xuICAgKiBAcGFyYW0ge29iamVjdH0gIGRpYWxvZyDniYjmnKzlhbzlrrnlvLnnqpfnm7jlhbPkv6Hmga9cbiAgICovXG4gIGRhdGE6IHtcbiAgICBhbmdsZTogMCwvL1xuICAgIGNhbklVc2U6IHd4LmNhbklVc2UoJ2J1dHRvbi5vcGVuLXR5cGUuZ2V0VXNlckluZm8nKSxcbiAgICBkaWFsb2c6e1xuICAgICAgY2xvc2VTdHlsZTonJyxcbiAgICAgIGljb246J2ljb24tc29ycnknLFxuICAgICAgdGl0bGU6J+W+ruS/oeeJiOacrOi/h+S9jicsXG4gICAgICBpbmZvOifor7fliY3lvoDlvq7kv6Hmm7TmlrDlvq7kv6HniYjmnKzoh7PmnIDmlrDvvIzpo47ph4zpm6jph4zmiJHku6zlnKjov5nph4znrYnkvaDlm57mnaXjgIInLFxuICAgICAgYnRuOiflpb3nmoQnXG5cbiAgICB9XG4gIH0sXG4gIC8qKlxuICAgKiBidXR0b24g6LCD5Ye655So5oi35L+h5oGv5o6I5p2DIDEuMy4w5Z+656GA5bqT5pSv5oyB77yM6L+Z6YeM5LiN5YGa5L2O54mI5pys5YW85a655aSE55CGXG4gICAqL1xuICBnZXRVc2VySW5mbzogZnVuY3Rpb24gKGUpIHtcbiAgICBsZXQgdXNlckluZm89d3guZ2V0U3RvcmFnZVN5bmMoJ3VzZXJJbmZvJylcbiAgICBhcHAuZ2xvYmFsRGF0YS51c2VySW5mbyA9IGUuZGV0YWlsLnVzZXJJbmZvXG5cbiAgICBpZih1c2VySW5mbylyZXR1cm5cbiAgICB3eC5jaGVja1Nlc3Npb24oe1xuICAgICAgc3VjY2VzczooKT0+e1xuICAgICAgICBsZXQgcGFyYW09e1xuICAgICAgICAgIGVuY3J5cHRlZERhdGE6ZS5kZXRhaWwuZW5jcnlwdGVkRGF0YSxcbiAgICAgICAgICBpdjplLmRldGFpbC5pdixcbiAgICAgICAgICBjb2RlOmFwcC5nbG9iYWxEYXRhLmNvZGVcbiAgICAgICAgfVxuICAgICAgICBsZXQgcmVzdWx0PXByb2plY3RTZXJ2aWNlLmdldE9wZW5JZCh7cGFyYW1zOnBhcmFtfSlcbiAgICAgICAgd3guc2V0U3RvcmFnZVN5bmMoJ3VzZXJJbmZvJywgZS5kZXRhaWwudXNlckluZm8pXG4gICAgICB9LFxuICAgICAgZmFpbDooKT0+e1xuICAgICAgICBcbiAgICAgIH1cbiAgICB9KVxuICAgXG4gIH0sXG4gIC8qKlxuICAgKiDlhbPpl63lvLnnqpdcbiAgICovXG4gIGNsb3NlRGlhbG9nOigpPT57XG4gICAgd3gubmF2aWdhdGVCYWNrKClcbiAgfSxcbiAgLyoqXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5Yqg6L29XG4gICAqL1xuICBvbkxvYWQ6IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgaWYgKGFwcC5nbG9iYWxEYXRhLnVzZXJJbmZvKSB7XG4gICAgICB3eC5yZWRpcmVjdFRvKHtcbiAgICAgICAgdXJsOiAnLi4vaW5kZXgvaW5kZXgnXG4gICAgICB9KVxuICAgIH0gZWxzZSBpZih0aGlzLmRhdGEuY2FuSVVzZSl7XG4gICAgICBhcHAudXNlckluZm9SZWFkeUNhbGxiYWNrID0gcmVzID0+IHtcbiAgICAgICAgYXBwLmdsb2JhbERhdGEudXNlckluZm8gPSByZXMudXNlckluZm9cbiAgICAgICAgd3guc2V0U3RvcmFnZVN5bmMoJ3VzZXJJbmZvJywgcmVzLnVzZXJJbmZvKVxuICAgICAgfVxuICAgIH0gXG4gIH0sXG4gIC8qKlxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdouWIneasoea4suafk+WujOaIkFxuICAgKi9cbiAgb25SZWFkeTogZnVuY3Rpb24gKCkge1xuICAgIHd4Lm9uQWNjZWxlcm9tZXRlckNoYW5nZShmdW5jdGlvbiAocmVzKSB7XG4gICAgICB2YXIgYW5nbGUgPSAtKHJlcy54ICogMzApLnRvRml4ZWQoMSk7XG4gICAgICBpZiAoYW5nbGUgPiAxNCkgeyBhbmdsZSA9IDE0OyB9XG4gICAgICBlbHNlIGlmIChhbmdsZSA8IC0xNCkgeyBhbmdsZSA9IC0xNDsgfVxuICAgICAgaWYgKHRoYXQuZGF0YS5hbmdsZSAhPT0gYW5nbGUpIHtcbiAgICAgICAgdGhhdC5zZXREYXRhKHtcbiAgICAgICAgICBhbmdsZTogYW5nbGVcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0sXG4gIC8qKlxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdoumakOiXj1xuICAgKi9cbiAgb25IaWRlOiBmdW5jdGlvbiAoKSB7XG5cbiAgfSxcbiAgLyoqXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5Y246L29XG4gICAqL1xuICBvblVubG9hZDogZnVuY3Rpb24gKCkge1xuXG4gIH0sXG4gIC8qKlxuICAgKiDpobXpnaLnm7jlhbPkuovku7blpITnkIblh73mlbAtLeebkeWQrOeUqOaIt+S4i+aLieWKqOS9nFxuICAgKi9cbiAgb25QdWxsRG93blJlZnJlc2g6IGZ1bmN0aW9uICgpIHtcblxuICB9LFxuICAvKipcbiAgICog6aG16Z2i5LiK5ouJ6Kem5bqV5LqL5Lu255qE5aSE55CG5Ye95pWwXG4gICAqL1xuICBvblJlYWNoQm90dG9tOiBmdW5jdGlvbiAoKSB7XG5cbiAgfSxcbiAgLyoqXG4gICAqIOeUqOaIt+eCueWHu+WPs+S4iuinkuWIhuS6q1xuICAgKi9cbiAgb25TaGFyZUFwcE1lc3NhZ2U6IGZ1bmN0aW9uICgpIHtcblxuICB9XG59KSJdfQ==
