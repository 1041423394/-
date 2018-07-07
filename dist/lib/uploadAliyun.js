'use strict';

var uploadOss = function uploadOss(param) {
    if (!param.filePath) {
        wx.showModal({
            title: '路径错误',
            content: '请重试',
            showCancel: false
        });
        return;
    }
    var aliyunFileKey = param.dir + param.filePath.replace('wxfile://', '');

    var aliyunServerURL = ''; //上传阿里云的地址
    var accessid = param.accessid;
    var policy = param.policy;
    var signature = param.signature;
    wx.uploadFile({
        url: aliyunServerURL,
        filePath: param.filePath,
        name: 'file',
        formData: {
            'key': aliyunFileKey,
            'policy': policy,
            'OSSAccessKeyId': accessid,
            'signature': signature,
            'success_action_status': '200'
        },
        success: function success(res) {
            if (res.statusCode != 200) {
                if (param.fail) {
                    param.fail(res);
                }
                return;
            }
            if (param.success) {
                param.success(aliyunFileKey);
            }
        },
        fail: function fail(err) {
            err.wxaddinfo = aliyunServerURL;
            if (param.fail) {
                param.fail(err);
            }
        }
    });
};

module.exports = uploadOss;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi91cGxvYWRBbGl5dW4uanMiXSwibmFtZXMiOlsidXBsb2FkT3NzIiwicGFyYW0iLCJmaWxlUGF0aCIsInd4Iiwic2hvd01vZGFsIiwidGl0bGUiLCJjb250ZW50Iiwic2hvd0NhbmNlbCIsImFsaXl1bkZpbGVLZXkiLCJkaXIiLCJyZXBsYWNlIiwiYWxpeXVuU2VydmVyVVJMIiwiYWNjZXNzaWQiLCJwb2xpY3kiLCJzaWduYXR1cmUiLCJ1cGxvYWRGaWxlIiwidXJsIiwibmFtZSIsImZvcm1EYXRhIiwic3VjY2VzcyIsInJlcyIsInN0YXR1c0NvZGUiLCJmYWlsIiwiZXJyIiwid3hhZGRpbmZvIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFNQSxZQUFZLFNBQVpBLFNBQVksQ0FBU0MsS0FBVCxFQUFnQjtBQUM5QixRQUFJLENBQUNBLE1BQU1DLFFBQVgsRUFBcUI7QUFDakJDLFdBQUdDLFNBQUgsQ0FBYTtBQUNUQyxtQkFBTyxNQURFO0FBRVRDLHFCQUFTLEtBRkE7QUFHVEMsd0JBQVk7QUFISCxTQUFiO0FBS0E7QUFDSDtBQUNELFFBQU1DLGdCQUFnQlAsTUFBTVEsR0FBTixHQUFZUixNQUFNQyxRQUFOLENBQWVRLE9BQWYsQ0FBdUIsV0FBdkIsRUFBb0MsRUFBcEMsQ0FBbEM7O0FBRUEsUUFBTUMsa0JBQWtCLEVBQXhCLENBWDhCLENBV0Y7QUFDNUIsUUFBTUMsV0FBV1gsTUFBTVcsUUFBdkI7QUFDQSxRQUFNQyxTQUFTWixNQUFNWSxNQUFyQjtBQUNBLFFBQU1DLFlBQVliLE1BQU1hLFNBQXhCO0FBQ0FYLE9BQUdZLFVBQUgsQ0FBYztBQUNWQyxhQUFLTCxlQURLO0FBRVZULGtCQUFVRCxNQUFNQyxRQUZOO0FBR1ZlLGNBQU0sTUFISTtBQUlWQyxrQkFBVTtBQUNOLG1CQUFPVixhQUREO0FBRU4sc0JBQVVLLE1BRko7QUFHTiw4QkFBa0JELFFBSFo7QUFJTix5QkFBYUUsU0FKUDtBQUtOLHFDQUF5QjtBQUxuQixTQUpBO0FBV1ZLLGlCQUFTLGlCQUFTQyxHQUFULEVBQWM7QUFDbkIsZ0JBQUlBLElBQUlDLFVBQUosSUFBa0IsR0FBdEIsRUFBMkI7QUFDdkIsb0JBQUlwQixNQUFNcUIsSUFBVixFQUFnQjtBQUNackIsMEJBQU1xQixJQUFOLENBQVdGLEdBQVg7QUFDSDtBQUNEO0FBQ0g7QUFDRCxnQkFBSW5CLE1BQU1rQixPQUFWLEVBQW1CO0FBQ2ZsQixzQkFBTWtCLE9BQU4sQ0FBY1gsYUFBZDtBQUNIO0FBQ0osU0FyQlM7QUFzQlZjLGNBQU0sY0FBU0MsR0FBVCxFQUFjO0FBQ2hCQSxnQkFBSUMsU0FBSixHQUFnQmIsZUFBaEI7QUFDQSxnQkFBSVYsTUFBTXFCLElBQVYsRUFBZ0I7QUFDWnJCLHNCQUFNcUIsSUFBTixDQUFXQyxHQUFYO0FBQ0g7QUFDSjtBQTNCUyxLQUFkO0FBNkJILENBNUNEOztBQThDQUUsT0FBT0MsT0FBUCxHQUFpQjFCLFNBQWpCIiwiZmlsZSI6ImxpYi91cGxvYWRBbGl5dW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB1cGxvYWRPc3MgPSBmdW5jdGlvbihwYXJhbSkge1xuICAgIGlmICghcGFyYW0uZmlsZVBhdGgpIHtcbiAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICAgIHRpdGxlOiAn6Lev5b6E6ZSZ6K+vJyxcbiAgICAgICAgICAgIGNvbnRlbnQ6ICfor7fph43or5UnLFxuICAgICAgICAgICAgc2hvd0NhbmNlbDogZmFsc2UsXG4gICAgICAgIH0pXG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgYWxpeXVuRmlsZUtleSA9IHBhcmFtLmRpciArIHBhcmFtLmZpbGVQYXRoLnJlcGxhY2UoJ3d4ZmlsZTovLycsICcnKTtcblxuICAgIGNvbnN0IGFsaXl1blNlcnZlclVSTCA9ICcnOyAvL+S4iuS8oOmYv+mHjOS6keeahOWcsOWdgFxuICAgIGNvbnN0IGFjY2Vzc2lkID0gcGFyYW0uYWNjZXNzaWQ7XG4gICAgY29uc3QgcG9saWN5ID0gcGFyYW0ucG9saWN5O1xuICAgIGNvbnN0IHNpZ25hdHVyZSA9IHBhcmFtLnNpZ25hdHVyZTtcbiAgICB3eC51cGxvYWRGaWxlKHtcbiAgICAgICAgdXJsOiBhbGl5dW5TZXJ2ZXJVUkwsXG4gICAgICAgIGZpbGVQYXRoOiBwYXJhbS5maWxlUGF0aCxcbiAgICAgICAgbmFtZTogJ2ZpbGUnLFxuICAgICAgICBmb3JtRGF0YToge1xuICAgICAgICAgICAgJ2tleSc6IGFsaXl1bkZpbGVLZXksXG4gICAgICAgICAgICAncG9saWN5JzogcG9saWN5LFxuICAgICAgICAgICAgJ09TU0FjY2Vzc0tleUlkJzogYWNjZXNzaWQsXG4gICAgICAgICAgICAnc2lnbmF0dXJlJzogc2lnbmF0dXJlLFxuICAgICAgICAgICAgJ3N1Y2Nlc3NfYWN0aW9uX3N0YXR1cyc6ICcyMDAnLFxuICAgICAgICB9LFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgIGlmIChyZXMuc3RhdHVzQ29kZSAhPSAyMDApIHtcbiAgICAgICAgICAgICAgICBpZiAocGFyYW0uZmFpbCkge1xuICAgICAgICAgICAgICAgICAgICBwYXJhbS5mYWlsKHJlcylcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHBhcmFtLnN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICBwYXJhbS5zdWNjZXNzKGFsaXl1bkZpbGVLZXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBmYWlsOiBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgIGVyci53eGFkZGluZm8gPSBhbGl5dW5TZXJ2ZXJVUkw7XG4gICAgICAgICAgICBpZiAocGFyYW0uZmFpbCkge1xuICAgICAgICAgICAgICAgIHBhcmFtLmZhaWwoZXJyKVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgIH0pXG59XG5cbm1vZHVsZS5leHBvcnRzID0gdXBsb2FkT3NzOyJdfQ==
