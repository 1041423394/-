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
                    obj.success(res);
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
    }

};

module.exports = fml;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZpY2UvZm1sU2VydmljZS5qcyJdLCJuYW1lcyI6WyJSU0EiLCJyZXF1aXJlIiwicnNhRGF0YSIsIlJTQWRhdGEiLCJkYXRhIiwicmVzdWx0IiwiSlNPTiIsInN0cmluZ2lmeSIsInBhcmFtIiwiZW5jcnlwdF9yc2EiLCJlbmNyeXB0TG9uZyIsInB1YmxpY0tleSIsIlJTQUtleSIsIktFWVVUSUwiLCJnZXRLZXkiLCJmbWwiLCJiYXNlSG9zdCIsInByb2plY3ROYW1lIiwicmVxdWVzdCIsIm9iaiIsImhlYWRlciIsIm1ldGhvZCIsIk9iamVjdCIsImFzc2lnbiIsInBhcmFtcyIsInd4IiwidXJsIiwic3VjY2VzcyIsInJlcyIsInNob3dNb2RhbCIsInRpdGxlIiwic2hvd0NhbmNlbCIsImNvbnRlbnQiLCJzdGF0dXNDb2RlIiwiZXJyTXNnIiwiY29kZSIsIm1zZyIsImZhaWwiLCJjb21wbGV0ZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSUEsTUFBTUMsUUFBUSx5QkFBUixDQUFWO0FBQ0E7Ozs7Ozs7QUFPQSxJQUFJQyxVQUFVLEtBQWQ7QUFDQSxJQUFJQSxPQUFKLEVBQWE7QUFBQSxRQUlBQyxRQUpBLEdBSVQsU0FBU0EsUUFBVCxDQUFpQkMsSUFBakIsRUFBdUI7QUFDbkIsWUFBSUMsU0FBU0MsS0FBS0MsU0FBTCxDQUFlSCxJQUFmLENBQWI7QUFDQSxZQUFJSSxRQUFRQyxZQUFZQyxXQUFaLENBQXdCTCxNQUF4QixDQUFaO0FBQ0EsZUFBT0csS0FBUDtBQUNILEtBUlE7O0FBQ1QsUUFBSUcsWUFBWSxFQUFoQjtBQUNBLFFBQUlGLGNBQWMsSUFBSVQsSUFBSVksTUFBUixFQUFsQjtBQUNBSCxrQkFBY1QsSUFBSWEsT0FBSixDQUFZQyxNQUFaLENBQW1CSCxTQUFuQixDQUFkO0FBTUg7QUFDRDs7Ozs7OztBQU9BLElBQUlJLE1BQU07QUFDTkMsY0FBVSxnQ0FESjtBQUVOQyxpQkFBYSxjQUZQO0FBR05DLGFBQVMsaUJBQVVDLEdBQVYsRUFBZTtBQUNwQixZQUFJQyxTQUFTRCxJQUFJRSxNQUFKLEdBQWEsRUFBRSxnQkFBZ0IsbUNBQWxCLEVBQWIsR0FBdUUsRUFBcEY7QUFDQUQsaUJBQVNELElBQUlDLE1BQUosR0FBYUUsT0FBT0MsTUFBUCxDQUFjSCxNQUFkLEVBQXNCRCxJQUFJQyxNQUExQixDQUFiLEdBQWlEQSxNQUExRCxDQUZvQixDQUU2QztBQUNqRSxZQUFJSSxTQUFTLEVBQWI7QUFDQSxZQUFJTCxJQUFJZixJQUFSLEVBQWM7QUFDVm9CLHFCQUFTdEIsVUFBVUMsUUFBUWdCLElBQUlmLElBQVosQ0FBVixHQUE4QmUsSUFBSWYsSUFBM0M7QUFDSDtBQUNEcUIsV0FBR1AsT0FBSCxDQUFXO0FBQ1BRLGlCQUFLWCxJQUFJQyxRQUFKLEdBQWVHLElBQUlPLEdBRGpCO0FBRVB0QixrQkFBTW9CLE1BRkM7QUFHUEgsb0JBQVFGLElBQUlFLE1BQUosSUFBYyxLQUhmO0FBSVBELG9CQUFRQSxNQUpEO0FBS1BPLHFCQUFTLGlCQUFVQyxHQUFWLEVBQWU7QUFDcEIsb0JBQUl4QixPQUFPd0IsSUFBSXhCLElBQWY7QUFDQSxvQkFBSSxDQUFDQSxJQUFMLEVBQVc7QUFDUHFCLHVCQUFHSSxTQUFILENBQWE7QUFDVEMsK0JBQU8sSUFERTtBQUVUQyxvQ0FBWSxLQUZIO0FBR1RDLGlDQUFTSixJQUFJSyxVQUFKLEdBQWlCLEdBQWpCLEdBQXVCTCxJQUFJTTtBQUgzQixxQkFBYjtBQUtBO0FBQ0g7QUFDRCxvQkFBSTlCLEtBQUsrQixJQUFMLElBQWEsT0FBakIsRUFBMEI7QUFDdEJoQix3QkFBSVEsT0FBSixDQUFZQyxHQUFaO0FBQ0gsaUJBRkQsTUFFTztBQUNISCx1QkFBR0ksU0FBSCxDQUFhO0FBQ1RDLCtCQUFPZixJQUFJRSxXQUFKLEdBQWtCLEtBRGhCO0FBRVRjLG9DQUFZLEtBRkg7QUFHVEMsaUNBQVM1QixLQUFLZ0MsR0FBTCxHQUFXaEMsS0FBS2dDLEdBQWhCLEdBQXNCLFNBQVNoQyxLQUFLK0I7QUFIcEMscUJBQWI7QUFLSDtBQUNKLGFBeEJNO0FBeUJQRSxrQkFBTSxnQkFBWTtBQUNkWixtQkFBR0ksU0FBSCxDQUFhO0FBQ1RDLDJCQUFPZixJQUFJRSxXQUFKLEdBQWtCLEtBRGhCO0FBRVRjLGdDQUFZLEtBRkg7QUFHVEMsNkJBQVNKLElBQUlNO0FBSEosaUJBQWI7QUFLSCxhQS9CTTtBQWdDUEksc0JBQVUsb0JBQVksQ0FFckI7QUFsQ00sU0FBWDtBQW9DSDs7QUE5Q0ssQ0FBVjs7QUFrREFDLE9BQU9DLE9BQVAsR0FBaUJ6QixHQUFqQiIsImZpbGUiOiJzZXJ2aWNlL2ZtbFNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJsZXQgUlNBID0gcmVxdWlyZSgnLi4vbGliL3d4YXBwX3JzYS5taW4uanMnKTtcbi8qKlxuICogUlNB5Yqg5a+GXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFJTQSDmmK/lkKbpnIDopoHlr7nkvKDpgJLlj4LmlbDov5vooYzliqDlr4ZcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IFJTQWRhdGEg5a+55pWw5o2u6L+b6KGM5Yqg5a+G77yM5aaC5p6c5pWw5o2u6LaF6L+H5LiA5a6a6ZW/5bqm6L+b6KGM5YiG5q615Yqg5a+GXG4gKiBAcGFyYW0ge3N0cmluZ30gcHVibGljS2V5IOWKoOWvhuWFrOmSpe+8iOiuqeWQjuWPsOS6uuWRmOe7meS6iO+8iVxuICogQHBhcmFtIHtPYmplY3R9IGVuY3J5cHRfcnNhIOWKoOWvhuaWueazlVxuICovXG5sZXQgcnNhRGF0YSA9IGZhbHNlO1xuaWYgKHJzYURhdGEpIHtcbiAgICBsZXQgcHVibGljS2V5ID0gJyc7XG4gICAgbGV0IGVuY3J5cHRfcnNhID0gbmV3IFJTQS5SU0FLZXkoKTtcbiAgICBlbmNyeXB0X3JzYSA9IFJTQS5LRVlVVElMLmdldEtleShwdWJsaWNLZXkpXG4gICAgZnVuY3Rpb24gUlNBZGF0YShkYXRhKSB7XG4gICAgICAgIGxldCByZXN1bHQgPSBKU09OLnN0cmluZ2lmeShkYXRhKVxuICAgICAgICBsZXQgcGFyYW0gPSBlbmNyeXB0X3JzYS5lbmNyeXB0TG9uZyhyZXN1bHQpXG4gICAgICAgIHJldHVybiBwYXJhbVxuICAgIH1cbn1cbi8qKlxuICogcmVxdWVzdOivt+axglxuICogQHBhcmFtIHtzdHJpbmd9IGJhc2VIb3N0IOmhueebruWfn+WQjVxuICogQHBhcmFtIHtzdHJpbmd9IHByb2plY3ROYW1lIOmhueebruWQjeensFxuICogQHBhcmFtIHtmdW5jdGlvbn0gd3hQcm9taXNpZnkgcHJvbWlzZeWvueixoVxuICogQHBhcmFtIHtmdW5jdGlvbn0gcmVxdWVzdCB3eC5yZXF1ZXN06L+b6KGM5bCB6KOFXG4gKi9cbnZhciBmbWwgPSB7XG4gICAgYmFzZUhvc3Q6ICdodHRwczovL3dvcmxkLWN1cC5pc2hhb2h1by5jbi8nLFxuICAgIHByb2plY3ROYW1lOiAnd2VjaGF0LWZyYW1lJyxcbiAgICByZXF1ZXN0OiBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgIGxldCBoZWFkZXIgPSBvYmoubWV0aG9kID8geyAnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcgfSA6IHt9O1xuICAgICAgICBoZWFkZXIgPSBvYmouaGVhZGVyID8gT2JqZWN0LmFzc2lnbihoZWFkZXIsIG9iai5oZWFkZXIpIDogaGVhZGVyOy8v5a+5aGVhZGVy6L+b6KGM5omp5bGV77yI5Y+v6IO95ZyoaGVhZGVy5Lit6ZyA6KaB5Lyg6YCS5Y+C5pWw77yJXG4gICAgICAgIGxldCBwYXJhbXMgPSB7fTtcbiAgICAgICAgaWYgKG9iai5kYXRhKSB7XG4gICAgICAgICAgICBwYXJhbXMgPSByc2FEYXRhID8gUlNBZGF0YShvYmouZGF0YSkgOiBvYmouZGF0YTtcbiAgICAgICAgfVxuICAgICAgICB3eC5yZXF1ZXN0KHtcbiAgICAgICAgICAgIHVybDogZm1sLmJhc2VIb3N0ICsgb2JqLnVybCxcbiAgICAgICAgICAgIGRhdGE6IHBhcmFtcyxcbiAgICAgICAgICAgIG1ldGhvZDogb2JqLm1ldGhvZCB8fCAnR0VUJyxcbiAgICAgICAgICAgIGhlYWRlcjogaGVhZGVyLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgICAgICAgIGxldCBkYXRhID0gcmVzLmRhdGE7XG4gICAgICAgICAgICAgICAgaWYgKCFkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICAgICAgICAgICAgICAgICAgICBzaG93Q2FuY2VsOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IHJlcy5zdGF0dXNDb2RlICsgJzonICsgcmVzLmVyck1zZ1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuY29kZSA9PSAnMDAwMDAnKSB7XG4gICAgICAgICAgICAgICAgICAgIG9iai5zdWNjZXNzKHJlcylcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IGZtbC5wcm9qZWN0TmFtZSArICfmj5DphpLmgqgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2hvd0NhbmNlbDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBkYXRhLm1zZyA/IGRhdGEubXNnIDogJ+mUmeivr+egge+8micgKyBkYXRhLmNvZGUsXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZhaWw6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogZm1sLnByb2plY3ROYW1lICsgJ+aPkOmGkuaCqCcsXG4gICAgICAgICAgICAgICAgICAgIHNob3dDYW5jZWw6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBjb250ZW50OiByZXMuZXJyTXNnXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb21wbGV0ZTogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuXG59XG5cbm1vZHVsZS5leHBvcnRzID0gZm1sIl19
