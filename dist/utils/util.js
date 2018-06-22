var regeneratorRuntime = require("../lib/runtime.js");'use strict';

var common = {
  // 提示工具
  TIP: {
    showErrMsg: function showErrMsg(pageObj, errmsg) {
      pageObj.setData({
        tips: {
          hiddenErrmsg: false,
          errmsg: errmsg
        }

      });
      //3秒后关闭
      setTimeout(this.returnCloseErrMsg(pageObj), 3000);
    },
    closeErrMsg: function closeErrMsg(pageObj) {
      pageObj.setData({
        tips: {
          hiddenErrmsg: true,
          errmsg: ''
        }
      });
    },
    returnCloseErrMsg: function returnCloseErrMsg(pageObj) {
      var self = this;
      return function () {
        self.closeErrMsg(pageObj);
      };
    }
  },
  // 验证手机号
  verifyMobile: function verifyMobile(pageObj) {
    if (pageObj.data.mobile == '') {
      this.TIP.showErrMsg(pageObj, '请填写手机号码');
      return false;
    }
    var re = /^1\d{10}/g;
    if (!re.test(pageObj.data.mobile)) {
      this.TIP.showErrMsg(pageObj, '手机号码格式不正确');
      return false;
    }
    return true;
  }
};
module.exports = common;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWxzL3V0aWwuanMiXSwibmFtZXMiOlsiY29tbW9uIiwiVElQIiwic2hvd0Vyck1zZyIsInBhZ2VPYmoiLCJlcnJtc2ciLCJzZXREYXRhIiwidGlwcyIsImhpZGRlbkVycm1zZyIsInNldFRpbWVvdXQiLCJyZXR1cm5DbG9zZUVyck1zZyIsImNsb3NlRXJyTXNnIiwic2VsZiIsInZlcmlmeU1vYmlsZSIsImRhdGEiLCJtb2JpbGUiLCJyZSIsInRlc3QiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQUlBLFNBQVM7QUFDWDtBQUNBQyxPQUFLO0FBQ0hDLGdCQUFZLG9CQUFVQyxPQUFWLEVBQW1CQyxNQUFuQixFQUEyQjtBQUNyQ0QsY0FBUUUsT0FBUixDQUFnQjtBQUNkQyxjQUFLO0FBQ0hDLHdCQUFjLEtBRFg7QUFFSEgsa0JBQVFBO0FBRkw7O0FBRFMsT0FBaEI7QUFPQTtBQUNBSSxpQkFBVyxLQUFLQyxpQkFBTCxDQUF1Qk4sT0FBdkIsQ0FBWCxFQUE0QyxJQUE1QztBQUNELEtBWEU7QUFZSE8saUJBQWEscUJBQVVQLE9BQVYsRUFBbUI7QUFDOUJBLGNBQVFFLE9BQVIsQ0FBZ0I7QUFDZEMsY0FBSztBQUNIQyx3QkFBYyxJQURYO0FBRUhILGtCQUFRO0FBRkw7QUFEUyxPQUFoQjtBQU1ELEtBbkJFO0FBb0JISyx1QkFBbUIsMkJBQVVOLE9BQVYsRUFBbUI7QUFDcEMsVUFBSVEsT0FBTyxJQUFYO0FBQ0EsYUFBTyxZQUFZO0FBQ2pCQSxhQUFLRCxXQUFMLENBQWlCUCxPQUFqQjtBQUNELE9BRkQ7QUFHRDtBQXpCRSxHQUZNO0FBNkJYO0FBQ0FTLGdCQUFjLHNCQUFVVCxPQUFWLEVBQW1CO0FBQy9CLFFBQUlBLFFBQVFVLElBQVIsQ0FBYUMsTUFBYixJQUF1QixFQUEzQixFQUErQjtBQUM3QixXQUFLYixHQUFMLENBQVNDLFVBQVQsQ0FBb0JDLE9BQXBCLEVBQTZCLFNBQTdCO0FBQ0EsYUFBTyxLQUFQO0FBQ0Q7QUFDRCxRQUFJWSxLQUFLLFdBQVQ7QUFDQSxRQUFJLENBQUNBLEdBQUdDLElBQUgsQ0FBUWIsUUFBUVUsSUFBUixDQUFhQyxNQUFyQixDQUFMLEVBQW1DO0FBQ2pDLFdBQUtiLEdBQUwsQ0FBU0MsVUFBVCxDQUFvQkMsT0FBcEIsRUFBNkIsV0FBN0I7QUFDQSxhQUFPLEtBQVA7QUFDRDtBQUNELFdBQU8sSUFBUDtBQUNEO0FBekNVLENBQWI7QUEyQ0FjLE9BQU9DLE9BQVAsR0FBaUJsQixNQUFqQiIsImZpbGUiOiJ1dGlscy91dGlsLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGNvbW1vbiA9IHtcbiAgLy8g5o+Q56S65bel5YW3XG4gIFRJUDoge1xuICAgIHNob3dFcnJNc2c6IGZ1bmN0aW9uIChwYWdlT2JqLCBlcnJtc2cpIHtcbiAgICAgIHBhZ2VPYmouc2V0RGF0YSh7XG4gICAgICAgIHRpcHM6e1xuICAgICAgICAgIGhpZGRlbkVycm1zZzogZmFsc2UsXG4gICAgICAgICAgZXJybXNnOiBlcnJtc2dcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgIH0pXG4gICAgICAvLzPnp5LlkI7lhbPpl61cbiAgICAgIHNldFRpbWVvdXQodGhpcy5yZXR1cm5DbG9zZUVyck1zZyhwYWdlT2JqKSwgMzAwMClcbiAgICB9LFxuICAgIGNsb3NlRXJyTXNnOiBmdW5jdGlvbiAocGFnZU9iaikge1xuICAgICAgcGFnZU9iai5zZXREYXRhKHtcbiAgICAgICAgdGlwczp7XG4gICAgICAgICAgaGlkZGVuRXJybXNnOiB0cnVlLFxuICAgICAgICAgIGVycm1zZzogJydcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9LFxuICAgIHJldHVybkNsb3NlRXJyTXNnOiBmdW5jdGlvbiAocGFnZU9iaikge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzXG4gICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICBzZWxmLmNsb3NlRXJyTXNnKHBhZ2VPYmopXG4gICAgICB9XG4gICAgfVxuICB9LFxuICAvLyDpqozor4HmiYvmnLrlj7dcbiAgdmVyaWZ5TW9iaWxlOiBmdW5jdGlvbiAocGFnZU9iaikge1xuICAgIGlmIChwYWdlT2JqLmRhdGEubW9iaWxlID09ICcnKSB7XG4gICAgICB0aGlzLlRJUC5zaG93RXJyTXNnKHBhZ2VPYmosICfor7floavlhpnmiYvmnLrlj7fnoIEnKVxuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICAgIHZhciByZSA9IC9eMVxcZHsxMH0vZ1xuICAgIGlmICghcmUudGVzdChwYWdlT2JqLmRhdGEubW9iaWxlKSkge1xuICAgICAgdGhpcy5USVAuc2hvd0Vyck1zZyhwYWdlT2JqLCAn5omL5py65Y+356CB5qC85byP5LiN5q2j56GuJylcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZVxuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IGNvbW1vbiJdfQ==
