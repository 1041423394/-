var regeneratorRuntime = require("../../lib/runtime.js");"use strict";

Page({
  /**
   * 页面的初始数据
   */
  data: {},
  /**
   * button 调出用户信息授权 1.3.0基础库支持，这里不做低版本兼容处理
   */
  getUserInfo: function getUserInfo(e) {
    app.globalData.userInfo = e.detail.userInfo;
    this.setData({
      userInfo: e.detail.userInfo
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function onLoad(options) {},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function onReady() {},
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function onHide() {},
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function onUnload() {},
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function onPullDownRefresh() {},
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function onReachBottom() {},
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function onShareAppMessage() {}
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzL2xvZ2luL2xvZ2luLmpzIl0sIm5hbWVzIjpbIlBhZ2UiLCJkYXRhIiwiZ2V0VXNlckluZm8iLCJlIiwiYXBwIiwiZ2xvYmFsRGF0YSIsInVzZXJJbmZvIiwiZGV0YWlsIiwic2V0RGF0YSIsIm9uTG9hZCIsIm9wdGlvbnMiLCJvblJlYWR5Iiwib25IaWRlIiwib25VbmxvYWQiLCJvblB1bGxEb3duUmVmcmVzaCIsIm9uUmVhY2hCb3R0b20iLCJvblNoYXJlQXBwTWVzc2FnZSJdLCJtYXBwaW5ncyI6Ijs7QUFBQUEsS0FBSztBQUNEOzs7QUFHQUMsUUFBTSxFQUpMO0FBTUQ7OztBQUdBQyxlQUFhLHFCQUFTQyxDQUFULEVBQVk7QUFDdkJDLFFBQUlDLFVBQUosQ0FBZUMsUUFBZixHQUEwQkgsRUFBRUksTUFBRixDQUFTRCxRQUFuQztBQUNBLFNBQUtFLE9BQUwsQ0FBYTtBQUNYRixnQkFBVUgsRUFBRUksTUFBRixDQUFTRDtBQURSLEtBQWI7QUFHRCxHQWRBO0FBZUQ7OztBQUdBRyxVQUFRLGdCQUFVQyxPQUFWLEVBQW1CLENBRTFCLENBcEJBO0FBcUJEOzs7QUFHQUMsV0FBUyxtQkFBWSxDQUVwQixDQTFCQTtBQTJCRDs7O0FBR0FDLFVBQVEsa0JBQVksQ0FFbkIsQ0FoQ0E7QUFpQ0Q7OztBQUdBQyxZQUFVLG9CQUFZLENBRXJCLENBdENBO0FBdUNEOzs7QUFHQUMscUJBQW1CLDZCQUFZLENBRTlCLENBNUNBO0FBNkNEOzs7QUFHQUMsaUJBQWUseUJBQVksQ0FFMUIsQ0FsREE7QUFtREQ7OztBQUdBQyxxQkFBbUIsNkJBQVksQ0FFOUI7QUF4REEsQ0FBTCIsImZpbGUiOiJwYWdlcy9sb2dpbi9sb2dpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIlBhZ2Uoe1xuICAgIC8qKlxuICAgICAqIOmhtemdoueahOWIneWni+aVsOaNrlxuICAgICAqL1xuICAgIGRhdGE6IHtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIGJ1dHRvbiDosIPlh7rnlKjmiLfkv6Hmga/mjojmnYMgMS4zLjDln7rnoYDlupPmlK/mjIHvvIzov5nph4zkuI3lgZrkvY7niYjmnKzlhbzlrrnlpITnkIZcbiAgICAgKi9cbiAgICBnZXRVc2VySW5mbzogZnVuY3Rpb24oZSkge1xuICAgICAgYXBwLmdsb2JhbERhdGEudXNlckluZm8gPSBlLmRldGFpbC51c2VySW5mb1xuICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgdXNlckluZm86IGUuZGV0YWlsLnVzZXJJbmZvXG4gICAgICB9KVxuICAgIH0sXG4gICAgLyoqXG4gICAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLliqDovb1cbiAgICAgKi9cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uIChvcHRpb25zKSB7XG5cbiAgICB9LFxuICAgIC8qKlxuICAgICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5Yid5qyh5riy5p+T5a6M5oiQXG4gICAgICovXG4gICAgb25SZWFkeTogZnVuY3Rpb24gKCkge1xuICBcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i6ZqQ6JePXG4gICAgICovXG4gICAgb25IaWRlOiBmdW5jdGlvbiAoKSB7XG4gIFxuICAgIH0sXG4gICAgLyoqXG4gICAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLljbjovb1cbiAgICAgKi9cbiAgICBvblVubG9hZDogZnVuY3Rpb24gKCkge1xuICBcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIOmhtemdouebuOWFs+S6i+S7tuWkhOeQhuWHveaVsC0t55uR5ZCs55So5oi35LiL5ouJ5Yqo5L2cXG4gICAgICovXG4gICAgb25QdWxsRG93blJlZnJlc2g6IGZ1bmN0aW9uICgpIHtcbiAgXG4gICAgfSxcbiAgICAvKipcbiAgICAgKiDpobXpnaLkuIrmi4nop6blupXkuovku7bnmoTlpITnkIblh73mlbBcbiAgICAgKi9cbiAgICBvblJlYWNoQm90dG9tOiBmdW5jdGlvbiAoKSB7XG4gIFxuICAgIH0sXG4gICAgLyoqXG4gICAgICog55So5oi354K55Ye75Y+z5LiK6KeS5YiG5LqrXG4gICAgICovXG4gICAgb25TaGFyZUFwcE1lc3NhZ2U6IGZ1bmN0aW9uICgpIHtcbiAgXG4gICAgfVxuICB9KSJdfQ==
