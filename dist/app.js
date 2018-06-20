var regeneratorRuntime = require("lib/runtime.js");'use strict';

//app.js
App({
  onLaunch: function onLaunch() {
    var _this = this;

    wx.login({
      success: function success(res) {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    });
    // 获取用户信息
    wx.getSetting({
      success: function success(res) {
        console.log(9);
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: function success(res) {
              // 可以将 res 发送给后台解码出 unionId
              _this.globalData.userInfo = res.userInfo;
              wx.setStorageSync('userInfo', res.userInfo);

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (_this.userInfoReadyCallback) {
                _this.userInfoReadyCallback(res);
              }
            }
          });
        }
      }
    });
  },
  globalData: {
    userInfo: null
  }
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJBcHAiLCJvbkxhdW5jaCIsInd4IiwibG9naW4iLCJzdWNjZXNzIiwiZ2V0U2V0dGluZyIsImNvbnNvbGUiLCJsb2ciLCJyZXMiLCJhdXRoU2V0dGluZyIsImdldFVzZXJJbmZvIiwiZ2xvYmFsRGF0YSIsInVzZXJJbmZvIiwic2V0U3RvcmFnZVN5bmMiLCJ1c2VySW5mb1JlYWR5Q2FsbGJhY2siXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQUEsSUFBSTtBQUNGQyxZQUFVLG9CQUFZO0FBQUE7O0FBQ3BCQyxPQUFHQyxLQUFILENBQVM7QUFDUEMsZUFBUyxzQkFBTztBQUNkO0FBQ0Q7QUFITSxLQUFUO0FBS0E7QUFDQUYsT0FBR0csVUFBSCxDQUFjO0FBQ1pELGVBQVMsc0JBQU87QUFDZEUsZ0JBQVFDLEdBQVIsQ0FBWSxDQUFaO0FBQ0EsWUFBSUMsSUFBSUMsV0FBSixDQUFnQixnQkFBaEIsQ0FBSixFQUF1QztBQUNyQztBQUNBUCxhQUFHUSxXQUFILENBQWU7QUFDYk4scUJBQVMsc0JBQU87QUFDZDtBQUNBLG9CQUFLTyxVQUFMLENBQWdCQyxRQUFoQixHQUEyQkosSUFBSUksUUFBL0I7QUFDQVYsaUJBQUdXLGNBQUgsQ0FBa0IsVUFBbEIsRUFBOEJMLElBQUlJLFFBQWxDOztBQUVBO0FBQ0E7QUFDQSxrQkFBSSxNQUFLRSxxQkFBVCxFQUFnQztBQUM5QixzQkFBS0EscUJBQUwsQ0FBMkJOLEdBQTNCO0FBQ0Q7QUFDRjtBQVhZLFdBQWY7QUFhRDtBQUNGO0FBbkJXLEtBQWQ7QUFxQkQsR0E3QkM7QUE4QkZHLGNBQVk7QUFDVkMsY0FBVTtBQURBO0FBOUJWLENBQUoiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy9hcHAuanNcbkFwcCh7XG4gIG9uTGF1bmNoOiBmdW5jdGlvbiAoKSB7XG4gICAgd3gubG9naW4oe1xuICAgICAgc3VjY2VzczogcmVzID0+IHtcbiAgICAgICAgLy8g5Y+R6YCBIHJlcy5jb2RlIOWIsOWQjuWPsOaNouWPliBvcGVuSWQsIHNlc3Npb25LZXksIHVuaW9uSWRcbiAgICAgIH1cbiAgICB9KVxuICAgIC8vIOiOt+WPlueUqOaIt+S/oeaBr1xuICAgIHd4LmdldFNldHRpbmcoe1xuICAgICAgc3VjY2VzczogcmVzID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coOSlcbiAgICAgICAgaWYgKHJlcy5hdXRoU2V0dGluZ1snc2NvcGUudXNlckluZm8nXSkge1xuICAgICAgICAgIC8vIOW3sue7j+aOiOadg++8jOWPr+S7peebtOaOpeiwg+eUqCBnZXRVc2VySW5mbyDojrflj5blpLTlg4/mmLXnp7DvvIzkuI3kvJrlvLnmoYZcbiAgICAgICAgICB3eC5nZXRVc2VySW5mbyh7XG4gICAgICAgICAgICBzdWNjZXNzOiByZXMgPT4ge1xuICAgICAgICAgICAgICAvLyDlj6/ku6XlsIYgcmVzIOWPkemAgee7meWQjuWPsOino+eggeWHuiB1bmlvbklkXG4gICAgICAgICAgICAgIHRoaXMuZ2xvYmFsRGF0YS51c2VySW5mbyA9IHJlcy51c2VySW5mb1xuICAgICAgICAgICAgICB3eC5zZXRTdG9yYWdlU3luYygndXNlckluZm8nLCByZXMudXNlckluZm8pXG5cbiAgICAgICAgICAgICAgLy8g55Sx5LqOIGdldFVzZXJJbmZvIOaYr+e9kee7nOivt+axgu+8jOWPr+iDveS8muWcqCBQYWdlLm9uTG9hZCDkuYvlkI7miY3ov5Tlm55cbiAgICAgICAgICAgICAgLy8g5omA5Lul5q2k5aSE5Yqg5YWlIGNhbGxiYWNrIOS7pemYsuatoui/meenjeaDheWGtVxuICAgICAgICAgICAgICBpZiAodGhpcy51c2VySW5mb1JlYWR5Q2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVzZXJJbmZvUmVhZHlDYWxsYmFjayhyZXMpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgfSxcbiAgZ2xvYmFsRGF0YToge1xuICAgIHVzZXJJbmZvOiBudWxsXG4gIH1cbn0pIl19
