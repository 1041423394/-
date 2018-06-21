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
 * @param {boolean} encryption 是否需要多端判定为同一用户
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZpY2UvZm1sU2VydmljZS5qcyJdLCJuYW1lcyI6WyJSU0EiLCJyZXF1aXJlIiwicnNhRGF0YSIsIlJTQWRhdGEiLCJkYXRhIiwicmVzdWx0IiwiSlNPTiIsInN0cmluZ2lmeSIsInBhcmFtIiwiZW5jcnlwdF9yc2EiLCJlbmNyeXB0TG9uZyIsInB1YmxpY0tleSIsIlJTQUtleSIsIktFWVVUSUwiLCJnZXRLZXkiLCJmbWwiLCJiYXNlSG9zdCIsInByb2plY3ROYW1lIiwiZW5jcnlwdGlvbiIsInJlcXVlc3QiLCJvYmoiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImhlYWRlciIsIm1ldGhvZCIsIk9iamVjdCIsImFzc2lnbiIsInBhcmFtcyIsInd4IiwidXJsIiwic3VjY2VzcyIsInJlcyIsInNob3dNb2RhbCIsInRpdGxlIiwic2hvd0NhbmNlbCIsImNvbnRlbnQiLCJzdGF0dXNDb2RlIiwiZXJyTXNnIiwiY29kZSIsIm1zZyIsImZhaWwiLCJjb21wbGV0ZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSUEsTUFBTUMsUUFBUSx5QkFBUixDQUFWO0FBQ0E7Ozs7Ozs7QUFPQSxJQUFJQyxVQUFVLEtBQWQ7QUFDQSxJQUFJQSxPQUFKLEVBQWE7QUFBQSxRQUlBQyxRQUpBLEdBSVQsU0FBU0EsUUFBVCxDQUFpQkMsSUFBakIsRUFBdUI7QUFDbkIsWUFBSUMsU0FBU0MsS0FBS0MsU0FBTCxDQUFlSCxJQUFmLENBQWI7QUFDQSxZQUFJSSxRQUFRQyxZQUFZQyxXQUFaLENBQXdCTCxNQUF4QixDQUFaO0FBQ0EsZUFBT0csS0FBUDtBQUNILEtBUlE7O0FBQ1QsUUFBSUcsWUFBWSxFQUFoQjtBQUNBLFFBQUlGLGNBQWMsSUFBSVQsSUFBSVksTUFBUixFQUFsQjtBQUNBSCxrQkFBY1QsSUFBSWEsT0FBSixDQUFZQyxNQUFaLENBQW1CSCxTQUFuQixDQUFkO0FBTUg7QUFDRDs7Ozs7OztBQU9BLElBQUlJLE1BQU07QUFDTkMsY0FBVSxnQ0FESjtBQUVOQyxpQkFBYSxjQUZQO0FBR05DLGdCQUFXLEtBSEw7QUFJTkMsYUFBUyxpQkFBVUMsR0FBVixFQUFlO0FBQ3BCLGVBQU8sSUFBSUMsT0FBSixDQUFZLFVBQVNDLE9BQVQsRUFBaUJDLE1BQWpCLEVBQXdCO0FBQ3ZDLGdCQUFJQyxTQUFTSixJQUFJSyxNQUFKLEdBQWEsRUFBRSxnQkFBZ0IsbUNBQWxCLEVBQWIsR0FBdUUsRUFBcEY7QUFDQUQscUJBQVNKLElBQUlJLE1BQUosR0FBYUUsT0FBT0MsTUFBUCxDQUFjSCxNQUFkLEVBQXNCSixJQUFJSSxNQUExQixDQUFiLEdBQWlEQSxNQUExRCxDQUZ1QyxDQUUwQjtBQUNqRSxnQkFBSUksU0FBUyxFQUFiO0FBQ0EsZ0JBQUlSLElBQUloQixJQUFSLEVBQWM7QUFDVndCLHlCQUFTMUIsVUFBVUMsUUFBUWlCLElBQUloQixJQUFaLENBQVYsR0FBOEJnQixJQUFJaEIsSUFBM0M7QUFDSDtBQUNEeUIsZUFBR1YsT0FBSCxDQUFXO0FBQ1BXLHFCQUFLZixJQUFJQyxRQUFKLEdBQWVJLElBQUlVLEdBRGpCO0FBRVAxQixzQkFBTXdCLE1BRkM7QUFHUEgsd0JBQVFMLElBQUlLLE1BQUosSUFBYyxLQUhmO0FBSVBELHdCQUFRQSxNQUpEO0FBS1BPLHlCQUFTLGlCQUFVQyxHQUFWLEVBQWU7QUFDcEIsd0JBQUk1QixPQUFPNEIsSUFBSTVCLElBQWY7QUFDQSx3QkFBSSxDQUFDQSxJQUFMLEVBQVc7QUFDUHlCLDJCQUFHSSxTQUFILENBQWE7QUFDVEMsbUNBQU8sSUFERTtBQUVUQyx3Q0FBWSxLQUZIO0FBR1RDLHFDQUFTSixJQUFJSyxVQUFKLEdBQWlCLEdBQWpCLEdBQXVCTCxJQUFJTTtBQUgzQix5QkFBYjtBQUtBO0FBQ0g7QUFDRCx3QkFBSWxDLEtBQUttQyxJQUFMLElBQWEsT0FBakIsRUFBMEI7QUFDdkJqQixnQ0FBUVUsR0FBUjtBQUNGLHFCQUZELE1BRU87QUFDSEgsMkJBQUdJLFNBQUgsQ0FBYTtBQUNUQyxtQ0FBT25CLElBQUlFLFdBQUosR0FBa0IsS0FEaEI7QUFFVGtCLHdDQUFZLEtBRkg7QUFHVEMscUNBQVNoQyxLQUFLb0MsR0FBTCxHQUFXcEMsS0FBS29DLEdBQWhCLEdBQXNCLFNBQVNwQyxLQUFLbUM7QUFIcEMseUJBQWI7QUFLSDtBQUNKLGlCQXhCTTtBQXlCUEUsc0JBQU0sZ0JBQVk7QUFDZFosdUJBQUdJLFNBQUgsQ0FBYTtBQUNUQywrQkFBT25CLElBQUlFLFdBQUosR0FBa0IsS0FEaEI7QUFFVGtCLG9DQUFZLEtBRkg7QUFHVEMsaUNBQVNKLElBQUlNO0FBSEoscUJBQWI7QUFLSCxpQkEvQk07QUFnQ1BJLDBCQUFVLG9CQUFZLENBRXJCO0FBbENNLGFBQVg7QUFvQ0gsU0EzQ00sQ0FBUDtBQTRDSDs7QUFqREssQ0FBVjs7QUFxREFDLE9BQU9DLE9BQVAsR0FBaUI3QixHQUFqQiIsImZpbGUiOiJzZXJ2aWNlL2ZtbFNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJsZXQgUlNBID0gcmVxdWlyZSgnLi4vbGliL3d4YXBwX3JzYS5taW4uanMnKTtcbi8qKlxuICogUlNB5Yqg5a+GXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFJTQSDmmK/lkKbpnIDopoHlr7nkvKDpgJLlj4LmlbDov5vooYzliqDlr4ZcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IFJTQWRhdGEg5a+55pWw5o2u6L+b6KGM5Yqg5a+G77yM5aaC5p6c5pWw5o2u6LaF6L+H5LiA5a6a6ZW/5bqm6L+b6KGM5YiG5q615Yqg5a+GXG4gKiBAcGFyYW0ge3N0cmluZ30gcHVibGljS2V5IOWKoOWvhuWFrOmSpe+8iOiuqeWQjuWPsOS6uuWRmOe7meS6iO+8iVxuICogQHBhcmFtIHtPYmplY3R9IGVuY3J5cHRfcnNhIOWKoOWvhuaWueazlVxuICovXG5sZXQgcnNhRGF0YSA9IGZhbHNlO1xuaWYgKHJzYURhdGEpIHtcbiAgICBsZXQgcHVibGljS2V5ID0gJyc7XG4gICAgbGV0IGVuY3J5cHRfcnNhID0gbmV3IFJTQS5SU0FLZXkoKTtcbiAgICBlbmNyeXB0X3JzYSA9IFJTQS5LRVlVVElMLmdldEtleShwdWJsaWNLZXkpXG4gICAgZnVuY3Rpb24gUlNBZGF0YShkYXRhKSB7XG4gICAgICAgIGxldCByZXN1bHQgPSBKU09OLnN0cmluZ2lmeShkYXRhKVxuICAgICAgICBsZXQgcGFyYW0gPSBlbmNyeXB0X3JzYS5lbmNyeXB0TG9uZyhyZXN1bHQpXG4gICAgICAgIHJldHVybiBwYXJhbVxuICAgIH1cbn1cbi8qKlxuICogcmVxdWVzdOivt+axglxuICogQHBhcmFtIHtzdHJpbmd9IGJhc2VIb3N0IOmhueebruWfn+WQjVxuICogQHBhcmFtIHtzdHJpbmd9IHByb2plY3ROYW1lIOmhueebruWQjeensFxuICogQHBhcmFtIHtib29sZWFufSBlbmNyeXB0aW9uIOaYr+WQpumcgOimgeWkmuerr+WIpOWumuS4uuWQjOS4gOeUqOaIt1xuICogQHBhcmFtIHtmdW5jdGlvbn0gcmVxdWVzdCB3eC5yZXF1ZXN06L+b6KGM5bCB6KOFXG4gKi9cbnZhciBmbWwgPSB7XG4gICAgYmFzZUhvc3Q6ICdodHRwczovL3dvcmxkLWN1cC5pc2hhb2h1by5jbi8nLFxuICAgIHByb2plY3ROYW1lOiAnd2VjaGF0LWZyYW1lJyxcbiAgICBlbmNyeXB0aW9uOmZhbHNlLFxuICAgIHJlcXVlc3Q6IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUscmVqZWN0KXtcbiAgICAgICAgICAgIGxldCBoZWFkZXIgPSBvYmoubWV0aG9kID8geyAnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcgfSA6IHt9O1xuICAgICAgICAgICAgaGVhZGVyID0gb2JqLmhlYWRlciA/IE9iamVjdC5hc3NpZ24oaGVhZGVyLCBvYmouaGVhZGVyKSA6IGhlYWRlcjsvL+WvuWhlYWRlcui/m+ihjOaJqeWxle+8iOWPr+iDveWcqGhlYWRlcuS4remcgOimgeS8oOmAkuWPguaVsO+8iVxuICAgICAgICAgICAgbGV0IHBhcmFtcyA9IHt9O1xuICAgICAgICAgICAgaWYgKG9iai5kYXRhKSB7XG4gICAgICAgICAgICAgICAgcGFyYW1zID0gcnNhRGF0YSA/IFJTQWRhdGEob2JqLmRhdGEpIDogb2JqLmRhdGE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3eC5yZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICB1cmw6IGZtbC5iYXNlSG9zdCArIG9iai51cmwsXG4gICAgICAgICAgICAgICAgZGF0YTogcGFyYW1zLFxuICAgICAgICAgICAgICAgIG1ldGhvZDogb2JqLm1ldGhvZCB8fCAnR0VUJyxcbiAgICAgICAgICAgICAgICBoZWFkZXI6IGhlYWRlcixcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBkYXRhID0gcmVzLmRhdGE7XG4gICAgICAgICAgICAgICAgICAgIGlmICghZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvd0NhbmNlbDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogcmVzLnN0YXR1c0NvZGUgKyAnOicgKyByZXMuZXJyTXNnXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuY29kZSA9PSAnMDAwMDAnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzKVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogZm1sLnByb2plY3ROYW1lICsgJ+aPkOmGkuaCqCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvd0NhbmNlbDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogZGF0YS5tc2cgPyBkYXRhLm1zZyA6ICfplJnor6/noIHvvJonICsgZGF0YS5jb2RlLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZmFpbDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IGZtbC5wcm9qZWN0TmFtZSArICfmj5DphpLmgqgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2hvd0NhbmNlbDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiByZXMuZXJyTXNnXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBjb21wbGV0ZTogZnVuY3Rpb24gKCkge1xuICAgIFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgfVxuXG59XG5cbm1vZHVsZS5leHBvcnRzID0gZm1sIl19
