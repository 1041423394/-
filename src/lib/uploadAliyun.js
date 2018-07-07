const uploadOss = function(param) {
    if (!param.filePath) {
        wx.showModal({
            title: '路径错误',
            content: '请重试',
            showCancel: false,
        })
        return;
    }
    const aliyunFileKey = param.dir + param.filePath.replace('wxfile://', '');

    const aliyunServerURL = ''; //上传阿里云的地址
    const accessid = param.accessid;
    const policy = param.policy;
    const signature = param.signature;
    wx.uploadFile({
        url: aliyunServerURL,
        filePath: param.filePath,
        name: 'file',
        formData: {
            'key': aliyunFileKey,
            'policy': policy,
            'OSSAccessKeyId': accessid,
            'signature': signature,
            'success_action_status': '200',
        },
        success: function(res) {
            if (res.statusCode != 200) {
                if (param.fail) {
                    param.fail(res)
                }
                return;
            }
            if (param.success) {
                param.success(aliyunFileKey);
            }
        },
        fail: function(err) {
            err.wxaddinfo = aliyunServerURL;
            if (param.fail) {
                param.fail(err)
            }
        },
    })
}

module.exports = uploadOss;