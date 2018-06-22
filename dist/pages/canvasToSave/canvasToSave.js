var regeneratorRuntime = require("../../lib/runtime.js");"use strict";
let app=getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    hiddenCanvas:true,
    saveStatus:true
  },
  drawPhoto(bg,logo) {
    var that = this;
    that.setData({
      hiddenCanvas: false
    })
    const ctx = wx.createCanvasContext('shareCanvas')

      // 底图
      ctx.drawImage(bg, 0, 0, 354, 474)

      // 用户头像
      ctx.save()
      ctx.arc(((354 - 80) / 2 + 40), 60, 40, 0, 2 * Math.PI)
      ctx.clip()
      ctx.drawImage(logo, (354 - 80) / 2, 20, 80, 80)
      ctx.restore()
      ctx.strokeStyle = 'rgba(255,255,255,0)'
      // 昵称
      ctx.setTextAlign('center')
      ctx.setFillStyle('#F3AD39')
      ctx.setFontSize(21)
      ctx.fillText(that.data.userInfo.nickName, 354 / 2, 125)
       // 段位
       ctx.setFillStyle('#FFD700')
       ctx.setTextAlign('center')
       ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
       ctx.shadowOffsetX = 0;
       ctx.shadowOffsetY = 4;
       ctx.shadowBlur = 10;
       ctx.setFontSize(32)
       ctx.fillText('Author：fengml', 354 / 2, 215)
       

      //结果 
      ctx.setFillStyle('#333')
      ctx.setFontSize(18)
      ctx.setTextAlign('left')
      ctx.fillText('读书明理做人不作秀，登科治国做', 20, 260)
      ctx.fillText('事不做官', 20, 290)

     

      ctx.stroke()
      ctx.draw(true, function () {
        that.setData({
          hiddenCanvas: true
        })
        const wxCanvasToTempFilePath = app.wxPromisify(wx.canvasToTempFilePath)
        const wxSaveImageToPhotosAlbum = app.wxPromisify(wx.saveImageToPhotosAlbum)
        wxCanvasToTempFilePath({
          canvasId: 'shareCanvas'
        }, this).then(res => {
          return wxSaveImageToPhotosAlbum({
            filePath: res.tempFilePath
          })
        }, err => {
          that.setData({
            saveStatus: true
          })
          wx.getSetting({
            success(res) {
              if (!res.authSetting['scope.writePhotosAlbum']) {
                wx.openSetting({
                  success: function (res) {
                    wx.showModal({
                      title: 'wechat-frame',
                      content: '如未提示保存成功，请重新点击保存',
                      showCancel: false,
                      confirmText: '知道了'

                    })
                  },
                  fail: function () {
                    wx.showModal({
                      title: 'wechat-frame',
                      content: '海报保存失败，请重新尝试',
                      showCancel: false,
                      confirmText: '知道了'
                    })
                  }
                })
              }
            }
          })

        }).then(res => {
          that.setData({
            saveStatus: true
          })
          wx.hideLoading()
          wx.showModal({
            title: 'wechat-frame',
            content: '图片已保存至系统相册了',
            showCancel: false,
            confirmText: '知道了'

          })
        }, err => {
          that.setData({
            saveStatus: true
          })
          wx.showModal({
            title: 'wechat-frame',
            content: '图片保存失败',
            showCancel: false,
            confirmText: '知道了'
          })
        })
      })
  },
  saveHandle() {
    if (!this.data.saveStatus) {
      return
    }
    wx.showLoading({
      title: '海报生成中。。。',
    })
    this.data.saveStatus = false
    var that = this;
    const getImageInfo = app.wxPromisify(wx.getImageInfo)

    Promise.all([
      getImageInfo({ src: 'https://wechat.fmlcoder.com/images/share.png' }), 
      getImageInfo({ src: that.data.userInfo.avatarUrl})
    ]).then((result) => {
      that.drawPhoto(result[0].path, result[1].path)            
    }).catch((error) => {
      console.log(error)
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function onLoad(options) {
    let wxUser=wx.getStorageSync('wxUser')
    this.setData({
      userInfo:wxUser
    })
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
  onShareAppMessage: function onShareAppMessage() {}
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzL2NhbnZhc1RvU2F2ZS9jYW52YXNUb1NhdmUuanMiXSwibmFtZXMiOlsiUGFnZSIsImRhdGEiLCJvbkxvYWQiLCJvcHRpb25zIiwib25SZWFkeSIsIm9uSGlkZSIsIm9uVW5sb2FkIiwib25QdWxsRG93blJlZnJlc2giLCJvblJlYWNoQm90dG9tIiwib25TaGFyZUFwcE1lc3NhZ2UiXSwibWFwcGluZ3MiOiI7O0FBQUFBLEtBQUs7QUFDRDs7O0FBR0FDLFFBQU0sRUFKTDtBQU1EOzs7QUFHQUMsVUFBUSxnQkFBVUMsT0FBVixFQUFtQixDQUMxQixDQVZBO0FBV0Q7OztBQUdBQyxXQUFTLG1CQUFZLENBRXBCLENBaEJBO0FBaUJEOzs7QUFHQUMsVUFBUSxrQkFBWSxDQUVuQixDQXRCQTtBQXVCRDs7O0FBR0FDLFlBQVUsb0JBQVksQ0FFckIsQ0E1QkE7QUE2QkQ7OztBQUdBQyxxQkFBbUIsNkJBQVksQ0FFOUIsQ0FsQ0E7QUFtQ0Q7OztBQUdBQyxpQkFBZSx5QkFBWSxDQUUxQixDQXhDQTtBQXlDRDs7O0FBR0FDLHFCQUFtQiw2QkFBWSxDQUU5QjtBQTlDQSxDQUFMIiwiZmlsZSI6InBhZ2VzL2NhbnZhc1RvU2F2ZS9jYW52YXNUb1NhdmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJQYWdlKHtcbiAgICAvKipcbiAgICAgKiDpobXpnaLnmoTliJ3lp4vmlbDmja5cbiAgICAgKi9cbiAgICBkYXRhOiB7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdouWKoOi9vVxuICAgICAqL1xuICAgIG9uTG9hZDogZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5Yid5qyh5riy5p+T5a6M5oiQXG4gICAgICovXG4gICAgb25SZWFkeTogZnVuY3Rpb24gKCkge1xuICBcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i6ZqQ6JePXG4gICAgICovXG4gICAgb25IaWRlOiBmdW5jdGlvbiAoKSB7XG4gIFxuICAgIH0sXG4gICAgLyoqXG4gICAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLljbjovb1cbiAgICAgKi9cbiAgICBvblVubG9hZDogZnVuY3Rpb24gKCkge1xuICBcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIOmhtemdouebuOWFs+S6i+S7tuWkhOeQhuWHveaVsC0t55uR5ZCs55So5oi35LiL5ouJ5Yqo5L2cXG4gICAgICovXG4gICAgb25QdWxsRG93blJlZnJlc2g6IGZ1bmN0aW9uICgpIHtcbiAgXG4gICAgfSxcbiAgICAvKipcbiAgICAgKiDpobXpnaLkuIrmi4nop6blupXkuovku7bnmoTlpITnkIblh73mlbBcbiAgICAgKi9cbiAgICBvblJlYWNoQm90dG9tOiBmdW5jdGlvbiAoKSB7XG4gIFxuICAgIH0sXG4gICAgLyoqXG4gICAgICog55So5oi354K55Ye75Y+z5LiK6KeS5YiG5LqrXG4gICAgICovXG4gICAgb25TaGFyZUFwcE1lc3NhZ2U6IGZ1bmN0aW9uICgpIHtcbiAgXG4gICAgfVxuICB9KSJdfQ==
