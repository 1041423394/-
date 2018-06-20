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
              _context.next = 3;
              return projectService.answerRight({ params: param });

            case 3:
              result = _context.sent;

              console.log(result.data);

            case 5:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function initQuery() {
      return _ref.apply(this, arguments);
    }

    return initQuery;
  }(),
  onLoad: function onLoad() {
    this.initQuery();
  }
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzL2luZGV4L2luZGV4LmpzIl0sIm5hbWVzIjpbInByb2plY3RTZXJ2aWNlIiwicmVxdWlyZSIsImFwcCIsImdldEFwcCIsIlBhZ2UiLCJkYXRhIiwidXNlckluZm8iLCJjYW5JVXNlIiwid3giLCJpbml0UXVlcnkiLCJwYXJhbSIsImFuc3dlcl9yaWdodF9udW0iLCJhbnN3ZXJSaWdodCIsInBhcmFtcyIsInJlc3VsdCIsImNvbnNvbGUiLCJsb2ciLCJvbkxvYWQiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxJQUFJQSxpQkFBZUMsUUFBUSxpQ0FBUixDQUFuQjtBQUNBLElBQU1DLE1BQU1DLFFBQVo7O0FBRUFDLEtBQUs7QUFDSEMsUUFBTTtBQUNKQyxjQUFVLEVBRE47QUFFSkMsYUFBU0MsR0FBR0QsT0FBSCxDQUFXLDhCQUFYO0FBRkwsR0FESDtBQUtIOzs7QUFHQUU7QUFBQSx1RUFBVTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDSkMsbUJBREksR0FDRTtBQUNSQyxrQ0FBaUI7QUFEVCxlQURGO0FBQUE7QUFBQSxxQkFJU1gsZUFBZVksV0FBZixDQUEyQixFQUFDQyxRQUFPSCxLQUFSLEVBQTNCLENBSlQ7O0FBQUE7QUFJSkksb0JBSkk7O0FBS05DLHNCQUFRQyxHQUFSLENBQVlGLE9BQU9ULElBQW5COztBQUxNO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQVY7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUEsS0FSRztBQWVIWSxVQUFRLGtCQUFZO0FBQ2xCLFNBQUtSLFNBQUw7QUFDRDtBQWpCRSxDQUFMIiwiZmlsZSI6InBhZ2VzL2luZGV4L2luZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsibGV0IHByb2plY3RTZXJ2aWNlPXJlcXVpcmUoJy4uLy4uL3NlcnZpY2UvcHJvamVjdFJlcXVlc3QuanMnKVxuY29uc3QgYXBwID0gZ2V0QXBwKClcblxuUGFnZSh7XG4gIGRhdGE6IHtcbiAgICB1c2VySW5mbzoge30sXG4gICAgY2FuSVVzZTogd3guY2FuSVVzZSgnYnV0dG9uLm9wZW4tdHlwZS5nZXRVc2VySW5mbycpXG4gIH0sXG4gIC8qKlxuICAgKiDmlbDmja7liJ3lp4vljJZcbiAgICovXG4gIGluaXRRdWVyeTphc3luYyBmdW5jdGlvbigpe1xuICAgIGxldCBwYXJhbT17XG4gICAgICBhbnN3ZXJfcmlnaHRfbnVtOjNcbiAgICB9XG4gICAgbGV0IHJlc3VsdD1hd2FpdCBwcm9qZWN0U2VydmljZS5hbnN3ZXJSaWdodCh7cGFyYW1zOnBhcmFtfSlcbiAgICAgIGNvbnNvbGUubG9nKHJlc3VsdC5kYXRhKVxuICB9LFxuICBvbkxvYWQ6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmluaXRRdWVyeSgpXG4gIH1cbn0pXG5cblxuIl19
