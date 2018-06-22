let RSA = require('../lib/wxapp_rsa.min.js');
/**
 * RSA加密
 * @param {boolean} RSA 是否需要对传递参数进行加密
 * @param {function} RSAdata 对数据进行加密，如果数据超过一定长度进行分段加密
 * @param {string} publicKey 加密公钥（让后台人员给予）
 * @param {Object} encrypt_rsa 加密方法
 */
let rsaData = false;
if (rsaData) {
    let publicKey = '';
    let encrypt_rsa = new RSA.RSAKey();
    encrypt_rsa = RSA.KEYUTIL.getKey(publicKey)
    function RSAdata(data) {
        let result = JSON.stringify(data)
        let param = encrypt_rsa.encryptLong(result)
        return param
    }
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
    encryption:false,
    request: function (obj) {
        return new Promise(function(resolve,reject){
            let header = obj.method ? { 'content-type': 'application/x-www-form-urlencoded' } : {};
            header = obj.header ? Object.assign(header, obj.header) : header;//对header进行扩展（可能在header中需要传递参数）
            let params = {};
            if (obj.data) {
                params = rsaData ? RSAdata(obj.data) : obj.data;
            }
            wx.request({
                url: fml.baseHost + obj.url,
                data: params,
                method: obj.method || 'GET',
                header: header,
                success: function (res) {
                    let data = res.data;
                    if (!data) {
                        wx.showModal({
                            title: '提示',
                            showCancel: false,
                            content: res.statusCode + ':' + res.errMsg
                        })
                        return
                    }
                    if (data.code == '00000') {
                       resolve(res)
                    } else {
                        wx.showModal({
                            title: fml.projectName + '提醒您',
                            showCancel: false,
                            content: data.msg ? data.msg : '错误码：' + data.code,
                        })
                    }
                },
                fail: function () {
                    wx.showModal({
                        title: fml.projectName + '提醒您',
                        showCancel: false,
                        content: res.errMsg
                    })
                },
                complete: function () {
    
                }
            })
        })
    }

}

module.exports = fml