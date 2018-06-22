//app.js
let projectService=require('./service/projectRequest.js')
App({
  onLaunch:function(){
   //this.getUserInfo()
   if(!wx.getStorageSync('openId')){
    let wxLogin=this.wxPromisify(wx.login)
     if(this.globalData.encryption || this.globalData.needUserInfo){
      wxLogin().then(res=>{
        this.globalData.code=res.code
      })
     }else{
      wxLogin().then(async (res)=>{
        this.globalData.code=res.code
        let param={
          code:res.code
        }
        let result=await projectService.getOpenId({params:param})
        this.globalData.openId=result.data.openid
        wx.setStorageSync('openId', result.data.openid)

      })
     }
   }
   
  },
  // 获取用户信息
  getUserInfo:function(){
    let that=this
    wx.getSetting({
      success:function(res){
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success:(res) => {
              that.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              if (that.userInfoReadyCallback) {
                that.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  // session校验，登录授权
  checkSession:function(param,userInfo){
    let that=this
    wx.checkSession({
      success:function(){
        that.setUserInfo(param,userInfo)
      },
      fail:()=>{
        let wxLogin=app.wxPromisify(wx.login)
        wxLogin().then((res)=>{
          wx.getUserInfo({
            success:function(res){
              that.setUserInfo(param,res.userInfo)
            }
          })
        })
      }
    })
  },
  setUserInfo:async function(param,userInfo){
    let result=await projectService.getOpenId({params:param})
    app.globalData.openId=result.data.openid
    app.globalData.userInfo =userInfo
    wx.setStorageSync('userInfo', userInfo)
    wx.setStorageSync('openId', result.data.openid)
    wx.navigateBack()
  },
  // es6
  wxPromisify: function (fn) {
    return function (obj = {}) {
      return new Promise((resolve, reject) => {
        obj.success = function (res) {
          resolve(res)
        }
        obj.fail = function (res) {
          reject(res)
        }
        fn(obj)
      })
    }
  },
  /**
   * 全局变量
   * @param {boolean} encryption 是否需要多端判定为同一用户
   * @param {boolean} needUserInfo是否需要用户头像，名称
   */
  globalData: {
    needUserInfo:true,
    encryption:true,
    openId:null,
    userInfo: null,
    code:''
  }
})