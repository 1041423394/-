var regeneratorRuntime = require("lib/runtime.js");'use strict';

//app.js
App({
  onLaunch: function onLaunch() {
    undefined.getUserInfo();
    if (!wx.getStorageSync('userInfo')) {
      var wxLogin = undefined.wxPromisify(wx.login);
      wxLogin().then(function (res) {
        undefined.globalData.code = res.code;
      });
    }
  },
  // 校验用户当前session_key是否有效
  checkSession: function checkSession() {},
  // 获取用户信息
  getUserInfo: function getUserInfo() {
    wx.getSetting({
      success: function success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: function success(res) {
              undefined.globalData.userInfo = res.userInfo;
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              if (undefined.userInfoReadyCallback) {
                undefined.userInfoReadyCallback(res);
              }
            }
          });
        }
      }
    });
  },
  // es6
  wxPromisify: function wxPromisify(fn) {
    return function () {
      var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return new Promise(function (resolve, reject) {
        obj.success = function (res) {
          resolve(res);
        };
        obj.fail = function (res) {
          reject(res);
        };
        fn(obj);
      });
    };
  },
  globalData: {
    userInfo: null
  }
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJBcHAiLCJvbkxhdW5jaCIsImdldFVzZXJJbmZvIiwid3giLCJnZXRTdG9yYWdlU3luYyIsInd4TG9naW4iLCJ3eFByb21pc2lmeSIsImxvZ2luIiwidGhlbiIsImdsb2JhbERhdGEiLCJjb2RlIiwicmVzIiwiY2hlY2tTZXNzaW9uIiwiZ2V0U2V0dGluZyIsInN1Y2Nlc3MiLCJhdXRoU2V0dGluZyIsInVzZXJJbmZvIiwidXNlckluZm9SZWFkeUNhbGxiYWNrIiwiZm4iLCJvYmoiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImZhaWwiXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQUEsSUFBSTtBQUNGQyxZQUFTLG9CQUFJO0FBQ1osY0FBS0MsV0FBTDtBQUNBLFFBQUcsQ0FBQ0MsR0FBR0MsY0FBSCxDQUFrQixVQUFsQixDQUFKLEVBQWtDO0FBQ2pDLFVBQUlDLFVBQVEsVUFBS0MsV0FBTCxDQUFpQkgsR0FBR0ksS0FBcEIsQ0FBWjtBQUNBRixnQkFBVUcsSUFBVixDQUFlLGVBQUs7QUFDbEIsa0JBQUtDLFVBQUwsQ0FBZ0JDLElBQWhCLEdBQXFCQyxJQUFJRCxJQUF6QjtBQUNELE9BRkQ7QUFHQTtBQUVELEdBVkM7QUFXRjtBQUNBRSxnQkFBYSx3QkFBSSxDQUdoQixDQWZDO0FBZ0JGO0FBQ0FWLGVBQVksdUJBQUk7QUFDZEMsT0FBR1UsVUFBSCxDQUFjO0FBQ1pDLGVBQVMsc0JBQU87QUFDZCxZQUFJSCxJQUFJSSxXQUFKLENBQWdCLGdCQUFoQixDQUFKLEVBQXVDO0FBQ3JDO0FBQ0FaLGFBQUdELFdBQUgsQ0FBZTtBQUNiWSxxQkFBUyxzQkFBTztBQUNkLHdCQUFLTCxVQUFMLENBQWdCTyxRQUFoQixHQUEyQkwsSUFBSUssUUFBL0I7QUFDQTtBQUNBLGtCQUFJLFVBQUtDLHFCQUFULEVBQWdDO0FBQzlCLDBCQUFLQSxxQkFBTCxDQUEyQk4sR0FBM0I7QUFDRDtBQUNGO0FBUFksV0FBZjtBQVNEO0FBQ0Y7QUFkVyxLQUFkO0FBZ0JELEdBbENDO0FBbUNGO0FBQ0FMLGVBQVkscUJBQUNZLEVBQUQsRUFBTTtBQUNoQixXQUFPLFlBQW9CO0FBQUEsVUFBVkMsR0FBVSx1RUFBSixFQUFJOztBQUN6QixhQUFPLElBQUlDLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDeENILFlBQUlMLE9BQUosR0FBYyxVQUFVSCxHQUFWLEVBQWU7QUFDekJVLGtCQUFRVixHQUFSO0FBQ0gsU0FGRDtBQUdBUSxZQUFJSSxJQUFKLEdBQVcsVUFBVVosR0FBVixFQUFlO0FBQ3RCVyxpQkFBT1gsR0FBUDtBQUNILFNBRkQ7QUFHQU8sV0FBR0MsR0FBSDtBQUNDLE9BUk0sQ0FBUDtBQVNELEtBVkQ7QUFXRCxHQWhEQztBQWlERlYsY0FBWTtBQUNWTyxjQUFVO0FBREE7QUFqRFYsQ0FBSiIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvL2FwcC5qc1xuQXBwKHtcbiAgb25MYXVuY2g6KCk9PntcbiAgIHRoaXMuZ2V0VXNlckluZm8oKVxuICAgaWYoIXd4LmdldFN0b3JhZ2VTeW5jKCd1c2VySW5mbycpKXtcbiAgICBsZXQgd3hMb2dpbj10aGlzLnd4UHJvbWlzaWZ5KHd4LmxvZ2luKVxuICAgIHd4TG9naW4oKS50aGVuKHJlcz0+e1xuICAgICAgdGhpcy5nbG9iYWxEYXRhLmNvZGU9cmVzLmNvZGVcbiAgICB9KVxuICAgfVxuICAgXG4gIH0sXG4gIC8vIOagoemqjOeUqOaIt+W9k+WJjXNlc3Npb25fa2V55piv5ZCm5pyJ5pWIXG4gIGNoZWNrU2Vzc2lvbjooKT0+e1xuICAgXG4gICBcbiAgfSxcbiAgLy8g6I635Y+W55So5oi35L+h5oGvXG4gIGdldFVzZXJJbmZvOigpPT57XG4gICAgd3guZ2V0U2V0dGluZyh7XG4gICAgICBzdWNjZXNzOiByZXMgPT4ge1xuICAgICAgICBpZiAocmVzLmF1dGhTZXR0aW5nWydzY29wZS51c2VySW5mbyddKSB7XG4gICAgICAgICAgLy8g5bey57uP5o6I5p2D77yM5Y+v5Lul55u05o6l6LCD55SoIGdldFVzZXJJbmZvIOiOt+WPluWktOWDj+aYteensO+8jOS4jeS8muW8ueahhlxuICAgICAgICAgIHd4LmdldFVzZXJJbmZvKHtcbiAgICAgICAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuZ2xvYmFsRGF0YS51c2VySW5mbyA9IHJlcy51c2VySW5mb1xuICAgICAgICAgICAgICAvLyDnlLHkuo4gZ2V0VXNlckluZm8g5piv572R57uc6K+35rGC77yM5Y+v6IO95Lya5ZyoIFBhZ2Uub25Mb2FkIOS5i+WQjuaJjei/lOWbnlxuICAgICAgICAgICAgICBpZiAodGhpcy51c2VySW5mb1JlYWR5Q2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVzZXJJbmZvUmVhZHlDYWxsYmFjayhyZXMpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgfSxcbiAgLy8gZXM2XG4gIHd4UHJvbWlzaWZ5Oihmbik9PntcbiAgICByZXR1cm4gZnVuY3Rpb24gKG9iaiA9IHt9KSB7XG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgb2JqLnN1Y2Nlc3MgPSBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgcmVzb2x2ZShyZXMpXG4gICAgICB9XG4gICAgICBvYmouZmFpbCA9IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICByZWplY3QocmVzKVxuICAgICAgfVxuICAgICAgZm4ob2JqKVxuICAgICAgfSlcbiAgICB9XG4gIH0sXG4gIGdsb2JhbERhdGE6IHtcbiAgICB1c2VySW5mbzogbnVsbFxuICB9XG59KSJdfQ==
