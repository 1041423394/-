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