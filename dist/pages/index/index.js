var regeneratorRuntime = require("../../lib/runtime.js");'use strict';

Page({
  /**
   * 页面的初始数据
   */
  data: {},
  // 模块对应页面
  tapHandle: function taohandle(e) {
    var src = e.currentTarget.dataset.src;
    wx.navigateTo({
      url: '../' + src + '/' + src
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function onLoad(options) {
    let wxUser=wx.getStorageSync('wxUser')
    if(!wxUser){
      wx.navigateTo({
        url: '../login/login',
       
      })
    }
  },
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
  onShareAppMessage: function onShareAppMessage() {
    return {
      title: '小程序常用组件二次封装，开箱即用',
      path: '/page/index/index',
      imageUrl: '../../images/indexShare.png'
    };
  }
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzL2luZGV4L2luZGV4LmpzIl0sIm5hbWVzIjpbIlBhZ2UiLCJkYXRhIiwidGFvaGFuZGxlIiwiZSIsInNyYyIsImN1cnJldFRhcmdldCIsImRhdGFzZXQiLCJ3eCIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJvbkxvYWQiLCJvcHRpb25zIiwib25SZWFkeSIsIm9uSGlkZSIsIm9uVW5sb2FkIiwib25QdWxsRG93blJlZnJlc2giLCJvblJlYWNoQm90dG9tIiwib25TaGFyZUFwcE1lc3NhZ2UiLCJ0aXRsZSIsInBhdGgiLCJpbWFnZVVybCJdLCJtYXBwaW5ncyI6Ijs7QUFBQUEsS0FBSztBQUNIOzs7QUFHQUMsUUFBTSxFQUpIO0FBTUg7QUFDQUMsYUFBVSxtQkFBVUMsQ0FBVixFQUFZO0FBQ3BCLFFBQUlDLE1BQUlELEVBQUVFLFlBQUYsQ0FBZUMsT0FBZixDQUF1QkYsR0FBL0I7QUFDQUcsT0FBR0MsVUFBSCxDQUFjO0FBQ1pDLFdBQUssT0FBS0wsR0FBTCxHQUFTLEdBQVQsR0FBYUE7QUFETixLQUFkO0FBR0QsR0FaRTtBQWFIOzs7QUFHQU0sVUFBUSxnQkFBVUMsT0FBVixFQUFtQixDQUMxQixDQWpCRTtBQWtCSDs7O0FBR0FDLFdBQVMsbUJBQVksQ0FFcEIsQ0F2QkU7QUF3Qkg7OztBQUdBQyxVQUFRLGtCQUFZLENBRW5CLENBN0JFO0FBOEJIOzs7QUFHQUMsWUFBVSxvQkFBWSxDQUVyQixDQW5DRTtBQW9DSDs7O0FBR0FDLHFCQUFtQiw2QkFBWSxDQUU5QixDQXpDRTtBQTBDSDs7O0FBR0FDLGlCQUFlLHlCQUFZLENBRTFCLENBL0NFO0FBZ0RIOzs7QUFHQUMscUJBQW1CLDZCQUFZO0FBQzdCLFdBQU87QUFDTEMsYUFBTyxrQkFERjtBQUVMQyxZQUFNLG1CQUZEO0FBR0xDLGdCQUFTO0FBSEosS0FBUDtBQUtEO0FBekRFLENBQUwiLCJmaWxlIjoicGFnZXMvaW5kZXgvaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJQYWdlKHtcbiAgLyoqXG4gICAqIOmhtemdoueahOWIneWni+aVsOaNrlxuICAgKi9cbiAgZGF0YToge1xuICB9LFxuICAvLyDmqKHlnZflr7nlupTpobXpnaJcbiAgdGFvaGFuZGxlOmZ1bmN0aW9uIChlKXtcbiAgICBsZXQgc3JjPWUuY3VycmV0VGFyZ2V0LmRhdGFzZXQuc3JjXG4gICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICB1cmw6ICcuLycrc3JjKycvJytzcmNcbiAgICB9KVxuICB9LFxuICAvKipcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLliqDovb1cbiAgICovXG4gIG9uTG9hZDogZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgfSxcbiAgLyoqXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5Yid5qyh5riy5p+T5a6M5oiQXG4gICAqL1xuICBvblJlYWR5OiBmdW5jdGlvbiAoKSB7XG5cbiAgfSxcbiAgLyoqXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i6ZqQ6JePXG4gICAqL1xuICBvbkhpZGU6IGZ1bmN0aW9uICgpIHtcblxuICB9LFxuICAvKipcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLljbjovb1cbiAgICovXG4gIG9uVW5sb2FkOiBmdW5jdGlvbiAoKSB7XG5cbiAgfSxcbiAgLyoqXG4gICAqIOmhtemdouebuOWFs+S6i+S7tuWkhOeQhuWHveaVsC0t55uR5ZCs55So5oi35LiL5ouJ5Yqo5L2cXG4gICAqL1xuICBvblB1bGxEb3duUmVmcmVzaDogZnVuY3Rpb24gKCkge1xuXG4gIH0sXG4gIC8qKlxuICAgKiDpobXpnaLkuIrmi4nop6blupXkuovku7bnmoTlpITnkIblh73mlbBcbiAgICovXG4gIG9uUmVhY2hCb3R0b206IGZ1bmN0aW9uICgpIHtcblxuICB9LFxuICAvKipcbiAgICog55So5oi354K55Ye75Y+z5LiK6KeS5YiG5LqrXG4gICAqL1xuICBvblNoYXJlQXBwTWVzc2FnZTogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB7XG4gICAgICB0aXRsZTogJ+Wwj+eoi+W6j+W4uOeUqOe7hOS7tuS6jOasoeWwgeijhe+8jOW8gOeuseWNs+eUqCcsXG4gICAgICBwYXRoOiAnL3BhZ2UvaW5kZXgvaW5kZXgnLFxuICAgICAgaW1hZ2VVcmw6Jy4uLy4uL2ltYWdlcy9pbmRleFNoYXJlLnBuZydcbiAgICB9XG4gIH1cbn0pXG5cbiJdfQ==
