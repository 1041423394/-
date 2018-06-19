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
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: function success(res) {
              // 可以将 res 发送给后台解码出 unionId
              _this.globalData.userInfo = res.userInfo;

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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJBcHAiLCJvbkxhdW5jaCIsInd4IiwibG9naW4iLCJzdWNjZXNzIiwiZ2V0U2V0dGluZyIsInJlcyIsImF1dGhTZXR0aW5nIiwiZ2V0VXNlckluZm8iLCJnbG9iYWxEYXRhIiwidXNlckluZm8iLCJ1c2VySW5mb1JlYWR5Q2FsbGJhY2siXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQUEsSUFBSTtBQUNGQyxZQUFVLG9CQUFZO0FBQUE7O0FBQ3BCQyxPQUFHQyxLQUFILENBQVM7QUFDUEMsZUFBUyxzQkFBTztBQUNkO0FBQ0Q7QUFITSxLQUFUO0FBS0E7QUFDQUYsT0FBR0csVUFBSCxDQUFjO0FBQ1pELGVBQVMsc0JBQU87QUFDZCxZQUFJRSxJQUFJQyxXQUFKLENBQWdCLGdCQUFoQixDQUFKLEVBQXVDO0FBQ3JDO0FBQ0FMLGFBQUdNLFdBQUgsQ0FBZTtBQUNiSixxQkFBUyxzQkFBTztBQUNkO0FBQ0Esb0JBQUtLLFVBQUwsQ0FBZ0JDLFFBQWhCLEdBQTJCSixJQUFJSSxRQUEvQjs7QUFFQTtBQUNBO0FBQ0Esa0JBQUksTUFBS0MscUJBQVQsRUFBZ0M7QUFDOUIsc0JBQUtBLHFCQUFMLENBQTJCTCxHQUEzQjtBQUNEO0FBQ0Y7QUFWWSxXQUFmO0FBWUQ7QUFDRjtBQWpCVyxLQUFkO0FBbUJELEdBM0JDO0FBNEJGRyxjQUFZO0FBQ1ZDLGNBQVU7QUFEQTtBQTVCVixDQUFKIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vYXBwLmpzXG5BcHAoe1xuICBvbkxhdW5jaDogZnVuY3Rpb24gKCkge1xuICAgIHd4LmxvZ2luKHtcbiAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XG4gICAgICAgIC8vIOWPkemAgSByZXMuY29kZSDliLDlkI7lj7DmjaLlj5Ygb3BlbklkLCBzZXNzaW9uS2V5LCB1bmlvbklkXG4gICAgICB9XG4gICAgfSlcbiAgICAvLyDojrflj5bnlKjmiLfkv6Hmga9cbiAgICB3eC5nZXRTZXR0aW5nKHtcbiAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XG4gICAgICAgIGlmIChyZXMuYXV0aFNldHRpbmdbJ3Njb3BlLnVzZXJJbmZvJ10pIHtcbiAgICAgICAgICAvLyDlt7Lnu4/mjojmnYPvvIzlj6/ku6Xnm7TmjqXosIPnlKggZ2V0VXNlckluZm8g6I635Y+W5aS05YOP5pi156ew77yM5LiN5Lya5by55qGGXG4gICAgICAgICAgd3guZ2V0VXNlckluZm8oe1xuICAgICAgICAgICAgc3VjY2VzczogcmVzID0+IHtcbiAgICAgICAgICAgICAgLy8g5Y+v5Lul5bCGIHJlcyDlj5HpgIHnu5nlkI7lj7Dop6PnoIHlh7ogdW5pb25JZFxuICAgICAgICAgICAgICB0aGlzLmdsb2JhbERhdGEudXNlckluZm8gPSByZXMudXNlckluZm9cblxuICAgICAgICAgICAgICAvLyDnlLHkuo4gZ2V0VXNlckluZm8g5piv572R57uc6K+35rGC77yM5Y+v6IO95Lya5ZyoIFBhZ2Uub25Mb2FkIOS5i+WQjuaJjei/lOWbnlxuICAgICAgICAgICAgICAvLyDmiYDku6XmraTlpITliqDlhaUgY2FsbGJhY2sg5Lul6Ziy5q2i6L+Z56eN5oOF5Ya1XG4gICAgICAgICAgICAgIGlmICh0aGlzLnVzZXJJbmZvUmVhZHlDYWxsYmFjaykge1xuICAgICAgICAgICAgICAgIHRoaXMudXNlckluZm9SZWFkeUNhbGxiYWNrKHJlcylcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICB9LFxuICBnbG9iYWxEYXRhOiB7XG4gICAgdXNlckluZm86IG51bGxcbiAgfVxufSkiXX0=
