var regeneratorRuntime = require("../lib/runtime.js");'use strict';

var RSA = require('../lib/wxapp_rsa.min.js');

/**
 * RSA加密
 * @param {boolean} RSA 是否需要对传递参数进行加密
 * @param {function} RSAdata 对数据进行加密，如果数据超过一定长度进行分段加密
 * @param {string} publicKey 加密公钥（让后台人员给予）
 * @param {Object} encrypt_rsa 加密方法
 */
var rsaData = false;
if (rsaData) {
    var _RSAdata = function _RSAdata(data) {
        var result = JSON.stringify(data);
        var param = encrypt_rsa.encryptLong(result);
        return param;
    };

    var publicKey = '';
    var encrypt_rsa = new RSA.RSAKey();
    encrypt_rsa = RSA.KEYUTIL.getKey(publicKey);
}
/**
 * request请求
 * @param {string} baseHost 项目域名
 * @param {function} request wx.request进行封装
 */
var fml = {
    baseHost: 'https://world-cup.ishaohuo.cn/',
    encryption: false,
    request: function request(obj) {
        return new Promise(function (resolve, reject) {
            var header = obj.method ? { 'content-type': 'application/x-www-form-urlencoded' } : {};
            header = obj.header ? Object.assign(header, obj.header) : header; //对header进行扩展（可能在header中需要传递参数）
            var params = {};
            if (obj.data) {
                params = rsaData ? RSAdata(obj.data) : obj.data;
            }
            wx.request({
                url: fml.baseHost + obj.url,
                data: params,
                method: obj.method || 'GET',
                header: header,
                success: function success(res) {
                    var data = res.data;
                    if (!data) {
                        wx.showModal({
                            title: '提示',
                            showCancel: false,
                            content: res.statusCode + ':' + res.errMsg
                        });
                        return;
                    }
                    if (data.code == '00000') {
                        resolve(res);
                    } else {
                        wx.showModal({
                            title: fml.projectName + '提醒您',
                            showCancel: false,
                            content: data.msg ? data.msg : '错误码：' + data.code
                        });
                    }
                },
                fail: function fail() {
                    wx.showModal({
                        title: fml.projectName + '提醒您',
                        showCancel: false,
                        content: res.errMsg
                    });
                },
                complete: function complete() {}
            });
        });
    }

};

module.exports = fml;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZpY2UvZm1sU2VydmljZS5qcyJdLCJuYW1lcyI6WyJSU0EiLCJyZXF1aXJlIiwicnNhRGF0YSIsIlJTQWRhdGEiLCJkYXRhIiwicmVzdWx0IiwiSlNPTiIsInN0cmluZ2lmeSIsInBhcmFtIiwiZW5jcnlwdF9yc2EiLCJlbmNyeXB0TG9uZyIsInB1YmxpY0tleSIsIlJTQUtleSIsIktFWVVUSUwiLCJnZXRLZXkiLCJmbWwiLCJiYXNlSG9zdCIsImVuY3J5cHRpb24iLCJyZXF1ZXN0Iiwib2JqIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJoZWFkZXIiLCJtZXRob2QiLCJPYmplY3QiLCJhc3NpZ24iLCJwYXJhbXMiLCJ3eCIsInVybCIsInN1Y2Nlc3MiLCJyZXMiLCJzaG93TW9kYWwiLCJ0aXRsZSIsInNob3dDYW5jZWwiLCJjb250ZW50Iiwic3RhdHVzQ29kZSIsImVyck1zZyIsImNvZGUiLCJwcm9qZWN0TmFtZSIsIm1zZyIsImZhaWwiLCJjb21wbGV0ZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSUEsTUFBTUMsUUFBUSx5QkFBUixDQUFWOztBQUVBOzs7Ozs7O0FBT0EsSUFBSUMsVUFBVSxLQUFkO0FBQ0EsSUFBSUEsT0FBSixFQUFhO0FBQUEsUUFLQUMsUUFMQSxHQUtULFNBQVNBLFFBQVQsQ0FBaUJDLElBQWpCLEVBQXVCO0FBQ25CLFlBQUlDLFNBQVNDLEtBQUtDLFNBQUwsQ0FBZUgsSUFBZixDQUFiO0FBQ0EsWUFBSUksUUFBUUMsWUFBWUMsV0FBWixDQUF3QkwsTUFBeEIsQ0FBWjtBQUNBLGVBQU9HLEtBQVA7QUFDSCxLQVRROztBQUNULFFBQUlHLFlBQVksRUFBaEI7QUFDQSxRQUFJRixjQUFjLElBQUlULElBQUlZLE1BQVIsRUFBbEI7QUFDQUgsa0JBQWNULElBQUlhLE9BQUosQ0FBWUMsTUFBWixDQUFtQkgsU0FBbkIsQ0FBZDtBQU9IO0FBQ0Q7Ozs7O0FBS0EsSUFBSUksTUFBTTtBQUNOQyxjQUFVLGdDQURKO0FBRU5DLGdCQUFZLEtBRk47QUFHTkMsYUFBUyxpQkFBU0MsR0FBVCxFQUFjO0FBQ25CLGVBQU8sSUFBSUMsT0FBSixDQUFZLFVBQVNDLE9BQVQsRUFBa0JDLE1BQWxCLEVBQTBCO0FBQ3pDLGdCQUFJQyxTQUFTSixJQUFJSyxNQUFKLEdBQWEsRUFBRSxnQkFBZ0IsbUNBQWxCLEVBQWIsR0FBdUUsRUFBcEY7QUFDQUQscUJBQVNKLElBQUlJLE1BQUosR0FBYUUsT0FBT0MsTUFBUCxDQUFjSCxNQUFkLEVBQXNCSixJQUFJSSxNQUExQixDQUFiLEdBQWlEQSxNQUExRCxDQUZ5QyxDQUV5QjtBQUNsRSxnQkFBSUksU0FBUyxFQUFiO0FBQ0EsZ0JBQUlSLElBQUlmLElBQVIsRUFBYztBQUNWdUIseUJBQVN6QixVQUFVQyxRQUFRZ0IsSUFBSWYsSUFBWixDQUFWLEdBQThCZSxJQUFJZixJQUEzQztBQUNIO0FBQ0R3QixlQUFHVixPQUFILENBQVc7QUFDUFcscUJBQUtkLElBQUlDLFFBQUosR0FBZUcsSUFBSVUsR0FEakI7QUFFUHpCLHNCQUFNdUIsTUFGQztBQUdQSCx3QkFBUUwsSUFBSUssTUFBSixJQUFjLEtBSGY7QUFJUEQsd0JBQVFBLE1BSkQ7QUFLUE8seUJBQVMsaUJBQVNDLEdBQVQsRUFBYztBQUNuQix3QkFBSTNCLE9BQU8yQixJQUFJM0IsSUFBZjtBQUNBLHdCQUFJLENBQUNBLElBQUwsRUFBVztBQUNQd0IsMkJBQUdJLFNBQUgsQ0FBYTtBQUNUQyxtQ0FBTyxJQURFO0FBRVRDLHdDQUFZLEtBRkg7QUFHVEMscUNBQVNKLElBQUlLLFVBQUosR0FBaUIsR0FBakIsR0FBdUJMLElBQUlNO0FBSDNCLHlCQUFiO0FBS0E7QUFDSDtBQUNELHdCQUFJakMsS0FBS2tDLElBQUwsSUFBYSxPQUFqQixFQUEwQjtBQUN0QmpCLGdDQUFRVSxHQUFSO0FBQ0gscUJBRkQsTUFFTztBQUNISCwyQkFBR0ksU0FBSCxDQUFhO0FBQ1RDLG1DQUFPbEIsSUFBSXdCLFdBQUosR0FBa0IsS0FEaEI7QUFFVEwsd0NBQVksS0FGSDtBQUdUQyxxQ0FBUy9CLEtBQUtvQyxHQUFMLEdBQVdwQyxLQUFLb0MsR0FBaEIsR0FBc0IsU0FBU3BDLEtBQUtrQztBQUhwQyx5QkFBYjtBQUtIO0FBQ0osaUJBeEJNO0FBeUJQRyxzQkFBTSxnQkFBVztBQUNiYix1QkFBR0ksU0FBSCxDQUFhO0FBQ1RDLCtCQUFPbEIsSUFBSXdCLFdBQUosR0FBa0IsS0FEaEI7QUFFVEwsb0NBQVksS0FGSDtBQUdUQyxpQ0FBU0osSUFBSU07QUFISixxQkFBYjtBQUtILGlCQS9CTTtBQWdDUEssMEJBQVUsb0JBQVcsQ0FFcEI7QUFsQ00sYUFBWDtBQW9DSCxTQTNDTSxDQUFQO0FBNENIOztBQWhESyxDQUFWOztBQW9EQUMsT0FBT0MsT0FBUCxHQUFpQjdCLEdBQWpCIiwiZmlsZSI6InNlcnZpY2UvZm1sU2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImxldCBSU0EgPSByZXF1aXJlKCcuLi9saWIvd3hhcHBfcnNhLm1pbi5qcycpO1xuXG4vKipcbiAqIFJTQeWKoOWvhlxuICogQHBhcmFtIHtib29sZWFufSBSU0Eg5piv5ZCm6ZyA6KaB5a+55Lyg6YCS5Y+C5pWw6L+b6KGM5Yqg5a+GXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBSU0FkYXRhIOWvueaVsOaNrui/m+ihjOWKoOWvhu+8jOWmguaenOaVsOaNrui2hei/h+S4gOWumumVv+W6pui/m+ihjOWIhuauteWKoOWvhlxuICogQHBhcmFtIHtzdHJpbmd9IHB1YmxpY0tleSDliqDlr4blhazpkqXvvIjorqnlkI7lj7DkurrlkZjnu5nkuojvvIlcbiAqIEBwYXJhbSB7T2JqZWN0fSBlbmNyeXB0X3JzYSDliqDlr4bmlrnms5VcbiAqL1xubGV0IHJzYURhdGEgPSBmYWxzZTtcbmlmIChyc2FEYXRhKSB7XG4gICAgbGV0IHB1YmxpY0tleSA9ICcnO1xuICAgIGxldCBlbmNyeXB0X3JzYSA9IG5ldyBSU0EuUlNBS2V5KCk7XG4gICAgZW5jcnlwdF9yc2EgPSBSU0EuS0VZVVRJTC5nZXRLZXkocHVibGljS2V5KVxuXG4gICAgZnVuY3Rpb24gUlNBZGF0YShkYXRhKSB7XG4gICAgICAgIGxldCByZXN1bHQgPSBKU09OLnN0cmluZ2lmeShkYXRhKVxuICAgICAgICBsZXQgcGFyYW0gPSBlbmNyeXB0X3JzYS5lbmNyeXB0TG9uZyhyZXN1bHQpXG4gICAgICAgIHJldHVybiBwYXJhbVxuICAgIH1cbn1cbi8qKlxuICogcmVxdWVzdOivt+axglxuICogQHBhcmFtIHtzdHJpbmd9IGJhc2VIb3N0IOmhueebruWfn+WQjVxuICogQHBhcmFtIHtmdW5jdGlvbn0gcmVxdWVzdCB3eC5yZXF1ZXN06L+b6KGM5bCB6KOFXG4gKi9cbnZhciBmbWwgPSB7XG4gICAgYmFzZUhvc3Q6ICdodHRwczovL3dvcmxkLWN1cC5pc2hhb2h1by5jbi8nLFxuICAgIGVuY3J5cHRpb246IGZhbHNlLFxuICAgIHJlcXVlc3Q6IGZ1bmN0aW9uKG9iaikge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICBsZXQgaGVhZGVyID0gb2JqLm1ldGhvZCA/IHsgJ2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnIH0gOiB7fTtcbiAgICAgICAgICAgIGhlYWRlciA9IG9iai5oZWFkZXIgPyBPYmplY3QuYXNzaWduKGhlYWRlciwgb2JqLmhlYWRlcikgOiBoZWFkZXI7IC8v5a+5aGVhZGVy6L+b6KGM5omp5bGV77yI5Y+v6IO95ZyoaGVhZGVy5Lit6ZyA6KaB5Lyg6YCS5Y+C5pWw77yJXG4gICAgICAgICAgICBsZXQgcGFyYW1zID0ge307XG4gICAgICAgICAgICBpZiAob2JqLmRhdGEpIHtcbiAgICAgICAgICAgICAgICBwYXJhbXMgPSByc2FEYXRhID8gUlNBZGF0YShvYmouZGF0YSkgOiBvYmouZGF0YTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHd4LnJlcXVlc3Qoe1xuICAgICAgICAgICAgICAgIHVybDogZm1sLmJhc2VIb3N0ICsgb2JqLnVybCxcbiAgICAgICAgICAgICAgICBkYXRhOiBwYXJhbXMsXG4gICAgICAgICAgICAgICAgbWV0aG9kOiBvYmoubWV0aG9kIHx8ICdHRVQnLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogaGVhZGVyLFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZGF0YSA9IHJlcy5kYXRhO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICfmj5DnpLonLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3dDYW5jZWw6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IHJlcy5zdGF0dXNDb2RlICsgJzonICsgcmVzLmVyck1zZ1xuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmNvZGUgPT0gJzAwMDAwJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXMpXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBmbWwucHJvamVjdE5hbWUgKyAn5o+Q6YaS5oKoJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93Q2FuY2VsOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBkYXRhLm1zZyA/IGRhdGEubXNnIDogJ+mUmeivr+egge+8micgKyBkYXRhLmNvZGUsXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBmYWlsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBmbWwucHJvamVjdE5hbWUgKyAn5o+Q6YaS5oKoJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNob3dDYW5jZWw6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogcmVzLmVyck1zZ1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgY29tcGxldGU6IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICB9XG5cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmbWwiXX0=
