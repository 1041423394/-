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
 * @param {function} request wx.request进行封装
 */
var fml = {
    baseHost: 'https://world-cup.ishaohuo.cn/',
    projectName: 'wechat-frame',
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZpY2UvZm1sU2VydmljZS5qcyJdLCJuYW1lcyI6WyJSU0EiLCJyZXF1aXJlIiwicnNhRGF0YSIsIlJTQWRhdGEiLCJkYXRhIiwicmVzdWx0IiwiSlNPTiIsInN0cmluZ2lmeSIsInBhcmFtIiwiZW5jcnlwdF9yc2EiLCJlbmNyeXB0TG9uZyIsInB1YmxpY0tleSIsIlJTQUtleSIsIktFWVVUSUwiLCJnZXRLZXkiLCJmbWwiLCJiYXNlSG9zdCIsInByb2plY3ROYW1lIiwiZW5jcnlwdGlvbiIsInJlcXVlc3QiLCJvYmoiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImhlYWRlciIsIm1ldGhvZCIsIk9iamVjdCIsImFzc2lnbiIsInBhcmFtcyIsInd4IiwidXJsIiwic3VjY2VzcyIsInJlcyIsInNob3dNb2RhbCIsInRpdGxlIiwic2hvd0NhbmNlbCIsImNvbnRlbnQiLCJzdGF0dXNDb2RlIiwiZXJyTXNnIiwiY29kZSIsIm1zZyIsImZhaWwiLCJjb21wbGV0ZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSUEsTUFBTUMsUUFBUSx5QkFBUixDQUFWO0FBQ0E7Ozs7Ozs7QUFPQSxJQUFJQyxVQUFVLEtBQWQ7QUFDQSxJQUFJQSxPQUFKLEVBQWE7QUFBQSxRQUlBQyxRQUpBLEdBSVQsU0FBU0EsUUFBVCxDQUFpQkMsSUFBakIsRUFBdUI7QUFDbkIsWUFBSUMsU0FBU0MsS0FBS0MsU0FBTCxDQUFlSCxJQUFmLENBQWI7QUFDQSxZQUFJSSxRQUFRQyxZQUFZQyxXQUFaLENBQXdCTCxNQUF4QixDQUFaO0FBQ0EsZUFBT0csS0FBUDtBQUNILEtBUlE7O0FBQ1QsUUFBSUcsWUFBWSxFQUFoQjtBQUNBLFFBQUlGLGNBQWMsSUFBSVQsSUFBSVksTUFBUixFQUFsQjtBQUNBSCxrQkFBY1QsSUFBSWEsT0FBSixDQUFZQyxNQUFaLENBQW1CSCxTQUFuQixDQUFkO0FBTUg7QUFDRDs7Ozs7O0FBTUEsSUFBSUksTUFBTTtBQUNOQyxjQUFVLGdDQURKO0FBRU5DLGlCQUFhLGNBRlA7QUFHTkMsZ0JBQVcsS0FITDtBQUlOQyxhQUFTLGlCQUFVQyxHQUFWLEVBQWU7QUFDcEIsZUFBTyxJQUFJQyxPQUFKLENBQVksVUFBU0MsT0FBVCxFQUFpQkMsTUFBakIsRUFBd0I7QUFDdkMsZ0JBQUlDLFNBQVNKLElBQUlLLE1BQUosR0FBYSxFQUFFLGdCQUFnQixtQ0FBbEIsRUFBYixHQUF1RSxFQUFwRjtBQUNBRCxxQkFBU0osSUFBSUksTUFBSixHQUFhRSxPQUFPQyxNQUFQLENBQWNILE1BQWQsRUFBc0JKLElBQUlJLE1BQTFCLENBQWIsR0FBaURBLE1BQTFELENBRnVDLENBRTBCO0FBQ2pFLGdCQUFJSSxTQUFTLEVBQWI7QUFDQSxnQkFBSVIsSUFBSWhCLElBQVIsRUFBYztBQUNWd0IseUJBQVMxQixVQUFVQyxRQUFRaUIsSUFBSWhCLElBQVosQ0FBVixHQUE4QmdCLElBQUloQixJQUEzQztBQUNIO0FBQ0R5QixlQUFHVixPQUFILENBQVc7QUFDUFcscUJBQUtmLElBQUlDLFFBQUosR0FBZUksSUFBSVUsR0FEakI7QUFFUDFCLHNCQUFNd0IsTUFGQztBQUdQSCx3QkFBUUwsSUFBSUssTUFBSixJQUFjLEtBSGY7QUFJUEQsd0JBQVFBLE1BSkQ7QUFLUE8seUJBQVMsaUJBQVVDLEdBQVYsRUFBZTtBQUNwQix3QkFBSTVCLE9BQU80QixJQUFJNUIsSUFBZjtBQUNBLHdCQUFJLENBQUNBLElBQUwsRUFBVztBQUNQeUIsMkJBQUdJLFNBQUgsQ0FBYTtBQUNUQyxtQ0FBTyxJQURFO0FBRVRDLHdDQUFZLEtBRkg7QUFHVEMscUNBQVNKLElBQUlLLFVBQUosR0FBaUIsR0FBakIsR0FBdUJMLElBQUlNO0FBSDNCLHlCQUFiO0FBS0E7QUFDSDtBQUNELHdCQUFJbEMsS0FBS21DLElBQUwsSUFBYSxPQUFqQixFQUEwQjtBQUN2QmpCLGdDQUFRVSxHQUFSO0FBQ0YscUJBRkQsTUFFTztBQUNISCwyQkFBR0ksU0FBSCxDQUFhO0FBQ1RDLG1DQUFPbkIsSUFBSUUsV0FBSixHQUFrQixLQURoQjtBQUVUa0Isd0NBQVksS0FGSDtBQUdUQyxxQ0FBU2hDLEtBQUtvQyxHQUFMLEdBQVdwQyxLQUFLb0MsR0FBaEIsR0FBc0IsU0FBU3BDLEtBQUttQztBQUhwQyx5QkFBYjtBQUtIO0FBQ0osaUJBeEJNO0FBeUJQRSxzQkFBTSxnQkFBWTtBQUNkWix1QkFBR0ksU0FBSCxDQUFhO0FBQ1RDLCtCQUFPbkIsSUFBSUUsV0FBSixHQUFrQixLQURoQjtBQUVUa0Isb0NBQVksS0FGSDtBQUdUQyxpQ0FBU0osSUFBSU07QUFISixxQkFBYjtBQUtILGlCQS9CTTtBQWdDUEksMEJBQVUsb0JBQVksQ0FFckI7QUFsQ00sYUFBWDtBQW9DSCxTQTNDTSxDQUFQO0FBNENIOztBQWpESyxDQUFWOztBQXFEQUMsT0FBT0MsT0FBUCxHQUFpQjdCLEdBQWpCIiwiZmlsZSI6InNlcnZpY2UvZm1sU2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImxldCBSU0EgPSByZXF1aXJlKCcuLi9saWIvd3hhcHBfcnNhLm1pbi5qcycpO1xuLyoqXG4gKiBSU0HliqDlr4ZcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gUlNBIOaYr+WQpumcgOimgeWvueS8oOmAkuWPguaVsOi/m+ihjOWKoOWvhlxuICogQHBhcmFtIHtmdW5jdGlvbn0gUlNBZGF0YSDlr7nmlbDmja7ov5vooYzliqDlr4bvvIzlpoLmnpzmlbDmja7otoXov4fkuIDlrprplb/luqbov5vooYzliIbmrrXliqDlr4ZcbiAqIEBwYXJhbSB7c3RyaW5nfSBwdWJsaWNLZXkg5Yqg5a+G5YWs6ZKl77yI6K6p5ZCO5Y+w5Lq65ZGY57uZ5LqI77yJXG4gKiBAcGFyYW0ge09iamVjdH0gZW5jcnlwdF9yc2Eg5Yqg5a+G5pa55rOVXG4gKi9cbmxldCByc2FEYXRhID0gZmFsc2U7XG5pZiAocnNhRGF0YSkge1xuICAgIGxldCBwdWJsaWNLZXkgPSAnJztcbiAgICBsZXQgZW5jcnlwdF9yc2EgPSBuZXcgUlNBLlJTQUtleSgpO1xuICAgIGVuY3J5cHRfcnNhID0gUlNBLktFWVVUSUwuZ2V0S2V5KHB1YmxpY0tleSlcbiAgICBmdW5jdGlvbiBSU0FkYXRhKGRhdGEpIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IEpTT04uc3RyaW5naWZ5KGRhdGEpXG4gICAgICAgIGxldCBwYXJhbSA9IGVuY3J5cHRfcnNhLmVuY3J5cHRMb25nKHJlc3VsdClcbiAgICAgICAgcmV0dXJuIHBhcmFtXG4gICAgfVxufVxuLyoqXG4gKiByZXF1ZXN06K+35rGCXG4gKiBAcGFyYW0ge3N0cmluZ30gYmFzZUhvc3Qg6aG555uu5Z+f5ZCNXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJvamVjdE5hbWUg6aG555uu5ZCN56ewXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSByZXF1ZXN0IHd4LnJlcXVlc3Tov5vooYzlsIHoo4VcbiAqL1xudmFyIGZtbCA9IHtcbiAgICBiYXNlSG9zdDogJ2h0dHBzOi8vd29ybGQtY3VwLmlzaGFvaHVvLmNuLycsXG4gICAgcHJvamVjdE5hbWU6ICd3ZWNoYXQtZnJhbWUnLFxuICAgIGVuY3J5cHRpb246ZmFsc2UsXG4gICAgcmVxdWVzdDogZnVuY3Rpb24gKG9iaikge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSxyZWplY3Qpe1xuICAgICAgICAgICAgbGV0IGhlYWRlciA9IG9iai5tZXRob2QgPyB7ICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJyB9IDoge307XG4gICAgICAgICAgICBoZWFkZXIgPSBvYmouaGVhZGVyID8gT2JqZWN0LmFzc2lnbihoZWFkZXIsIG9iai5oZWFkZXIpIDogaGVhZGVyOy8v5a+5aGVhZGVy6L+b6KGM5omp5bGV77yI5Y+v6IO95ZyoaGVhZGVy5Lit6ZyA6KaB5Lyg6YCS5Y+C5pWw77yJXG4gICAgICAgICAgICBsZXQgcGFyYW1zID0ge307XG4gICAgICAgICAgICBpZiAob2JqLmRhdGEpIHtcbiAgICAgICAgICAgICAgICBwYXJhbXMgPSByc2FEYXRhID8gUlNBZGF0YShvYmouZGF0YSkgOiBvYmouZGF0YTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHd4LnJlcXVlc3Qoe1xuICAgICAgICAgICAgICAgIHVybDogZm1sLmJhc2VIb3N0ICsgb2JqLnVybCxcbiAgICAgICAgICAgICAgICBkYXRhOiBwYXJhbXMsXG4gICAgICAgICAgICAgICAgbWV0aG9kOiBvYmoubWV0aG9kIHx8ICdHRVQnLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogaGVhZGVyLFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGEgPSByZXMuZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93Q2FuY2VsOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiByZXMuc3RhdHVzQ29kZSArICc6JyArIHJlcy5lcnJNc2dcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5jb2RlID09ICcwMDAwMCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXMpXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBmbWwucHJvamVjdE5hbWUgKyAn5o+Q6YaS5oKoJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93Q2FuY2VsOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBkYXRhLm1zZyA/IGRhdGEubXNnIDogJ+mUmeivr+egge+8micgKyBkYXRhLmNvZGUsXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBmYWlsOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogZm1sLnByb2plY3ROYW1lICsgJ+aPkOmGkuaCqCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBzaG93Q2FuY2VsOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IHJlcy5lcnJNc2dcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGNvbXBsZXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICB9XG5cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmbWwiXX0=
