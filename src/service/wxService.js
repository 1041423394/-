var wxLogin = app.wxPromisify(wx.login);
var wxGetUserInfo = app.wxPromisify(wx.getUserInfo);
var wxChooseImage=app.wxPromisify(wx.chooseImage);
var wxStartRecord = app.wxPromisify(wx.startRecord);
var wxuploadFile = app.wxPromisify(wx.uploadFile);

module.exports = {
  wxLogin: wxLogin,
  wxGetUserInfo: wxGetUserInfo,
  wxChooseImage: wxChooseImage,
  wxStartRecord: wxStartRecord,
  wxuploadFile: wxuploadFile
}