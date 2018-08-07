var regeneratorRuntime = require("../lib/runtime.js");'use strict';

var fml = require('fmlService.js');
/**
 * @param {object} Interface 各接口地址
 * @param {string} getOpenId 获取用户openid
 */
var Interface = {
    'getOpenId': 'common/init'
};
var getOpenId = function getOpenId(obj) {
    return fml.request({
        url: Interface.getOpenId,
        data: obj.params,
        method: 'POST'
    });
};

module.exports = {
    getOpenId: getOpenId
};