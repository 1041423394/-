let projectService=require('../../service/projectRequest.js')
const app = getApp()

Page({
  data: {
    userInfo: {},
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  /**
   * 数据初始化
   */
  initQuery:async function(){
    let param={
      answer_right_num:3
    }
    let result=await projectService.answerRight({params:param})
      console.log(result.data)
  },
  onLoad: function () {
    this.initQuery()
  }
})


