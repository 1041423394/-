var regeneratorRuntime = require("../../lib/runtime.js");'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var projectService = require('../../service/projectRequest.js');
var app = getApp();

Page({
  data: {
    userInfo: {},
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  /**
   * 数据初始化
   */
  initQuery: function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var param, result;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              param = {
                answer_right_num: 3
              };
              _context.prev = 1;
              _context.next = 4;
              return projectService.answerRight({ params: param });

            case 4:
              result = _context.sent;

              console.log(result.data);
              _context.next = 11;
              break;

            case 8:
              _context.prev = 8;
              _context.t0 = _context['catch'](1);

              console.log(_context.t0);

            case 11:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this, [[1, 8]]);
    }));

    function initQuery() {
      return _ref.apply(this, arguments);
    }

    return initQuery;
  }(),

  onLoad: function onLoad() {
    var _this = this;

    this.initQuery();

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      });
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = function (res) {
        _this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        });
      };
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: function success(res) {
          app.globalData.userInfo = res.userInfo;
          _this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          });
        }
      });
    }
  },
  getUserInfo: function getUserInfo(e) {
    console.log(e);
    app.globalData.userInfo = e.detail.userInfo;
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    });
  }
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzL2luZGV4L2luZGV4LmpzIl0sIm5hbWVzIjpbInByb2plY3RTZXJ2aWNlIiwicmVxdWlyZSIsImFwcCIsImdldEFwcCIsIlBhZ2UiLCJkYXRhIiwidXNlckluZm8iLCJjYW5JVXNlIiwid3giLCJpbml0UXVlcnkiLCJwYXJhbSIsImFuc3dlcl9yaWdodF9udW0iLCJhbnN3ZXJSaWdodCIsInBhcmFtcyIsInJlc3VsdCIsImNvbnNvbGUiLCJsb2ciLCJvbkxvYWQiLCJnbG9iYWxEYXRhIiwic2V0RGF0YSIsImhhc1VzZXJJbmZvIiwidXNlckluZm9SZWFkeUNhbGxiYWNrIiwicmVzIiwiZ2V0VXNlckluZm8iLCJzdWNjZXNzIiwiZSIsImRldGFpbCJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLElBQUlBLGlCQUFlQyxRQUFRLGlDQUFSLENBQW5CO0FBQ0EsSUFBTUMsTUFBTUMsUUFBWjs7QUFFQUMsS0FBSztBQUNIQyxRQUFNO0FBQ0pDLGNBQVUsRUFETjtBQUVKQyxhQUFTQyxHQUFHRCxPQUFILENBQVcsOEJBQVg7QUFGTCxHQURIO0FBS0g7OztBQUdBRTtBQUFBLHVFQUFVO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNKQyxtQkFESSxHQUNFO0FBQ1JDLGtDQUFpQjtBQURULGVBREY7QUFBQTtBQUFBO0FBQUEscUJBS1dYLGVBQWVZLFdBQWYsQ0FBMkIsRUFBQ0MsUUFBT0gsS0FBUixFQUEzQixDQUxYOztBQUFBO0FBS0ZJLG9CQUxFOztBQU1OQyxzQkFBUUMsR0FBUixDQUFZRixPQUFPVCxJQUFuQjtBQU5NO0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQVFOVSxzQkFBUUMsR0FBUjs7QUFSTTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUFWOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBLEtBUkc7O0FBb0JIQyxVQUFRLGtCQUFZO0FBQUE7O0FBRW5CLFNBQUtSLFNBQUw7O0FBRUMsUUFBSVAsSUFBSWdCLFVBQUosQ0FBZVosUUFBbkIsRUFBNkI7QUFDM0IsV0FBS2EsT0FBTCxDQUFhO0FBQ1hiLGtCQUFVSixJQUFJZ0IsVUFBSixDQUFlWixRQURkO0FBRVhjLHFCQUFhO0FBRkYsT0FBYjtBQUlELEtBTEQsTUFLTyxJQUFJLEtBQUtmLElBQUwsQ0FBVUUsT0FBZCxFQUFzQjtBQUMzQjtBQUNBO0FBQ0FMLFVBQUltQixxQkFBSixHQUE0QixlQUFPO0FBQ2pDLGNBQUtGLE9BQUwsQ0FBYTtBQUNYYixvQkFBVWdCLElBQUloQixRQURIO0FBRVhjLHVCQUFhO0FBRkYsU0FBYjtBQUlELE9BTEQ7QUFNRCxLQVRNLE1BU0E7QUFDTDtBQUNBWixTQUFHZSxXQUFILENBQWU7QUFDYkMsaUJBQVMsc0JBQU87QUFDZHRCLGNBQUlnQixVQUFKLENBQWVaLFFBQWYsR0FBMEJnQixJQUFJaEIsUUFBOUI7QUFDQSxnQkFBS2EsT0FBTCxDQUFhO0FBQ1hiLHNCQUFVZ0IsSUFBSWhCLFFBREg7QUFFWGMseUJBQWE7QUFGRixXQUFiO0FBSUQ7QUFQWSxPQUFmO0FBU0Q7QUFDRixHQWxERTtBQW1ESEcsZUFBYSxxQkFBU0UsQ0FBVCxFQUFZO0FBQ3ZCVixZQUFRQyxHQUFSLENBQVlTLENBQVo7QUFDQXZCLFFBQUlnQixVQUFKLENBQWVaLFFBQWYsR0FBMEJtQixFQUFFQyxNQUFGLENBQVNwQixRQUFuQztBQUNBLFNBQUthLE9BQUwsQ0FBYTtBQUNYYixnQkFBVW1CLEVBQUVDLE1BQUYsQ0FBU3BCLFFBRFI7QUFFWGMsbUJBQWE7QUFGRixLQUFiO0FBSUQ7QUExREUsQ0FBTCIsImZpbGUiOiJwYWdlcy9pbmRleC9pbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImxldCBwcm9qZWN0U2VydmljZT1yZXF1aXJlKCcuLi8uLi9zZXJ2aWNlL3Byb2plY3RSZXF1ZXN0LmpzJylcbmNvbnN0IGFwcCA9IGdldEFwcCgpXG5cblBhZ2Uoe1xuICBkYXRhOiB7XG4gICAgdXNlckluZm86IHt9LFxuICAgIGNhbklVc2U6IHd4LmNhbklVc2UoJ2J1dHRvbi5vcGVuLXR5cGUuZ2V0VXNlckluZm8nKVxuICB9LFxuICAvKipcbiAgICog5pWw5o2u5Yid5aeL5YyWXG4gICAqL1xuICBpbml0UXVlcnk6YXN5bmMgZnVuY3Rpb24oKXtcbiAgICBsZXQgcGFyYW09e1xuICAgICAgYW5zd2VyX3JpZ2h0X251bTozXG4gICAgfVxuICAgIHRyeXtcbiAgICAgIGxldCByZXN1bHQ9YXdhaXQgcHJvamVjdFNlcnZpY2UuYW5zd2VyUmlnaHQoe3BhcmFtczpwYXJhbX0pXG4gICAgICBjb25zb2xlLmxvZyhyZXN1bHQuZGF0YSlcbiAgICB9Y2F0Y2goZXJyKXtcbiAgICAgIGNvbnNvbGUubG9nKGVycilcbiAgICB9XG4gIH0sXG4gIFxuICBvbkxvYWQ6IGZ1bmN0aW9uICgpIHtcblxuICAgdGhpcy5pbml0UXVlcnkoKVxuXG4gICAgaWYgKGFwcC5nbG9iYWxEYXRhLnVzZXJJbmZvKSB7XG4gICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICB1c2VySW5mbzogYXBwLmdsb2JhbERhdGEudXNlckluZm8sXG4gICAgICAgIGhhc1VzZXJJbmZvOiB0cnVlXG4gICAgICB9KVxuICAgIH0gZWxzZSBpZiAodGhpcy5kYXRhLmNhbklVc2Upe1xuICAgICAgLy8g55Sx5LqOIGdldFVzZXJJbmZvIOaYr+e9kee7nOivt+axgu+8jOWPr+iDveS8muWcqCBQYWdlLm9uTG9hZCDkuYvlkI7miY3ov5Tlm55cbiAgICAgIC8vIOaJgOS7peatpOWkhOWKoOWFpSBjYWxsYmFjayDku6XpmLLmraLov5nnp43mg4XlhrVcbiAgICAgIGFwcC51c2VySW5mb1JlYWR5Q2FsbGJhY2sgPSByZXMgPT4ge1xuICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgIHVzZXJJbmZvOiByZXMudXNlckluZm8sXG4gICAgICAgICAgaGFzVXNlckluZm86IHRydWVcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8g5Zyo5rKh5pyJIG9wZW4tdHlwZT1nZXRVc2VySW5mbyDniYjmnKznmoTlhbzlrrnlpITnkIZcbiAgICAgIHd4LmdldFVzZXJJbmZvKHtcbiAgICAgICAgc3VjY2VzczogcmVzID0+IHtcbiAgICAgICAgICBhcHAuZ2xvYmFsRGF0YS51c2VySW5mbyA9IHJlcy51c2VySW5mb1xuICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgICB1c2VySW5mbzogcmVzLnVzZXJJbmZvLFxuICAgICAgICAgICAgaGFzVXNlckluZm86IHRydWVcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfSxcbiAgZ2V0VXNlckluZm86IGZ1bmN0aW9uKGUpIHtcbiAgICBjb25zb2xlLmxvZyhlKVxuICAgIGFwcC5nbG9iYWxEYXRhLnVzZXJJbmZvID0gZS5kZXRhaWwudXNlckluZm9cbiAgICB0aGlzLnNldERhdGEoe1xuICAgICAgdXNlckluZm86IGUuZGV0YWlsLnVzZXJJbmZvLFxuICAgICAgaGFzVXNlckluZm86IHRydWVcbiAgICB9KVxuICB9XG59KVxuXG5cbiJdfQ==
