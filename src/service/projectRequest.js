let fml = require('fmlService.js')
    /**
     * @param {object} Interface 各接口地址
     * @param {string} getOpenId 获取用户openid
     */
let Interface = {
    'getOpenId': 'common/init'
}
let getOpenId = function(obj) {
    return fml.request({
        url: Interface.getOpenId,
        data: obj.params,
        method: 'POST'
    })
}

module.exports = {
    getOpenId: getOpenId
}