var regeneratorRuntime = require("lib/runtime.js");'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

//app.js
var projectService = require('./service/projectRequest.js');
App({
  onLaunch: function onLaunch() {
    var _this = this;

    //this.getUserInfo()
    if (!wx.getStorageSync('openId')) {
      var wxLogin = this.wxPromisify(wx.login);
      if (this.globalData.encryption || this.globalData.needUserInfo) {
        wxLogin().then(function (res) {
          _this.globalData.code = res.code;
        });
      } else {
        wxLogin().then(function () {
          var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(res) {
            var param, result;
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _this.globalData.code = res.code;
                    param = {
                      code: res.code
                    };
                    _context.next = 4;
                    return projectService.getOpenId({ params: param });

                  case 4:
                    result = _context.sent;

                    _this.globalData.openId = result.data.openid;
                    wx.setStorageSync('openId', result.data.openid);

                  case 7:
                  case 'end':
                    return _context.stop();
                }
              }
            }, _callee, _this);
          }));

          return function (_x) {
            return _ref.apply(this, arguments);
          };
        }());
      }
    }
  },
  // 获取用户信息
  getUserInfo: function getUserInfo() {
    var that = this;
    wx.getSetting({
      success: function success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: function success(res) {
              that.globalData.userInfo = res.userInfo;
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              if (that.userInfoReadyCallback) {
                that.userInfoReadyCallback(res);
              }
            }
          });
        }
      }
    });
  },
  // session校验，登录授权
  checkSession: function checkSession(param, userInfo) {
    var that = this;
    wx.checkSession({
      success: function success() {
        that.setUserInfo(param, userInfo);
      },
      fail: function fail() {
        var wxLogin = app.wxPromisify(wx.login);
        wxLogin().then(function (res) {
          wx.getUserInfo({
            success: function success(res) {
              that.setUserInfo(param, res.userInfo);
            }
          });
        });
      }
    });
  },
  setUserInfo: function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(param, userInfo) {
      var result;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return projectService.getOpenId({ params: param });

            case 2:
              result = _context2.sent;

              app.globalData.openId = result.data.openid;
              app.globalData.userInfo = userInfo;
              wx.setStorageSync('userInfo', userInfo);
              wx.setStorageSync('openId', result.data.openid);
              wx.navigateBack();

            case 8:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function setUserInfo(_x2, _x3) {
      return _ref2.apply(this, arguments);
    }

    return setUserInfo;
  }(),
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
  /**
   * 全局变量
   * @param {boolean} encryption 是否需要多端判定为同一用户
   * @param {boolean} needUserInfo是否需要用户头像，名称
   */
  globalData: {
    needUserInfo: true,
    encryption: true,
    openId: null,
    userInfo: null,
    code: ''
  }
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJwcm9qZWN0U2VydmljZSIsInJlcXVpcmUiLCJBcHAiLCJvbkxhdW5jaCIsInd4IiwiZ2V0U3RvcmFnZVN5bmMiLCJ3eExvZ2luIiwid3hQcm9taXNpZnkiLCJsb2dpbiIsImdsb2JhbERhdGEiLCJlbmNyeXB0aW9uIiwibmVlZFVzZXJJbmZvIiwidGhlbiIsImNvZGUiLCJyZXMiLCJwYXJhbSIsImdldE9wZW5JZCIsInBhcmFtcyIsInJlc3VsdCIsIm9wZW5JZCIsImRhdGEiLCJvcGVuaWQiLCJzZXRTdG9yYWdlU3luYyIsImdldFVzZXJJbmZvIiwidGhhdCIsImdldFNldHRpbmciLCJzdWNjZXNzIiwiYXV0aFNldHRpbmciLCJ1c2VySW5mbyIsInVzZXJJbmZvUmVhZHlDYWxsYmFjayIsImNoZWNrU2Vzc2lvbiIsInNldFVzZXJJbmZvIiwiZmFpbCIsImFwcCIsIm5hdmlnYXRlQmFjayIsImZuIiwib2JqIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTtBQUNBLElBQUlBLGlCQUFlQyxRQUFRLDZCQUFSLENBQW5CO0FBQ0FDLElBQUk7QUFDRkMsWUFBUyxvQkFBVTtBQUFBOztBQUNsQjtBQUNBLFFBQUcsQ0FBQ0MsR0FBR0MsY0FBSCxDQUFrQixRQUFsQixDQUFKLEVBQWdDO0FBQy9CLFVBQUlDLFVBQVEsS0FBS0MsV0FBTCxDQUFpQkgsR0FBR0ksS0FBcEIsQ0FBWjtBQUNDLFVBQUcsS0FBS0MsVUFBTCxDQUFnQkMsVUFBaEIsSUFBOEIsS0FBS0QsVUFBTCxDQUFnQkUsWUFBakQsRUFBOEQ7QUFDN0RMLGtCQUFVTSxJQUFWLENBQWUsZUFBSztBQUNsQixnQkFBS0gsVUFBTCxDQUFnQkksSUFBaEIsR0FBcUJDLElBQUlELElBQXpCO0FBQ0QsU0FGRDtBQUdBLE9BSkQsTUFJSztBQUNKUCxrQkFBVU0sSUFBVjtBQUFBLDZFQUFlLGlCQUFPRSxHQUFQO0FBQUE7QUFBQTtBQUFB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Q0gsWUFBSVYsT0FBSixHQUFjLFVBQVVaLEdBQVYsRUFBZTtBQUMzQndCLGtCQUFReEIsR0FBUjtBQUNELFNBRkQ7QUFHQXNCLFlBQUlKLElBQUosR0FBVyxVQUFVbEIsR0FBVixFQUFlO0FBQ3hCeUIsaUJBQU96QixHQUFQO0FBQ0QsU0FGRDtBQUdBcUIsV0FBR0MsR0FBSDtBQUNELE9BUk0sQ0FBUDtBQVNELEtBVkQ7QUFXRCxHQXBGQztBQXFGRjs7Ozs7QUFLQTNCLGNBQVk7QUFDVkUsa0JBQWEsSUFESDtBQUVWRCxnQkFBVyxJQUZEO0FBR1ZTLFlBQU8sSUFIRztBQUlWUyxjQUFVLElBSkE7QUFLVmYsVUFBSztBQUxLO0FBMUZWLENBQUoiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy9hcHAuanNcbmxldCBwcm9qZWN0U2VydmljZT1yZXF1aXJlKCcuL3NlcnZpY2UvcHJvamVjdFJlcXVlc3QuanMnKVxuQXBwKHtcbiAgb25MYXVuY2g6ZnVuY3Rpb24oKXtcbiAgIC8vdGhpcy5nZXRVc2VySW5mbygpXG4gICBpZighd3guZ2V0U3RvcmFnZVN5bmMoJ29wZW5JZCcpKXtcbiAgICBsZXQgd3hMb2dpbj10aGlzLnd4UHJvbWlzaWZ5KHd4LmxvZ2luKVxuICAgICBpZih0aGlzLmdsb2JhbERhdGEuZW5jcnlwdGlvbiB8fCB0aGlzLmdsb2JhbERhdGEubmVlZFVzZXJJbmZvKXtcbiAgICAgIHd4TG9naW4oKS50aGVuKHJlcz0+e1xuICAgICAgICB0aGlzLmdsb2JhbERhdGEuY29kZT1yZXMuY29kZVxuICAgICAgfSlcbiAgICAgfWVsc2V7XG4gICAgICB3eExvZ2luKCkudGhlbihhc3luYyAocmVzKT0+e1xuICAgICAgICB0aGlzLmdsb2JhbERhdGEuY29kZT1yZXMuY29kZVxuICAgICAgICBsZXQgcGFyYW09e1xuICAgICAgICAgIGNvZGU6cmVzLmNvZGVcbiAgICAgICAgfVxuICAgICAgICBsZXQgcmVzdWx0PWF3YWl0IHByb2plY3RTZXJ2aWNlLmdldE9wZW5JZCh7cGFyYW1zOnBhcmFtfSlcbiAgICAgICAgdGhpcy5nbG9iYWxEYXRhLm9wZW5JZD1yZXN1bHQuZGF0YS5vcGVuaWRcbiAgICAgICAgd3guc2V0U3RvcmFnZVN5bmMoJ29wZW5JZCcsIHJlc3VsdC5kYXRhLm9wZW5pZClcblxuICAgICAgfSlcbiAgICAgfVxuICAgfVxuICAgXG4gIH0sXG4gIC8vIOiOt+WPlueUqOaIt+S/oeaBr1xuICBnZXRVc2VySW5mbzpmdW5jdGlvbigpe1xuICAgIGxldCB0aGF0PXRoaXNcbiAgICB3eC5nZXRTZXR0aW5nKHtcbiAgICAgIHN1Y2Nlc3M6ZnVuY3Rpb24ocmVzKXtcbiAgICAgICAgaWYgKHJlcy5hdXRoU2V0dGluZ1snc2NvcGUudXNlckluZm8nXSkge1xuICAgICAgICAgIC8vIOW3sue7j+aOiOadg++8jOWPr+S7peebtOaOpeiwg+eUqCBnZXRVc2VySW5mbyDojrflj5blpLTlg4/mmLXnp7DvvIzkuI3kvJrlvLnmoYZcbiAgICAgICAgICB3eC5nZXRVc2VySW5mbyh7XG4gICAgICAgICAgICBzdWNjZXNzOihyZXMpID0+IHtcbiAgICAgICAgICAgICAgdGhhdC5nbG9iYWxEYXRhLnVzZXJJbmZvID0gcmVzLnVzZXJJbmZvXG4gICAgICAgICAgICAgIC8vIOeUseS6jiBnZXRVc2VySW5mbyDmmK/nvZHnu5zor7fmsYLvvIzlj6/og73kvJrlnKggUGFnZS5vbkxvYWQg5LmL5ZCO5omN6L+U5ZueXG4gICAgICAgICAgICAgIGlmICh0aGF0LnVzZXJJbmZvUmVhZHlDYWxsYmFjaykge1xuICAgICAgICAgICAgICAgIHRoYXQudXNlckluZm9SZWFkeUNhbGxiYWNrKHJlcylcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICB9LFxuICAvLyBzZXNzaW9u5qCh6aqM77yM55m75b2V5o6I5p2DXG4gIGNoZWNrU2Vzc2lvbjpmdW5jdGlvbihwYXJhbSx1c2VySW5mbyl7XG4gICAgbGV0IHRoYXQ9dGhpc1xuICAgIHd4LmNoZWNrU2Vzc2lvbih7XG4gICAgICBzdWNjZXNzOmZ1bmN0aW9uKCl7XG4gICAgICAgIHRoYXQuc2V0VXNlckluZm8ocGFyYW0sdXNlckluZm8pXG4gICAgICB9LFxuICAgICAgZmFpbDooKT0+e1xuICAgICAgICBsZXQgd3hMb2dpbj1hcHAud3hQcm9taXNpZnkod3gubG9naW4pXG4gICAgICAgIHd4TG9naW4oKS50aGVuKChyZXMpPT57XG4gICAgICAgICAgd3guZ2V0VXNlckluZm8oe1xuICAgICAgICAgICAgc3VjY2VzczpmdW5jdGlvbihyZXMpe1xuICAgICAgICAgICAgICB0aGF0LnNldFVzZXJJbmZvKHBhcmFtLHJlcy51c2VySW5mbylcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0pXG4gIH0sXG4gIHNldFVzZXJJbmZvOmFzeW5jIGZ1bmN0aW9uKHBhcmFtLHVzZXJJbmZvKXtcbiAgICBsZXQgcmVzdWx0PWF3YWl0IHByb2plY3RTZXJ2aWNlLmdldE9wZW5JZCh7cGFyYW1zOnBhcmFtfSlcbiAgICBhcHAuZ2xvYmFsRGF0YS5vcGVuSWQ9cmVzdWx0LmRhdGEub3BlbmlkXG4gICAgYXBwLmdsb2JhbERhdGEudXNlckluZm8gPXVzZXJJbmZvXG4gICAgd3guc2V0U3RvcmFnZVN5bmMoJ3VzZXJJbmZvJywgdXNlckluZm8pXG4gICAgd3guc2V0U3RvcmFnZVN5bmMoJ29wZW5JZCcsIHJlc3VsdC5kYXRhLm9wZW5pZClcbiAgICB3eC5uYXZpZ2F0ZUJhY2soKVxuICB9LFxuICAvLyBlczZcbiAgd3hQcm9taXNpZnk6IGZ1bmN0aW9uIChmbikge1xuICAgIHJldHVybiBmdW5jdGlvbiAob2JqID0ge30pIHtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIG9iai5zdWNjZXNzID0gZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgIHJlc29sdmUocmVzKVxuICAgICAgICB9XG4gICAgICAgIG9iai5mYWlsID0gZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgIHJlamVjdChyZXMpXG4gICAgICAgIH1cbiAgICAgICAgZm4ob2JqKVxuICAgICAgfSlcbiAgICB9XG4gIH0sXG4gIC8qKlxuICAgKiDlhajlsYDlj5jph49cbiAgICogQHBhcmFtIHtib29sZWFufSBlbmNyeXB0aW9uIOaYr+WQpumcgOimgeWkmuerr+WIpOWumuS4uuWQjOS4gOeUqOaIt1xuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG5lZWRVc2VySW5mb+aYr+WQpumcgOimgeeUqOaIt+WktOWDj++8jOWQjeensFxuICAgKi9cbiAgZ2xvYmFsRGF0YToge1xuICAgIG5lZWRVc2VySW5mbzp0cnVlLFxuICAgIGVuY3J5cHRpb246dHJ1ZSxcbiAgICBvcGVuSWQ6bnVsbCxcbiAgICB1c2VySW5mbzogbnVsbCxcbiAgICBjb2RlOicnXG4gIH1cbn0pIl19
