var regeneratorRuntime = require("../../lib/runtime.js");'use strict';

var app = getApp();
var projectService = require('../../service/projectRequest.js');
var common = require('../../utils/util.js');
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
    },
    tips: {
      hiddenErrmsg: true,
      errmsg: ''
    }
  },
  /**
   * button 调出用户信息授权 1.3.0基础库支持，这里不做低版本兼容处理
   */
  getUserInfo: function getUserInfo(e) {
    wx.setStorageSync('wxUser',e.detail.userInfo)
    if (!e.detail.userInfo) {
      common.TIP.showErrMsg(this, '请允许微信授权');
      return;
    }
    var userInfo = wx.getStorageSync('userInfo');
    if (userInfo) return;

    // encryptedData此处就是为了获取uionid
    var param = {
      // nickName:e.detail.userInfo.nickName,
      // avatarUrl:e.detail.userInfo.avatarUrl,
      encryptedData: e.detail.encryptedData,
      iv: e.detail.iv,
      code: app.globalData.code
    };
    app.checkSession(param, e.detail.userInfo);
  },
  /**
   * 关闭弹窗
   */
  closeDialog: function closeDialog() {
    wx.navigateBack({
      delta: 0
    });
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
      console.log(res);
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzL2xvZ2luL2xvZ2luLmpzIl0sIm5hbWVzIjpbImFwcCIsImdldEFwcCIsInByb2plY3RTZXJ2aWNlIiwicmVxdWlyZSIsImNvbW1vbiIsIlBhZ2UiLCJkYXRhIiwiYW5nbGUiLCJjYW5JVXNlIiwid3giLCJkaWFsb2ciLCJjbG9zZVN0eWxlIiwiaWNvbiIsInRpdGxlIiwiaW5mbyIsImJ0biIsInRpcHMiLCJoaWRkZW5FcnJtc2ciLCJlcnJtc2ciLCJnZXRVc2VySW5mbyIsImUiLCJkZXRhaWwiLCJ1c2VySW5mbyIsIlRJUCIsInNob3dFcnJNc2ciLCJnZXRTdG9yYWdlU3luYyIsInBhcmFtIiwiZW5jcnlwdGVkRGF0YSIsIml2IiwiY29kZSIsImdsb2JhbERhdGEiLCJjaGVja1Nlc3Npb24iLCJjbG9zZURpYWxvZyIsIm5hdmlnYXRlQmFjayIsImRlbHRhIiwib25Mb2FkIiwib3B0aW9ucyIsInJlZGlyZWN0VG8iLCJ1cmwiLCJ1c2VySW5mb1JlYWR5Q2FsbGJhY2siLCJyZXMiLCJzZXRTdG9yYWdlU3luYyIsIm9uUmVhZHkiLCJvbkFjY2VsZXJvbWV0ZXJDaGFuZ2UiLCJjb25zb2xlIiwibG9nIiwieCIsInRvRml4ZWQiLCJ0aGF0Iiwic2V0RGF0YSIsIm9uSGlkZSIsIm9uVW5sb2FkIiwib25QdWxsRG93blJlZnJlc2giLCJvblJlYWNoQm90dG9tIiwib25TaGFyZUFwcE1lc3NhZ2UiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSUEsTUFBTUMsUUFBVjtBQUNBLElBQUlDLGlCQUFpQkMsUUFBUSxpQ0FBUixDQUFyQjtBQUNBLElBQUlDLFNBQU9ELFFBQVEscUJBQVIsQ0FBWDtBQUNBRSxLQUFLO0FBQ0g7Ozs7OztBQU1BQyxRQUFNO0FBQ0pDLFdBQU8sQ0FESCxFQUNLO0FBQ1RDLGFBQVNDLEdBQUdELE9BQUgsQ0FBVyw4QkFBWCxDQUZMO0FBR0pFLFlBQVE7QUFDTkMsa0JBQVksRUFETjtBQUVOQyxZQUFNLFlBRkE7QUFHTkMsYUFBTyxRQUhEO0FBSU5DLFlBQU0sK0JBSkE7QUFLTkMsV0FBSztBQUxDLEtBSEo7QUFVSkMsVUFBTTtBQUNKQyxvQkFBYyxJQURWO0FBRUpDLGNBQVE7QUFGSjtBQVZGLEdBUEg7QUFzQkg7OztBQUdBQyxlQUFhLHFCQUFVQyxDQUFWLEVBQWE7QUFDeEIsUUFBSSxDQUFDQSxFQUFFQyxNQUFGLENBQVNDLFFBQWQsRUFBd0I7QUFDdEJsQixhQUFPbUIsR0FBUCxDQUFXQyxVQUFYLENBQXNCLElBQXRCLEVBQTJCLFNBQTNCO0FBQ0E7QUFDRDtBQUNELFFBQUlGLFdBQVdiLEdBQUdnQixjQUFILENBQWtCLFVBQWxCLENBQWY7QUFDQSxRQUFJSCxRQUFKLEVBQWM7O0FBRWQ7QUFDQSxRQUFJSSxRQUFRO0FBQ1Y7QUFDQTtBQUNBQyxxQkFBZVAsRUFBRUMsTUFBRixDQUFTTSxhQUhkO0FBSVZDLFVBQUlSLEVBQUVDLE1BQUYsQ0FBU08sRUFKSDtBQUtWQyxZQUFNN0IsSUFBSThCLFVBQUosQ0FBZUQ7QUFMWCxLQUFaO0FBT0E3QixRQUFJK0IsWUFBSixDQUFpQkwsS0FBakIsRUFBdUJOLEVBQUVDLE1BQUYsQ0FBU0MsUUFBaEM7QUFFRCxHQTNDRTtBQTRDSDs7O0FBR0FVLGVBQWEsdUJBQVk7QUFDdkJ2QixPQUFHd0IsWUFBSCxDQUFnQjtBQUNkQyxhQUFPO0FBRE8sS0FBaEI7QUFHRCxHQW5ERTtBQW9ESDs7O0FBR0FDLFVBQVEsZ0JBQVVDLE9BQVYsRUFBbUI7QUFDekIsUUFBSXBDLElBQUk4QixVQUFKLENBQWVSLFFBQW5CLEVBQTZCO0FBQzNCYixTQUFHNEIsVUFBSCxDQUFjO0FBQ1pDLGFBQUs7QUFETyxPQUFkO0FBR0QsS0FKRCxNQUlPLElBQUksS0FBS2hDLElBQUwsQ0FBVUUsT0FBZCxFQUF1QjtBQUM1QlIsVUFBSXVDLHFCQUFKLEdBQTRCLGVBQU87QUFDakN2QyxZQUFJOEIsVUFBSixDQUFlUixRQUFmLEdBQTBCa0IsSUFBSWxCLFFBQTlCO0FBQ0FiLFdBQUdnQyxjQUFILENBQWtCLFVBQWxCLEVBQThCRCxJQUFJbEIsUUFBbEM7QUFDRCxPQUhEO0FBSUQ7QUFDRixHQWxFRTtBQW1FSDs7O0FBR0FvQixXQUFTLG1CQUFZO0FBQ25CakMsT0FBR2tDLHFCQUFILENBQXlCLFVBQVVILEdBQVYsRUFBZTtBQUN0Q0ksY0FBUUMsR0FBUixDQUFZTCxHQUFaO0FBQ0EsVUFBSWpDLFFBQVEsQ0FBQyxDQUFDaUMsSUFBSU0sQ0FBSixHQUFRLEVBQVQsRUFBYUMsT0FBYixDQUFxQixDQUFyQixDQUFiO0FBQ0EsVUFBSXhDLFFBQVEsRUFBWixFQUFnQjtBQUFFQSxnQkFBUSxFQUFSO0FBQWEsT0FBL0IsTUFDSyxJQUFJQSxRQUFRLENBQUMsRUFBYixFQUFpQjtBQUFFQSxnQkFBUSxDQUFDLEVBQVQ7QUFBYztBQUN0QyxVQUFJeUMsS0FBSzFDLElBQUwsQ0FBVUMsS0FBVixLQUFvQkEsS0FBeEIsRUFBK0I7QUFDN0J5QyxhQUFLQyxPQUFMLENBQWE7QUFDWDFDLGlCQUFPQTtBQURJLFNBQWI7QUFHRDtBQUNGLEtBVkQ7QUFXRCxHQWxGRTtBQW1GSDs7O0FBR0EyQyxVQUFRLGtCQUFZLENBRW5CLENBeEZFO0FBeUZIOzs7QUFHQUMsWUFBVSxvQkFBWSxDQUVyQixDQTlGRTtBQStGSDs7O0FBR0FDLHFCQUFtQiw2QkFBWSxDQUU5QixDQXBHRTtBQXFHSDs7O0FBR0FDLGlCQUFlLHlCQUFZLENBRTFCLENBMUdFO0FBMkdIOzs7QUFHQUMscUJBQW1CLDZCQUFZLENBRTlCO0FBaEhFLENBQUwiLCJmaWxlIjoicGFnZXMvbG9naW4vbG9naW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJsZXQgYXBwID0gZ2V0QXBwKClcbmxldCBwcm9qZWN0U2VydmljZSA9IHJlcXVpcmUoJy4uLy4uL3NlcnZpY2UvcHJvamVjdFJlcXVlc3QuanMnKVxubGV0IGNvbW1vbj1yZXF1aXJlKCcuLi8uLi91dGlscy91dGlsLmpzJylcblBhZ2Uoe1xuICAvKipcbiAgICog6aG16Z2i55qE5Yid5aeL5pWw5o2uXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBhbmdsZSDlpLTlg4/ov5Dliqjop5LluqZcbiAgICogQHBhcmFtIHtib29sZWFufSBjYW5JVXNlIOaYr+WQpuaUr+aMgeeUqGJ1dHRvbi5vcGVuLXR5cGXnmoTlvaLlvI/ojrflj5bnlKjmiLfkv6Hmga9cbiAgICogQHBhcmFtIHtvYmplY3R9ICBkaWFsb2cg54mI5pys5YW85a655by556qX55u45YWz5L+h5oGvXG4gICAqL1xuICBkYXRhOiB7XG4gICAgYW5nbGU6IDAsLy9cbiAgICBjYW5JVXNlOiB3eC5jYW5JVXNlKCdidXR0b24ub3Blbi10eXBlLmdldFVzZXJJbmZvJyksXG4gICAgZGlhbG9nOiB7XG4gICAgICBjbG9zZVN0eWxlOiAnJyxcbiAgICAgIGljb246ICdpY29uLXNvcnJ5JyxcbiAgICAgIHRpdGxlOiAn5b6u5L+h54mI5pys6L+H5L2OJyxcbiAgICAgIGluZm86ICfor7fliY3lvoDlvq7kv6Hmm7TmlrDlvq7kv6HniYjmnKzoh7PmnIDmlrDvvIzpo47ph4zpm6jph4zmiJHku6zlnKjov5nph4znrYnkvaDlm57mnaXjgIInLFxuICAgICAgYnRuOiAn5aW955qEJ1xuICAgIH0sXG4gICAgdGlwczoge1xuICAgICAgaGlkZGVuRXJybXNnOiB0cnVlLFxuICAgICAgZXJybXNnOiAnJyxcbiAgICB9XG4gIH0sXG4gIC8qKlxuICAgKiBidXR0b24g6LCD5Ye655So5oi35L+h5oGv5o6I5p2DIDEuMy4w5Z+656GA5bqT5pSv5oyB77yM6L+Z6YeM5LiN5YGa5L2O54mI5pys5YW85a655aSE55CGXG4gICAqL1xuICBnZXRVc2VySW5mbzogZnVuY3Rpb24gKGUpIHtcbiAgICBpZiAoIWUuZGV0YWlsLnVzZXJJbmZvKSB7XG4gICAgICBjb21tb24uVElQLnNob3dFcnJNc2codGhpcywn6K+35YWB6K645b6u5L+h5o6I5p2DJylcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBsZXQgdXNlckluZm8gPSB3eC5nZXRTdG9yYWdlU3luYygndXNlckluZm8nKVxuICAgIGlmICh1c2VySW5mbykgcmV0dXJuXG5cbiAgICAvLyBlbmNyeXB0ZWREYXRh5q2k5aSE5bCx5piv5Li65LqG6I635Y+WdWlvbmlkXG4gICAgbGV0IHBhcmFtID0ge1xuICAgICAgLy8gbmlja05hbWU6ZS5kZXRhaWwudXNlckluZm8ubmlja05hbWUsXG4gICAgICAvLyBhdmF0YXJVcmw6ZS5kZXRhaWwudXNlckluZm8uYXZhdGFyVXJsLFxuICAgICAgZW5jcnlwdGVkRGF0YTogZS5kZXRhaWwuZW5jcnlwdGVkRGF0YSxcbiAgICAgIGl2OiBlLmRldGFpbC5pdixcbiAgICAgIGNvZGU6IGFwcC5nbG9iYWxEYXRhLmNvZGVcbiAgICB9XG4gICAgYXBwLmNoZWNrU2Vzc2lvbihwYXJhbSxlLmRldGFpbC51c2VySW5mbylcblxuICB9LFxuICAvKipcbiAgICog5YWz6Zet5by556qXXG4gICAqL1xuICBjbG9zZURpYWxvZzogZnVuY3Rpb24gKCkge1xuICAgIHd4Lm5hdmlnYXRlQmFjayh7XG4gICAgICBkZWx0YTogMFxuICAgIH0pXG4gIH0sXG4gIC8qKlxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdouWKoOi9vVxuICAgKi9cbiAgb25Mb2FkOiBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgIGlmIChhcHAuZ2xvYmFsRGF0YS51c2VySW5mbykge1xuICAgICAgd3gucmVkaXJlY3RUbyh7XG4gICAgICAgIHVybDogJy4uL2luZGV4L2luZGV4J1xuICAgICAgfSlcbiAgICB9IGVsc2UgaWYgKHRoaXMuZGF0YS5jYW5JVXNlKSB7XG4gICAgICBhcHAudXNlckluZm9SZWFkeUNhbGxiYWNrID0gcmVzID0+IHtcbiAgICAgICAgYXBwLmdsb2JhbERhdGEudXNlckluZm8gPSByZXMudXNlckluZm9cbiAgICAgICAgd3guc2V0U3RvcmFnZVN5bmMoJ3VzZXJJbmZvJywgcmVzLnVzZXJJbmZvKVxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgLyoqXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5Yid5qyh5riy5p+T5a6M5oiQXG4gICAqL1xuICBvblJlYWR5OiBmdW5jdGlvbiAoKSB7XG4gICAgd3gub25BY2NlbGVyb21ldGVyQ2hhbmdlKGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgIHZhciBhbmdsZSA9IC0ocmVzLnggKiAzMCkudG9GaXhlZCgxKTtcbiAgICAgIGlmIChhbmdsZSA+IDE0KSB7IGFuZ2xlID0gMTQ7IH1cbiAgICAgIGVsc2UgaWYgKGFuZ2xlIDwgLTE0KSB7IGFuZ2xlID0gLTE0OyB9XG4gICAgICBpZiAodGhhdC5kYXRhLmFuZ2xlICE9PSBhbmdsZSkge1xuICAgICAgICB0aGF0LnNldERhdGEoe1xuICAgICAgICAgIGFuZ2xlOiBhbmdsZVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSxcbiAgLyoqXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i6ZqQ6JePXG4gICAqL1xuICBvbkhpZGU6IGZ1bmN0aW9uICgpIHtcblxuICB9LFxuICAvKipcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLljbjovb1cbiAgICovXG4gIG9uVW5sb2FkOiBmdW5jdGlvbiAoKSB7XG5cbiAgfSxcbiAgLyoqXG4gICAqIOmhtemdouebuOWFs+S6i+S7tuWkhOeQhuWHveaVsC0t55uR5ZCs55So5oi35LiL5ouJ5Yqo5L2cXG4gICAqL1xuICBvblB1bGxEb3duUmVmcmVzaDogZnVuY3Rpb24gKCkge1xuXG4gIH0sXG4gIC8qKlxuICAgKiDpobXpnaLkuIrmi4nop6blupXkuovku7bnmoTlpITnkIblh73mlbBcbiAgICovXG4gIG9uUmVhY2hCb3R0b206IGZ1bmN0aW9uICgpIHtcblxuICB9LFxuICAvKipcbiAgICog55So5oi354K55Ye75Y+z5LiK6KeS5YiG5LqrXG4gICAqL1xuICBvblNoYXJlQXBwTWVzc2FnZTogZnVuY3Rpb24gKCkge1xuXG4gIH1cbn0pIl19
