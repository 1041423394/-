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
 * @param {string} projectName 项目名称
 * @param {function} wxPromisify promise对象
 * @param {function} request wx.request进行封装
 */
var fml = {
    baseHost: 'https://world-cup.ishaohuo.cn/',
    projectName: 'wechat-frame',
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZpY2UvZm1sU2VydmljZS5qcyJdLCJuYW1lcyI6WyJSU0EiLCJyZXF1aXJlIiwicnNhRGF0YSIsIlJTQWRhdGEiLCJkYXRhIiwicmVzdWx0IiwiSlNPTiIsInN0cmluZ2lmeSIsInBhcmFtIiwiZW5jcnlwdF9yc2EiLCJlbmNyeXB0TG9uZyIsInB1YmxpY0tleSIsIlJTQUtleSIsIktFWVVUSUwiLCJnZXRLZXkiLCJmbWwiLCJiYXNlSG9zdCIsInByb2plY3ROYW1lIiwicmVxdWVzdCIsIm9iaiIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiaGVhZGVyIiwibWV0aG9kIiwiT2JqZWN0IiwiYXNzaWduIiwicGFyYW1zIiwid3giLCJ1cmwiLCJzdWNjZXNzIiwicmVzIiwic2hvd01vZGFsIiwidGl0bGUiLCJzaG93Q2FuY2VsIiwiY29udGVudCIsInN0YXR1c0NvZGUiLCJlcnJNc2ciLCJjb2RlIiwibXNnIiwiZmFpbCIsImNvbXBsZXRlIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJQSxNQUFNQyxRQUFRLHlCQUFSLENBQVY7QUFDQTs7Ozs7OztBQU9BLElBQUlDLFVBQVUsS0FBZDtBQUNBLElBQUlBLE9BQUosRUFBYTtBQUFBLFFBSUFDLFFBSkEsR0FJVCxTQUFTQSxRQUFULENBQWlCQyxJQUFqQixFQUF1QjtBQUNuQixZQUFJQyxTQUFTQyxLQUFLQyxTQUFMLENBQWVILElBQWYsQ0FBYjtBQUNBLFlBQUlJLFFBQVFDLFlBQVlDLFdBQVosQ0FBd0JMLE1BQXhCLENBQVo7QUFDQSxlQUFPRyxLQUFQO0FBQ0gsS0FSUTs7QUFDVCxRQUFJRyxZQUFZLEVBQWhCO0FBQ0EsUUFBSUYsY0FBYyxJQUFJVCxJQUFJWSxNQUFSLEVBQWxCO0FBQ0FILGtCQUFjVCxJQUFJYSxPQUFKLENBQVlDLE1BQVosQ0FBbUJILFNBQW5CLENBQWQ7QUFNSDtBQUNEOzs7Ozs7O0FBT0EsSUFBSUksTUFBTTtBQUNOQyxjQUFVLGdDQURKO0FBRU5DLGlCQUFhLGNBRlA7QUFHTkMsYUFBUyxpQkFBVUMsR0FBVixFQUFlO0FBQ3BCLGVBQU8sSUFBSUMsT0FBSixDQUFZLFVBQVNDLE9BQVQsRUFBaUJDLE1BQWpCLEVBQXdCO0FBQ3ZDLGdCQUFJQyxTQUFTSixJQUFJSyxNQUFKLEdBQWEsRUFBRSxnQkFBZ0IsbUNBQWxCLEVBQWIsR0FBdUUsRUFBcEY7QUFDQUQscUJBQVNKLElBQUlJLE1BQUosR0FBYUUsT0FBT0MsTUFBUCxDQUFjSCxNQUFkLEVBQXNCSixJQUFJSSxNQUExQixDQUFiLEdBQWlEQSxNQUExRCxDQUZ1QyxDQUUwQjtBQUNqRSxnQkFBSUksU0FBUyxFQUFiO0FBQ0EsZ0JBQUlSLElBQUlmLElBQVIsRUFBYztBQUNWdUIseUJBQVN6QixVQUFVQyxRQUFRZ0IsSUFBSWYsSUFBWixDQUFWLEdBQThCZSxJQUFJZixJQUEzQztBQUNIO0FBQ0R3QixlQUFHVixPQUFILENBQVc7QUFDUFcscUJBQUtkLElBQUlDLFFBQUosR0FBZUcsSUFBSVUsR0FEakI7QUFFUHpCLHNCQUFNdUIsTUFGQztBQUdQSCx3QkFBUUwsSUFBSUssTUFBSixJQUFjLEtBSGY7QUFJUEQsd0JBQVFBLE1BSkQ7QUFLUE8seUJBQVMsaUJBQVVDLEdBQVYsRUFBZTtBQUNwQix3QkFBSTNCLE9BQU8yQixJQUFJM0IsSUFBZjtBQUNBLHdCQUFJLENBQUNBLElBQUwsRUFBVztBQUNQd0IsMkJBQUdJLFNBQUgsQ0FBYTtBQUNUQyxtQ0FBTyxJQURFO0FBRVRDLHdDQUFZLEtBRkg7QUFHVEMscUNBQVNKLElBQUlLLFVBQUosR0FBaUIsR0FBakIsR0FBdUJMLElBQUlNO0FBSDNCLHlCQUFiO0FBS0E7QUFDSDtBQUNELHdCQUFJakMsS0FBS2tDLElBQUwsSUFBYSxPQUFqQixFQUEwQjtBQUN2QmpCLGdDQUFRVSxHQUFSO0FBQ0YscUJBRkQsTUFFTztBQUNISCwyQkFBR0ksU0FBSCxDQUFhO0FBQ1RDLG1DQUFPbEIsSUFBSUUsV0FBSixHQUFrQixLQURoQjtBQUVUaUIsd0NBQVksS0FGSDtBQUdUQyxxQ0FBUy9CLEtBQUttQyxHQUFMLEdBQVduQyxLQUFLbUMsR0FBaEIsR0FBc0IsU0FBU25DLEtBQUtrQztBQUhwQyx5QkFBYjtBQUtIO0FBQ0osaUJBeEJNO0FBeUJQRSxzQkFBTSxnQkFBWTtBQUNkWix1QkFBR0ksU0FBSCxDQUFhO0FBQ1RDLCtCQUFPbEIsSUFBSUUsV0FBSixHQUFrQixLQURoQjtBQUVUaUIsb0NBQVksS0FGSDtBQUdUQyxpQ0FBU0osSUFBSU07QUFISixxQkFBYjtBQUtILGlCQS9CTTtBQWdDUEksMEJBQVUsb0JBQVksQ0FFckI7QUFsQ00sYUFBWDtBQW9DSCxTQTNDTSxDQUFQO0FBNENIOztBQWhESyxDQUFWOztBQW9EQUMsT0FBT0MsT0FBUCxHQUFpQjVCLEdBQWpCIiwiZmlsZSI6InNlcnZpY2UvZm1sU2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImxldCBSU0EgPSByZXF1aXJlKCcuLi9saWIvd3hhcHBfcnNhLm1pbi5qcycpO1xuLyoqXG4gKiBSU0HliqDlr4ZcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gUlNBIOaYr+WQpumcgOimgeWvueS8oOmAkuWPguaVsOi/m+ihjOWKoOWvhlxuICogQHBhcmFtIHtmdW5jdGlvbn0gUlNBZGF0YSDlr7nmlbDmja7ov5vooYzliqDlr4bvvIzlpoLmnpzmlbDmja7otoXov4fkuIDlrprplb/luqbov5vooYzliIbmrrXliqDlr4ZcbiAqIEBwYXJhbSB7c3RyaW5nfSBwdWJsaWNLZXkg5Yqg5a+G5YWs6ZKl77yI6K6p5ZCO5Y+w5Lq65ZGY57uZ5LqI77yJXG4gKiBAcGFyYW0ge09iamVjdH0gZW5jcnlwdF9yc2Eg5Yqg5a+G5pa55rOVXG4gKi9cbmxldCByc2FEYXRhID0gZmFsc2U7XG5pZiAocnNhRGF0YSkge1xuICAgIGxldCBwdWJsaWNLZXkgPSAnJztcbiAgICBsZXQgZW5jcnlwdF9yc2EgPSBuZXcgUlNBLlJTQUtleSgpO1xuICAgIGVuY3J5cHRfcnNhID0gUlNBLktFWVVUSUwuZ2V0S2V5KHB1YmxpY0tleSlcbiAgICBmdW5jdGlvbiBSU0FkYXRhKGRhdGEpIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IEpTT04uc3RyaW5naWZ5KGRhdGEpXG4gICAgICAgIGxldCBwYXJhbSA9IGVuY3J5cHRfcnNhLmVuY3J5cHRMb25nKHJlc3VsdClcbiAgICAgICAgcmV0dXJuIHBhcmFtXG4gICAgfVxufVxuLyoqXG4gKiByZXF1ZXN06K+35rGCXG4gKiBAcGFyYW0ge3N0cmluZ30gYmFzZUhvc3Qg6aG555uu5Z+f5ZCNXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJvamVjdE5hbWUg6aG555uu5ZCN56ewXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSB3eFByb21pc2lmeSBwcm9taXNl5a+56LGhXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSByZXF1ZXN0IHd4LnJlcXVlc3Tov5vooYzlsIHoo4VcbiAqL1xudmFyIGZtbCA9IHtcbiAgICBiYXNlSG9zdDogJ2h0dHBzOi8vd29ybGQtY3VwLmlzaGFvaHVvLmNuLycsXG4gICAgcHJvamVjdE5hbWU6ICd3ZWNoYXQtZnJhbWUnLFxuICAgIHJlcXVlc3Q6IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUscmVqZWN0KXtcbiAgICAgICAgICAgIGxldCBoZWFkZXIgPSBvYmoubWV0aG9kID8geyAnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcgfSA6IHt9O1xuICAgICAgICAgICAgaGVhZGVyID0gb2JqLmhlYWRlciA/IE9iamVjdC5hc3NpZ24oaGVhZGVyLCBvYmouaGVhZGVyKSA6IGhlYWRlcjsvL+WvuWhlYWRlcui/m+ihjOaJqeWxle+8iOWPr+iDveWcqGhlYWRlcuS4remcgOimgeS8oOmAkuWPguaVsO+8iVxuICAgICAgICAgICAgbGV0IHBhcmFtcyA9IHt9O1xuICAgICAgICAgICAgaWYgKG9iai5kYXRhKSB7XG4gICAgICAgICAgICAgICAgcGFyYW1zID0gcnNhRGF0YSA/IFJTQWRhdGEob2JqLmRhdGEpIDogb2JqLmRhdGE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3eC5yZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICB1cmw6IGZtbC5iYXNlSG9zdCArIG9iai51cmwsXG4gICAgICAgICAgICAgICAgZGF0YTogcGFyYW1zLFxuICAgICAgICAgICAgICAgIG1ldGhvZDogb2JqLm1ldGhvZCB8fCAnR0VUJyxcbiAgICAgICAgICAgICAgICBoZWFkZXI6IGhlYWRlcixcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBkYXRhID0gcmVzLmRhdGE7XG4gICAgICAgICAgICAgICAgICAgIGlmICghZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvd0NhbmNlbDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogcmVzLnN0YXR1c0NvZGUgKyAnOicgKyByZXMuZXJyTXNnXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuY29kZSA9PSAnMDAwMDAnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzKVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogZm1sLnByb2plY3ROYW1lICsgJ+aPkOmGkuaCqCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvd0NhbmNlbDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogZGF0YS5tc2cgPyBkYXRhLm1zZyA6ICfplJnor6/noIHvvJonICsgZGF0YS5jb2RlLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZmFpbDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IGZtbC5wcm9qZWN0TmFtZSArICfmj5DphpLmgqgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2hvd0NhbmNlbDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiByZXMuZXJyTXNnXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBjb21wbGV0ZTogZnVuY3Rpb24gKCkge1xuICAgIFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgfVxuXG59XG5cbm1vZHVsZS5leHBvcnRzID0gZm1sIl19
