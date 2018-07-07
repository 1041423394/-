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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZpY2UvcHJvamVjdFJlcXVlc3QuanMiXSwibmFtZXMiOlsiZm1sIiwicmVxdWlyZSIsIkludGVyZmFjZSIsImdldE9wZW5JZCIsIm9iaiIsInJlcXVlc3QiLCJ1cmwiLCJkYXRhIiwicGFyYW1zIiwibWV0aG9kIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJQSxNQUFNQyxRQUFRLGVBQVIsQ0FBVjtBQUNJOzs7O0FBSUosSUFBSUMsWUFBWTtBQUNaLGlCQUFhO0FBREQsQ0FBaEI7QUFHQSxJQUFJQyxZQUFZLFNBQVpBLFNBQVksQ0FBU0MsR0FBVCxFQUFjO0FBQzFCLFdBQU9KLElBQUlLLE9BQUosQ0FBWTtBQUNmQyxhQUFLSixVQUFVQyxTQURBO0FBRWZJLGNBQU1ILElBQUlJLE1BRks7QUFHZkMsZ0JBQVE7QUFITyxLQUFaLENBQVA7QUFLSCxDQU5EOztBQVFBQyxPQUFPQyxPQUFQLEdBQWlCO0FBQ2JSLGVBQVdBO0FBREUsQ0FBakIiLCJmaWxlIjoic2VydmljZS9wcm9qZWN0UmVxdWVzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImxldCBmbWwgPSByZXF1aXJlKCdmbWxTZXJ2aWNlLmpzJylcbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gSW50ZXJmYWNlIOWQhOaOpeWPo+WcsOWdgFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBnZXRPcGVuSWQg6I635Y+W55So5oi3b3BlbmlkXG4gICAgICovXG5sZXQgSW50ZXJmYWNlID0ge1xuICAgICdnZXRPcGVuSWQnOiAnY29tbW9uL2luaXQnXG59XG5sZXQgZ2V0T3BlbklkID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgcmV0dXJuIGZtbC5yZXF1ZXN0KHtcbiAgICAgICAgdXJsOiBJbnRlcmZhY2UuZ2V0T3BlbklkLFxuICAgICAgICBkYXRhOiBvYmoucGFyYW1zLFxuICAgICAgICBtZXRob2Q6ICdQT1NUJ1xuICAgIH0pXG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGdldE9wZW5JZDogZ2V0T3BlbklkXG59Il19
