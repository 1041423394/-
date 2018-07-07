var regeneratorRuntime = require("../../lib/runtime.js");"use strict";

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var regeneratorRuntime = require("../../lib/runtime.js");
var filterService = require('../../service/filterService');
var app = getApp();
Page({
    data: {
        onshow: false,
        loading: 0,
        nullContent: 0, //是否有地址信息
        downUp: 0, //上啦加载
        canAjax: true,
        pageSize: 10,
        dataList: [],
        delBtnWidth: 120 //删除按钮宽度单位（rpx）

    },
    //获取元素自适应后的实际宽度
    getEleWidth: function getEleWidth(w) {
        var real = 0;
        try {
            var res = wx.getSystemInfoSync().windowWidth;
            var scale = 750 / 2 / (w / 2); //以宽度750px设计稿做宽度的自适应
            real = Math.floor(res / scale);
            return real;
        } catch (e) {
            return false;
        }
    },
    // 右滑删除按钮的位置
    initEleWidth: function initEleWidth() {
        var delBtnWidth = this.getEleWidth(this.data.delBtnWidth);
        this.setData({
            delBtnWidth: delBtnWidth
        });
    },
    //  触摸左移开始
    touchS: function touchS(e) {
        if (e.touches.length == 1) {
            this.setData({
                startX: e.touches[0].clientX
            });
        }
    },
    //触摸左移移动
    touchM: function touchM(e) {
        var index = e.currentTarget.dataset.index;
        if (e.touches.length == 1) {
            var moveX = e.touches[0].clientX;
            var disX = this.data.startX - moveX;
            var delBtnWidth = this.data.delBtnWidth;
            var left = "";
            if (disX == 0 || disX < 0) {
                //如果移动距离小于等于0，container位置不变
                left = "margin-left:0px";
            } else if (disX > 0) {
                //移动距离大于0，container left值等于手指移动距离
                left = "margin-left:-" + disX + "px";
                if (disX >= delBtnWidth) {
                    left = "left:-" + delBtnWidth + "px";
                }
            }
            var list = this.data.dataList;
            if (index != "" && index != null) {
                list[parseInt(index)].left = left;
                this.setData({
                    dataList: list
                });
            }
        }
    },
    //触摸左移结束
    touchE: function touchE(e) {
        var index = e.currentTarget.dataset.index;
        if (e.changedTouches.length == 1) {
            var endX = e.changedTouches[0].clientX;
            var disX = this.data.startX - endX;
            var delBtnWidth = this.data.delBtnWidth;
            //如果距离小于删除按钮的1/2，不显示删除按钮
            var left = disX > delBtnWidth / 2 ? "margin-left:-" + delBtnWidth + "px" : "margin-left:0px";
            var list = this.data.dataList;
            if (index !== "" && index != null) {
                list[parseInt(index)].left = left;
                this.setData({
                    dataList: list
                });
            }
        }
    },
    //列表初始化
    initQuery: function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
            var param, result;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            if (this.data.canAjax) {
                                _context.next = 2;
                                break;
                            }

                            return _context.abrupt("return");

                        case 2:
                            this.data.canAjax = false;
                            param = {
                                pageSize: this.data.pageSize,
                                p: this.data.p
                            };
                            _context.next = 6;
                            return filterService.getAddrList({ params: param });

                        case 6:
                            result = _context.sent;

                            this.initData(result);

                        case 8:
                        case "end":
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));

        function initQuery() {
            return _ref.apply(this, arguments);
        }

        return initQuery;
    }(),
    initData: function initData(res) {
        this.data.canAjax = true;
        this.setData({
            downUp: 0,
            loading: 1
        });
        wx.stopPullDownRefresh();
        var queryData = res.data; //获取请求的数据
        // 没数据的情况
        if (queryData.length == 0) {
            this.setData({
                downUp: 2
            });
        }
        for (var i = 0; i < queryData.length; i++) {
            this.data.dataList.push(queryData[i]);
        }

        this.setData({
            dataList: this.data.dataList
        });
        // 没有任何数据不包括上拉加载
        if (this.data.dataList.length == 0) {
            this.setData({
                downUp: 0,
                nullContent: 0

            });
        } else {
            this.setData({
                nullContent: 1
            });
        }
    },
    // 删除
    addressDelete: function addressDelete(e) {
        var that = this;
        var address_id = e.currentTarget.dataset.addrid;
        var addrIndex = e.currentTarget.dataset.index;
        var dataList = this.data.dataList;
        var wxShowModal = app.wxPromisify(wx.showModal);
        wxShowModal({
            title: app.globalData.projectName,
            content: '确定删除当前地址吗？'
        }).then(function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(res) {
                var param;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                if (!res.confirm) {
                                    _context2.next = 8;
                                    break;
                                }

                                param = {
                                    address_id: address_id
                                };
                                _context2.next = 4;
                                return filterService.deleteAddr({ params: param });

                            case 4:
                                wx.hideLoading();
                                wx.showToast({
                                    title: '删除成功',
                                    icon: 'success'
                                });
                                dataList.splice(addrIndex, 1);
                                //更新列表的状态  
                                that.setData({
                                    dataList: dataList
                                });

                            case 8:
                            case "end":
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            return function (_x) {
                return _ref2.apply(this, arguments);
            };
        }());
    },

    // 编辑
    editAddress: function editAddress(e) {
        var addrIndex = e.currentTarget.dataset.index;
        var editAddr = this.data.dataList[addrIndex];
        var address_id = e.currentTarget.dataset.id;
        wx.setStorageSync('editAddr', editAddr); //地址编辑
        wx.navigateTo({
            url: '../addrEdit/addrEdit?address_id=' + address_id
        });
    },

    // 新增地址
    newAddress: function newAddress(e) {
        wx.navigateTo({
            url: '../addrEdit/addrEdit'
        });
    },

    // 获取当前地址
    getAddress: function getAddress(e) {
        var address_id = e.currentTarget.dataset.id;
        console.log(address_id);
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function onLoad(options) {
        this.initEleWidth();

        if (!this.data.onshow) {
            this.initQuery();
        }
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function onShow() {
        var pages = getCurrentPages();
        var currPage = pages[pages.length - 1];
        this.setData({ //将携带的参数赋值
            onshow: currPage.data.onshow
        });
        if (this.data.onshow) {
            this.setData({
                pageSize: 10,
                p: 1,
                dataList: []
            });
            this.initQuery();
        }
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function onPullDownRefresh() {
        this.setData({
            pageSize: 10,
            p: 1,
            dataList: []
        });
        this.initQuery();
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function onReachBottom() {
        if (this.data.dataList.length == 0) {
            return;
        }
        var _this = this;
        if (this.data.downUp == 2 || this.data.dataList.length % this.data.pageSize > 0) {
            //没数据了，不用再请求了
            this.setData({
                downUp: 2
            });
            return;
        }
        var pageNum = this.data.dataList.length / this.data.pageSize + 1;
        this.setData({
            downUp: 1,
            p: pageNum
        });

        this.initQuery();
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function onShareAppMessage(res) {}
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzL2FkZHJMaXN0L2FkZHJMaXN0LmpzIl0sIm5hbWVzIjpbInJlZ2VuZXJhdG9yUnVudGltZSIsInJlcXVpcmUiLCJmaWx0ZXJTZXJ2aWNlIiwiYXBwIiwiZ2V0QXBwIiwiUGFnZSIsImRhdGEiLCJvbnNob3ciLCJsb2FkaW5nIiwibnVsbENvbnRlbnQiLCJkb3duVXAiLCJjYW5BamF4IiwicGFnZVNpemUiLCJkYXRhTGlzdCIsImRlbEJ0bldpZHRoIiwiZ2V0RWxlV2lkdGgiLCJ3IiwicmVhbCIsInJlcyIsInd4IiwiZ2V0U3lzdGVtSW5mb1N5bmMiLCJ3aW5kb3dXaWR0aCIsInNjYWxlIiwiTWF0aCIsImZsb29yIiwiZSIsImluaXRFbGVXaWR0aCIsInNldERhdGEiLCJ0b3VjaFMiLCJ0b3VjaGVzIiwibGVuZ3RoIiwic3RhcnRYIiwiY2xpZW50WCIsInRvdWNoTSIsImluZGV4IiwiY3VycmVudFRhcmdldCIsImRhdGFzZXQiLCJtb3ZlWCIsImRpc1giLCJsZWZ0IiwibGlzdCIsInBhcnNlSW50IiwidG91Y2hFIiwiY2hhbmdlZFRvdWNoZXMiLCJlbmRYIiwiaW5pdFF1ZXJ5IiwicGFyYW0iLCJwIiwiZ2V0QWRkckxpc3QiLCJwYXJhbXMiLCJyZXN1bHQiLCJpbml0RGF0YSIsInN0b3BQdWxsRG93blJlZnJlc2giLCJxdWVyeURhdGEiLCJpIiwicHVzaCIsImFkZHJlc3NEZWxldGUiLCJ0aGF0IiwiYWRkcmVzc19pZCIsImFkZHJpZCIsImFkZHJJbmRleCIsInd4U2hvd01vZGFsIiwid3hQcm9taXNpZnkiLCJzaG93TW9kYWwiLCJ0aXRsZSIsImdsb2JhbERhdGEiLCJwcm9qZWN0TmFtZSIsImNvbnRlbnQiLCJ0aGVuIiwiY29uZmlybSIsImRlbGV0ZUFkZHIiLCJoaWRlTG9hZGluZyIsInNob3dUb2FzdCIsImljb24iLCJzcGxpY2UiLCJlZGl0QWRkcmVzcyIsImVkaXRBZGRyIiwiaWQiLCJzZXRTdG9yYWdlU3luYyIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJuZXdBZGRyZXNzIiwiZ2V0QWRkcmVzcyIsImNvbnNvbGUiLCJsb2ciLCJvbkxvYWQiLCJvcHRpb25zIiwib25TaG93IiwicGFnZXMiLCJnZXRDdXJyZW50UGFnZXMiLCJjdXJyUGFnZSIsIm9uUHVsbERvd25SZWZyZXNoIiwib25SZWFjaEJvdHRvbSIsIl90aGlzIiwicGFnZU51bSIsIm9uU2hhcmVBcHBNZXNzYWdlIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUEsSUFBSUEscUJBQXFCQyxRQUFRLHNCQUFSLENBQXpCO0FBQ0EsSUFBTUMsZ0JBQWdCRCxRQUFRLDZCQUFSLENBQXRCO0FBQ0EsSUFBSUUsTUFBTUMsUUFBVjtBQUNBQyxLQUFLO0FBQ0RDLFVBQU07QUFDRkMsZ0JBQVEsS0FETjtBQUVGQyxpQkFBUyxDQUZQO0FBR0ZDLHFCQUFhLENBSFgsRUFHYztBQUNoQkMsZ0JBQVEsQ0FKTixFQUlTO0FBQ1hDLGlCQUFTLElBTFA7QUFNRkMsa0JBQVUsRUFOUjtBQU9GQyxrQkFBVSxFQVBSO0FBUUZDLHFCQUFhLEdBUlgsQ0FRZTs7QUFSZixLQURMO0FBWUQ7QUFDQUMsaUJBQWEscUJBQVNDLENBQVQsRUFBWTtBQUNyQixZQUFJQyxPQUFPLENBQVg7QUFDQSxZQUFJO0FBQ0EsZ0JBQUlDLE1BQU1DLEdBQUdDLGlCQUFILEdBQXVCQyxXQUFqQztBQUNBLGdCQUFJQyxRQUFTLE1BQU0sQ0FBUCxJQUFhTixJQUFJLENBQWpCLENBQVosQ0FGQSxDQUVpQztBQUNqQ0MsbUJBQU9NLEtBQUtDLEtBQUwsQ0FBV04sTUFBTUksS0FBakIsQ0FBUDtBQUNBLG1CQUFPTCxJQUFQO0FBQ0gsU0FMRCxDQUtFLE9BQU9RLENBQVAsRUFBVTtBQUNSLG1CQUFPLEtBQVA7QUFDSDtBQUNKLEtBdkJBO0FBd0JEO0FBQ0FDLGtCQUFjLHdCQUFXO0FBQ3JCLFlBQUlaLGNBQWMsS0FBS0MsV0FBTCxDQUFpQixLQUFLVCxJQUFMLENBQVVRLFdBQTNCLENBQWxCO0FBQ0EsYUFBS2EsT0FBTCxDQUFhO0FBQ1RiLHlCQUFhQTtBQURKLFNBQWI7QUFHSCxLQTlCQTtBQStCRDtBQUNBYyxZQUFRLGdCQUFTSCxDQUFULEVBQVk7QUFDaEIsWUFBSUEsRUFBRUksT0FBRixDQUFVQyxNQUFWLElBQW9CLENBQXhCLEVBQTJCO0FBQ3ZCLGlCQUFLSCxPQUFMLENBQWE7QUFDVEksd0JBQVFOLEVBQUVJLE9BQUYsQ0FBVSxDQUFWLEVBQWFHO0FBRFosYUFBYjtBQUdIO0FBQ0osS0F0Q0E7QUF1Q0Q7QUFDQUMsWUFBUSxnQkFBU1IsQ0FBVCxFQUFZO0FBQ2hCLFlBQUlTLFFBQVFULEVBQUVVLGFBQUYsQ0FBZ0JDLE9BQWhCLENBQXdCRixLQUFwQztBQUNBLFlBQUlULEVBQUVJLE9BQUYsQ0FBVUMsTUFBVixJQUFvQixDQUF4QixFQUEyQjtBQUN2QixnQkFBSU8sUUFBUVosRUFBRUksT0FBRixDQUFVLENBQVYsRUFBYUcsT0FBekI7QUFDQSxnQkFBSU0sT0FBTyxLQUFLaEMsSUFBTCxDQUFVeUIsTUFBVixHQUFtQk0sS0FBOUI7QUFDQSxnQkFBSXZCLGNBQWMsS0FBS1IsSUFBTCxDQUFVUSxXQUE1QjtBQUNBLGdCQUFJeUIsT0FBTyxFQUFYO0FBQ0EsZ0JBQUlELFFBQVEsQ0FBUixJQUFhQSxPQUFPLENBQXhCLEVBQTJCO0FBQUU7QUFDekJDLHVCQUFPLGlCQUFQO0FBQ0gsYUFGRCxNQUVPLElBQUlELE9BQU8sQ0FBWCxFQUFjO0FBQUU7QUFDbkJDLHVCQUFPLGtCQUFrQkQsSUFBbEIsR0FBeUIsSUFBaEM7QUFDQSxvQkFBSUEsUUFBUXhCLFdBQVosRUFBeUI7QUFDckJ5QiwyQkFBTyxXQUFXekIsV0FBWCxHQUF5QixJQUFoQztBQUNIO0FBQ0o7QUFDRCxnQkFBSTBCLE9BQU8sS0FBS2xDLElBQUwsQ0FBVU8sUUFBckI7QUFDQSxnQkFBSXFCLFNBQVMsRUFBVCxJQUFlQSxTQUFTLElBQTVCLEVBQWtDO0FBQzlCTSxxQkFBS0MsU0FBU1AsS0FBVCxDQUFMLEVBQXNCSyxJQUF0QixHQUE2QkEsSUFBN0I7QUFDQSxxQkFBS1osT0FBTCxDQUFhO0FBQ1RkLDhCQUFVMkI7QUFERCxpQkFBYjtBQUdIO0FBQ0o7QUFDSixLQS9EQTtBQWdFRDtBQUNBRSxZQUFRLGdCQUFTakIsQ0FBVCxFQUFZO0FBQ2hCLFlBQUlTLFFBQVFULEVBQUVVLGFBQUYsQ0FBZ0JDLE9BQWhCLENBQXdCRixLQUFwQztBQUNBLFlBQUlULEVBQUVrQixjQUFGLENBQWlCYixNQUFqQixJQUEyQixDQUEvQixFQUFrQztBQUM5QixnQkFBSWMsT0FBT25CLEVBQUVrQixjQUFGLENBQWlCLENBQWpCLEVBQW9CWCxPQUEvQjtBQUNBLGdCQUFJTSxPQUFPLEtBQUtoQyxJQUFMLENBQVV5QixNQUFWLEdBQW1CYSxJQUE5QjtBQUNBLGdCQUFJOUIsY0FBYyxLQUFLUixJQUFMLENBQVVRLFdBQTVCO0FBQ0E7QUFDQSxnQkFBSXlCLE9BQU9ELE9BQU94QixjQUFjLENBQXJCLEdBQXlCLGtCQUFrQkEsV0FBbEIsR0FBZ0MsSUFBekQsR0FBZ0UsaUJBQTNFO0FBQ0EsZ0JBQUkwQixPQUFPLEtBQUtsQyxJQUFMLENBQVVPLFFBQXJCO0FBQ0EsZ0JBQUlxQixVQUFVLEVBQVYsSUFBZ0JBLFNBQVMsSUFBN0IsRUFBbUM7QUFDL0JNLHFCQUFLQyxTQUFTUCxLQUFULENBQUwsRUFBc0JLLElBQXRCLEdBQTZCQSxJQUE3QjtBQUNBLHFCQUFLWixPQUFMLENBQWE7QUFDVGQsOEJBQVUyQjtBQURELGlCQUFiO0FBR0g7QUFDSjtBQUNKLEtBakZBO0FBa0ZEO0FBQ0FLO0FBQUEsMkVBQVc7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsZ0NBQ0YsS0FBS3ZDLElBQUwsQ0FBVUssT0FEUjtBQUFBO0FBQUE7QUFBQTs7QUFBQTs7QUFBQTtBQUlQLGlDQUFLTCxJQUFMLENBQVVLLE9BQVYsR0FBb0IsS0FBcEI7QUFDSW1DLGlDQUxHLEdBS0s7QUFDUmxDLDBDQUFVLEtBQUtOLElBQUwsQ0FBVU0sUUFEWjtBQUVSbUMsbUNBQUcsS0FBS3pDLElBQUwsQ0FBVXlDO0FBRkwsNkJBTEw7QUFBQTtBQUFBLG1DQVNZN0MsY0FBYzhDLFdBQWQsQ0FBMEIsRUFBRUMsUUFBUUgsS0FBVixFQUExQixDQVRaOztBQUFBO0FBU0hJLGtDQVRHOztBQVVQLGlDQUFLQyxRQUFMLENBQWNELE1BQWQ7O0FBVk87QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FBWDs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQSxPQW5GQztBQStGREMsY0FBVSxrQkFBU2pDLEdBQVQsRUFBYztBQUNwQixhQUFLWixJQUFMLENBQVVLLE9BQVYsR0FBb0IsSUFBcEI7QUFDQSxhQUFLZ0IsT0FBTCxDQUFhO0FBQ1RqQixvQkFBUSxDQURDO0FBRVRGLHFCQUFTO0FBRkEsU0FBYjtBQUlBVyxXQUFHaUMsbUJBQUg7QUFDQSxZQUFJQyxZQUFZbkMsSUFBSVosSUFBcEIsQ0FQb0IsQ0FPTTtBQUMxQjtBQUNBLFlBQUkrQyxVQUFVdkIsTUFBVixJQUFvQixDQUF4QixFQUEyQjtBQUN2QixpQkFBS0gsT0FBTCxDQUFhO0FBQ1RqQix3QkFBUTtBQURDLGFBQWI7QUFHSDtBQUNELGFBQUssSUFBSTRDLElBQUksQ0FBYixFQUFnQkEsSUFBSUQsVUFBVXZCLE1BQTlCLEVBQXNDd0IsR0FBdEMsRUFBMkM7QUFDdkMsaUJBQUtoRCxJQUFMLENBQVVPLFFBQVYsQ0FBbUIwQyxJQUFuQixDQUF3QkYsVUFBVUMsQ0FBVixDQUF4QjtBQUNIOztBQUVELGFBQUszQixPQUFMLENBQWE7QUFDTGQsc0JBQVUsS0FBS1AsSUFBTCxDQUFVTztBQURmLFNBQWI7QUFHSTtBQUNKLFlBQUksS0FBS1AsSUFBTCxDQUFVTyxRQUFWLENBQW1CaUIsTUFBbkIsSUFBNkIsQ0FBakMsRUFBb0M7QUFDaEMsaUJBQUtILE9BQUwsQ0FBYTtBQUNUakIsd0JBQVEsQ0FEQztBQUVURCw2QkFBYTs7QUFGSixhQUFiO0FBS0gsU0FORCxNQU1PO0FBQ0gsaUJBQUtrQixPQUFMLENBQWE7QUFDVGxCLDZCQUFhO0FBREosYUFBYjtBQUdIO0FBQ0osS0FoSUE7QUFpSUQ7QUFDQStDLGlCQWxJQyx5QkFrSWEvQixDQWxJYixFQWtJZ0I7QUFDYixZQUFJZ0MsT0FBTyxJQUFYO0FBQ0EsWUFBSUMsYUFBYWpDLEVBQUVVLGFBQUYsQ0FBZ0JDLE9BQWhCLENBQXdCdUIsTUFBekM7QUFDQSxZQUFJQyxZQUFZbkMsRUFBRVUsYUFBRixDQUFnQkMsT0FBaEIsQ0FBd0JGLEtBQXhDO0FBQ0EsWUFBSXJCLFdBQVcsS0FBS1AsSUFBTCxDQUFVTyxRQUF6QjtBQUNBLFlBQUlnRCxjQUFjMUQsSUFBSTJELFdBQUosQ0FBZ0IzQyxHQUFHNEMsU0FBbkIsQ0FBbEI7QUFDQUYsb0JBQVk7QUFDUkcsbUJBQU83RCxJQUFJOEQsVUFBSixDQUFlQyxXQURkO0FBRVJDLHFCQUFTO0FBRkQsU0FBWixFQUdHQyxJQUhIO0FBQUEsZ0ZBR1Esa0JBQWVsRCxHQUFmO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHFDQUNBQSxJQUFJbUQsT0FESjtBQUFBO0FBQUE7QUFBQTs7QUFFSXZCLHFDQUZKLEdBRVk7QUFDUlksZ0RBQVlBO0FBREosaUNBRlo7QUFBQTtBQUFBLHVDQUtNeEQsY0FBY29FLFVBQWQsQ0FBeUIsRUFBRXJCLFFBQVFILEtBQVYsRUFBekIsQ0FMTjs7QUFBQTtBQU1BM0IsbUNBQUdvRCxXQUFIO0FBQ0FwRCxtQ0FBR3FELFNBQUgsQ0FBYTtBQUNUUiwyQ0FBTyxNQURFO0FBRVRTLDBDQUFNO0FBRkcsaUNBQWI7QUFJQTVELHlDQUFTNkQsTUFBVCxDQUFnQmQsU0FBaEIsRUFBMkIsQ0FBM0I7QUFDSTtBQUNKSCxxQ0FBSzlCLE9BQUwsQ0FBYTtBQUNUZCw4Q0FBVUE7QUFERCxpQ0FBYjs7QUFiQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQUhSOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBc0JILEtBOUpBOztBQStKRDtBQUNBOEQsZUFoS0MsdUJBZ0tXbEQsQ0FoS1gsRUFnS2M7QUFDWCxZQUFJbUMsWUFBWW5DLEVBQUVVLGFBQUYsQ0FBZ0JDLE9BQWhCLENBQXdCRixLQUF4QztBQUNBLFlBQUkwQyxXQUFXLEtBQUt0RSxJQUFMLENBQVVPLFFBQVYsQ0FBbUIrQyxTQUFuQixDQUFmO0FBQ0EsWUFBSUYsYUFBYWpDLEVBQUVVLGFBQUYsQ0FBZ0JDLE9BQWhCLENBQXdCeUMsRUFBekM7QUFDQTFELFdBQUcyRCxjQUFILENBQWtCLFVBQWxCLEVBQThCRixRQUE5QixFQUpXLENBSTZCO0FBQ3hDekQsV0FBRzRELFVBQUgsQ0FBYztBQUNWQyxpQkFBSyxxQ0FBcUN0QjtBQURoQyxTQUFkO0FBR0gsS0F4S0E7O0FBeUtEO0FBQ0F1QixjQTFLQyxzQkEwS1V4RCxDQTFLVixFQTBLYTtBQUNWTixXQUFHNEQsVUFBSCxDQUFjO0FBQ1ZDLGlCQUFLO0FBREssU0FBZDtBQUdILEtBOUtBOztBQStLRDtBQUNBRSxjQWhMQyxzQkFnTFV6RCxDQWhMVixFQWdMYTtBQUNWLFlBQUlpQyxhQUFhakMsRUFBRVUsYUFBRixDQUFnQkMsT0FBaEIsQ0FBd0J5QyxFQUF6QztBQUNBTSxnQkFBUUMsR0FBUixDQUFZMUIsVUFBWjtBQUNILEtBbkxBOztBQW9MRDs7O0FBR0EyQixZQUFRLGdCQUFTQyxPQUFULEVBQWtCO0FBQ3RCLGFBQUs1RCxZQUFMOztBQUVBLFlBQUksQ0FBQyxLQUFLcEIsSUFBTCxDQUFVQyxNQUFmLEVBQXVCO0FBQ25CLGlCQUFLc0MsU0FBTDtBQUNIO0FBQ0osS0E3TEE7QUE4TEQ7OztBQUdBMEMsWUFBUSxrQkFBVztBQUNmLFlBQUlDLFFBQVFDLGlCQUFaO0FBQ0EsWUFBSUMsV0FBV0YsTUFBTUEsTUFBTTFELE1BQU4sR0FBZSxDQUFyQixDQUFmO0FBQ0EsYUFBS0gsT0FBTCxDQUFhLEVBQUU7QUFDWHBCLG9CQUFRbUYsU0FBU3BGLElBQVQsQ0FBY0M7QUFEYixTQUFiO0FBR0EsWUFBSSxLQUFLRCxJQUFMLENBQVVDLE1BQWQsRUFBc0I7QUFDbEIsaUJBQUtvQixPQUFMLENBQWE7QUFDVGYsMEJBQVUsRUFERDtBQUVUbUMsbUJBQUcsQ0FGTTtBQUdUbEMsMEJBQVU7QUFIRCxhQUFiO0FBS0EsaUJBQUtnQyxTQUFMO0FBQ0g7QUFFSixLQWhOQTs7QUFvTkQ7OztBQUdBOEMsdUJBQW1CLDZCQUFXO0FBQzFCLGFBQUtoRSxPQUFMLENBQWE7QUFDVGYsc0JBQVUsRUFERDtBQUVUbUMsZUFBRyxDQUZNO0FBR1RsQyxzQkFBVTtBQUhELFNBQWI7QUFLQSxhQUFLZ0MsU0FBTDtBQUNILEtBOU5BOztBQWdPRDs7O0FBR0ErQyxtQkFBZSx5QkFBVztBQUN0QixZQUFJLEtBQUt0RixJQUFMLENBQVVPLFFBQVYsQ0FBbUJpQixNQUFuQixJQUE2QixDQUFqQyxFQUFvQztBQUNoQztBQUNIO0FBQ0QsWUFBSStELFFBQVEsSUFBWjtBQUNBLFlBQUksS0FBS3ZGLElBQUwsQ0FBVUksTUFBVixJQUFvQixDQUFwQixJQUF5QixLQUFLSixJQUFMLENBQVVPLFFBQVYsQ0FBbUJpQixNQUFuQixHQUE0QixLQUFLeEIsSUFBTCxDQUFVTSxRQUF0QyxHQUFpRCxDQUE5RSxFQUFpRjtBQUFFO0FBQy9FLGlCQUFLZSxPQUFMLENBQWE7QUFDVGpCLHdCQUFRO0FBREMsYUFBYjtBQUdBO0FBQ0g7QUFDRCxZQUFJb0YsVUFBVSxLQUFLeEYsSUFBTCxDQUFVTyxRQUFWLENBQW1CaUIsTUFBbkIsR0FBNEIsS0FBS3hCLElBQUwsQ0FBVU0sUUFBdEMsR0FBaUQsQ0FBL0Q7QUFDQSxhQUFLZSxPQUFMLENBQWE7QUFDVGpCLG9CQUFRLENBREM7QUFFVHFDLGVBQUcrQztBQUZNLFNBQWI7O0FBS0EsYUFBS2pELFNBQUw7QUFDSCxLQXJQQTtBQXNQRDs7O0FBR0FrRCx1QkFBbUIsMkJBQVM3RSxHQUFULEVBQWMsQ0FFaEM7QUEzUEEsQ0FBTCIsImZpbGUiOiJwYWdlcy9hZGRyTGlzdC9hZGRyTGlzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciByZWdlbmVyYXRvclJ1bnRpbWUgPSByZXF1aXJlKFwiLi4vLi4vbGliL3J1bnRpbWUuanNcIik7XG5jb25zdCBmaWx0ZXJTZXJ2aWNlID0gcmVxdWlyZSgnLi4vLi4vc2VydmljZS9maWx0ZXJTZXJ2aWNlJylcbmxldCBhcHAgPSBnZXRBcHAoKVxuUGFnZSh7XG4gICAgZGF0YToge1xuICAgICAgICBvbnNob3c6IGZhbHNlLFxuICAgICAgICBsb2FkaW5nOiAwLFxuICAgICAgICBudWxsQ29udGVudDogMCwgLy/mmK/lkKbmnInlnLDlnYDkv6Hmga9cbiAgICAgICAgZG93blVwOiAwLCAvL+S4iuWVpuWKoOi9vVxuICAgICAgICBjYW5BamF4OiB0cnVlLFxuICAgICAgICBwYWdlU2l6ZTogMTAsXG4gICAgICAgIGRhdGFMaXN0OiBbXSxcbiAgICAgICAgZGVsQnRuV2lkdGg6IDEyMCAvL+WIoOmZpOaMiemSruWuveW6puWNleS9je+8iHJweO+8iVxuXG4gICAgfSxcbiAgICAvL+iOt+WPluWFg+e0oOiHqumAguW6lOWQjueahOWunumZheWuveW6plxuICAgIGdldEVsZVdpZHRoOiBmdW5jdGlvbih3KSB7XG4gICAgICAgIGxldCByZWFsID0gMDtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGxldCByZXMgPSB3eC5nZXRTeXN0ZW1JbmZvU3luYygpLndpbmRvd1dpZHRoO1xuICAgICAgICAgICAgbGV0IHNjYWxlID0gKDc1MCAvIDIpIC8gKHcgLyAyKTsgLy/ku6Xlrr3luqY3NTBweOiuvuiuoeeov+WBmuWuveW6pueahOiHqumAguW6lFxuICAgICAgICAgICAgcmVhbCA9IE1hdGguZmxvb3IocmVzIC8gc2NhbGUpO1xuICAgICAgICAgICAgcmV0dXJuIHJlYWw7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgLy8g5Y+z5ruR5Yig6Zmk5oyJ6ZKu55qE5L2N572uXG4gICAgaW5pdEVsZVdpZHRoOiBmdW5jdGlvbigpIHtcbiAgICAgICAgbGV0IGRlbEJ0bldpZHRoID0gdGhpcy5nZXRFbGVXaWR0aCh0aGlzLmRhdGEuZGVsQnRuV2lkdGgpO1xuICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgICAgZGVsQnRuV2lkdGg6IGRlbEJ0bldpZHRoXG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgLy8gIOinpuaRuOW3puenu+W8gOWni1xuICAgIHRvdWNoUzogZnVuY3Rpb24oZSkge1xuICAgICAgICBpZiAoZS50b3VjaGVzLmxlbmd0aCA9PSAxKSB7XG4gICAgICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgICAgICAgIHN0YXJ0WDogZS50b3VjaGVzWzBdLmNsaWVudFhcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSxcbiAgICAvL+inpuaRuOW3puenu+enu+WKqFxuICAgIHRvdWNoTTogZnVuY3Rpb24oZSkge1xuICAgICAgICBsZXQgaW5kZXggPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pbmRleDtcbiAgICAgICAgaWYgKGUudG91Y2hlcy5sZW5ndGggPT0gMSkge1xuICAgICAgICAgICAgbGV0IG1vdmVYID0gZS50b3VjaGVzWzBdLmNsaWVudFg7XG4gICAgICAgICAgICBsZXQgZGlzWCA9IHRoaXMuZGF0YS5zdGFydFggLSBtb3ZlWDtcbiAgICAgICAgICAgIGxldCBkZWxCdG5XaWR0aCA9IHRoaXMuZGF0YS5kZWxCdG5XaWR0aDtcbiAgICAgICAgICAgIGxldCBsZWZ0ID0gXCJcIjtcbiAgICAgICAgICAgIGlmIChkaXNYID09IDAgfHwgZGlzWCA8IDApIHsgLy/lpoLmnpznp7vliqjot53nprvlsI/kuo7nrYnkuo4w77yMY29udGFpbmVy5L2N572u5LiN5Y+YXG4gICAgICAgICAgICAgICAgbGVmdCA9IFwibWFyZ2luLWxlZnQ6MHB4XCI7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGRpc1ggPiAwKSB7IC8v56e75Yqo6Led56a75aSn5LqOMO+8jGNvbnRhaW5lciBsZWZ05YC8562J5LqO5omL5oyH56e75Yqo6Led56a7XG4gICAgICAgICAgICAgICAgbGVmdCA9IFwibWFyZ2luLWxlZnQ6LVwiICsgZGlzWCArIFwicHhcIjtcbiAgICAgICAgICAgICAgICBpZiAoZGlzWCA+PSBkZWxCdG5XaWR0aCkge1xuICAgICAgICAgICAgICAgICAgICBsZWZ0ID0gXCJsZWZ0Oi1cIiArIGRlbEJ0bldpZHRoICsgXCJweFwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBsaXN0ID0gdGhpcy5kYXRhLmRhdGFMaXN0O1xuICAgICAgICAgICAgaWYgKGluZGV4ICE9IFwiXCIgJiYgaW5kZXggIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGxpc3RbcGFyc2VJbnQoaW5kZXgpXS5sZWZ0ID0gbGVmdDtcbiAgICAgICAgICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhTGlzdDogbGlzdFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuICAgIC8v6Kem5pG45bem56e757uT5p2fXG4gICAgdG91Y2hFOiBmdW5jdGlvbihlKSB7XG4gICAgICAgIGxldCBpbmRleCA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmluZGV4O1xuICAgICAgICBpZiAoZS5jaGFuZ2VkVG91Y2hlcy5sZW5ndGggPT0gMSkge1xuICAgICAgICAgICAgbGV0IGVuZFggPSBlLmNoYW5nZWRUb3VjaGVzWzBdLmNsaWVudFg7XG4gICAgICAgICAgICBsZXQgZGlzWCA9IHRoaXMuZGF0YS5zdGFydFggLSBlbmRYO1xuICAgICAgICAgICAgbGV0IGRlbEJ0bldpZHRoID0gdGhpcy5kYXRhLmRlbEJ0bldpZHRoO1xuICAgICAgICAgICAgLy/lpoLmnpzot53nprvlsI/kuo7liKDpmaTmjInpkq7nmoQxLzLvvIzkuI3mmL7npLrliKDpmaTmjInpkq5cbiAgICAgICAgICAgIGxldCBsZWZ0ID0gZGlzWCA+IGRlbEJ0bldpZHRoIC8gMiA/IFwibWFyZ2luLWxlZnQ6LVwiICsgZGVsQnRuV2lkdGggKyBcInB4XCIgOiBcIm1hcmdpbi1sZWZ0OjBweFwiO1xuICAgICAgICAgICAgbGV0IGxpc3QgPSB0aGlzLmRhdGEuZGF0YUxpc3Q7XG4gICAgICAgICAgICBpZiAoaW5kZXggIT09IFwiXCIgJiYgaW5kZXggIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGxpc3RbcGFyc2VJbnQoaW5kZXgpXS5sZWZ0ID0gbGVmdDtcbiAgICAgICAgICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhTGlzdDogbGlzdFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuICAgIC8v5YiX6KGo5Yid5aeL5YyWXG4gICAgaW5pdFF1ZXJ5OiBhc3luYyBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCF0aGlzLmRhdGEuY2FuQWpheCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZGF0YS5jYW5BamF4ID0gZmFsc2U7XG4gICAgICAgIHZhciBwYXJhbSA9IHtcbiAgICAgICAgICAgIHBhZ2VTaXplOiB0aGlzLmRhdGEucGFnZVNpemUsXG4gICAgICAgICAgICBwOiB0aGlzLmRhdGEucFxuICAgICAgICB9XG4gICAgICAgIGxldCByZXN1bHQgPSBhd2FpdCBmaWx0ZXJTZXJ2aWNlLmdldEFkZHJMaXN0KHsgcGFyYW1zOiBwYXJhbSB9KVxuICAgICAgICB0aGlzLmluaXREYXRhKHJlc3VsdClcbiAgICB9LFxuICAgIGluaXREYXRhOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgdGhpcy5kYXRhLmNhbkFqYXggPSB0cnVlO1xuICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgICAgZG93blVwOiAwLFxuICAgICAgICAgICAgbG9hZGluZzogMVxuICAgICAgICB9KVxuICAgICAgICB3eC5zdG9wUHVsbERvd25SZWZyZXNoKCk7XG4gICAgICAgIHZhciBxdWVyeURhdGEgPSByZXMuZGF0YTsgLy/ojrflj5bor7fmsYLnmoTmlbDmja5cbiAgICAgICAgLy8g5rKh5pWw5o2u55qE5oOF5Ya1XG4gICAgICAgIGlmIChxdWVyeURhdGEubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgICAgICAgZG93blVwOiAyXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcXVlcnlEYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLmRhdGEuZGF0YUxpc3QucHVzaChxdWVyeURhdGFbaV0pXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgICAgICAgIGRhdGFMaXN0OiB0aGlzLmRhdGEuZGF0YUxpc3RcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAvLyDmsqHmnInku7vkvZXmlbDmja7kuI3ljIXmi6zkuIrmi4nliqDovb1cbiAgICAgICAgaWYgKHRoaXMuZGF0YS5kYXRhTGlzdC5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgICAgICBkb3duVXA6IDAsXG4gICAgICAgICAgICAgICAgbnVsbENvbnRlbnQ6IDBcblxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgICAgICAgbnVsbENvbnRlbnQ6IDFcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9LFxuICAgIC8vIOWIoOmZpFxuICAgIGFkZHJlc3NEZWxldGUoZSkge1xuICAgICAgICBsZXQgdGhhdCA9IHRoaXNcbiAgICAgICAgbGV0IGFkZHJlc3NfaWQgPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5hZGRyaWRcbiAgICAgICAgbGV0IGFkZHJJbmRleCA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmluZGV4XG4gICAgICAgIGxldCBkYXRhTGlzdCA9IHRoaXMuZGF0YS5kYXRhTGlzdFxuICAgICAgICBsZXQgd3hTaG93TW9kYWwgPSBhcHAud3hQcm9taXNpZnkod3guc2hvd01vZGFsKVxuICAgICAgICB3eFNob3dNb2RhbCh7XG4gICAgICAgICAgICB0aXRsZTogYXBwLmdsb2JhbERhdGEucHJvamVjdE5hbWUsXG4gICAgICAgICAgICBjb250ZW50OiAn56Gu5a6a5Yig6Zmk5b2T5YmN5Zyw5Z2A5ZCX77yfJ1xuICAgICAgICB9KS50aGVuKGFzeW5jIGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICAgICAgbGV0IHBhcmFtID0ge1xuICAgICAgICAgICAgICAgICAgICBhZGRyZXNzX2lkOiBhZGRyZXNzX2lkXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGF3YWl0IGZpbHRlclNlcnZpY2UuZGVsZXRlQWRkcih7IHBhcmFtczogcGFyYW0gfSlcbiAgICAgICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpXG4gICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICfliKDpmaTmiJDlip8nLFxuICAgICAgICAgICAgICAgICAgICBpY29uOiAnc3VjY2VzcydcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIGRhdGFMaXN0LnNwbGljZShhZGRySW5kZXgsIDEpXG4gICAgICAgICAgICAgICAgICAgIC8v5pu05paw5YiX6KGo55qE54q25oCBICBcbiAgICAgICAgICAgICAgICB0aGF0LnNldERhdGEoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhTGlzdDogZGF0YUxpc3RcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuICAgIH0sXG4gICAgLy8g57yW6L6RXG4gICAgZWRpdEFkZHJlc3MoZSkge1xuICAgICAgICBsZXQgYWRkckluZGV4ID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaW5kZXhcbiAgICAgICAgbGV0IGVkaXRBZGRyID0gdGhpcy5kYXRhLmRhdGFMaXN0W2FkZHJJbmRleF1cbiAgICAgICAgbGV0IGFkZHJlc3NfaWQgPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pZFxuICAgICAgICB3eC5zZXRTdG9yYWdlU3luYygnZWRpdEFkZHInLCBlZGl0QWRkcikgLy/lnLDlnYDnvJbovpFcbiAgICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICB1cmw6ICcuLi9hZGRyRWRpdC9hZGRyRWRpdD9hZGRyZXNzX2lkPScgKyBhZGRyZXNzX2lkLFxuICAgICAgICB9KVxuICAgIH0sXG4gICAgLy8g5paw5aKe5Zyw5Z2AXG4gICAgbmV3QWRkcmVzcyhlKSB7XG4gICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgdXJsOiAnLi4vYWRkckVkaXQvYWRkckVkaXQnLFxuICAgICAgICB9KVxuICAgIH0sXG4gICAgLy8g6I635Y+W5b2T5YmN5Zyw5Z2AXG4gICAgZ2V0QWRkcmVzcyhlKSB7XG4gICAgICAgIGxldCBhZGRyZXNzX2lkID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaWRcbiAgICAgICAgY29uc29sZS5sb2coYWRkcmVzc19pZClcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5Yqg6L29XG4gICAgICovXG4gICAgb25Mb2FkOiBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICAgIHRoaXMuaW5pdEVsZVdpZHRoKCk7XG5cbiAgICAgICAgaWYgKCF0aGlzLmRhdGEub25zaG93KSB7XG4gICAgICAgICAgICB0aGlzLmluaXRRdWVyeSgpXG4gICAgICAgIH1cbiAgICB9LFxuICAgIC8qKlxuICAgICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5pi+56S6XG4gICAgICovXG4gICAgb25TaG93OiBmdW5jdGlvbigpIHtcbiAgICAgICAgbGV0IHBhZ2VzID0gZ2V0Q3VycmVudFBhZ2VzKCk7XG4gICAgICAgIGxldCBjdXJyUGFnZSA9IHBhZ2VzW3BhZ2VzLmxlbmd0aCAtIDFdO1xuICAgICAgICB0aGlzLnNldERhdGEoeyAvL+WwhuaQuuW4pueahOWPguaVsOi1i+WAvFxuICAgICAgICAgICAgb25zaG93OiBjdXJyUGFnZS5kYXRhLm9uc2hvd1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKHRoaXMuZGF0YS5vbnNob3cpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgICAgICAgcGFnZVNpemU6IDEwLFxuICAgICAgICAgICAgICAgIHA6IDEsXG4gICAgICAgICAgICAgICAgZGF0YUxpc3Q6IFtdXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgdGhpcy5pbml0UXVlcnkoKVxuICAgICAgICB9XG5cbiAgICB9LFxuXG5cblxuICAgIC8qKlxuICAgICAqIOmhtemdouebuOWFs+S6i+S7tuWkhOeQhuWHveaVsC0t55uR5ZCs55So5oi35LiL5ouJ5Yqo5L2cXG4gICAgICovXG4gICAgb25QdWxsRG93blJlZnJlc2g6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgICAgcGFnZVNpemU6IDEwLFxuICAgICAgICAgICAgcDogMSxcbiAgICAgICAgICAgIGRhdGFMaXN0OiBbXVxuICAgICAgICB9KVxuICAgICAgICB0aGlzLmluaXRRdWVyeSgpXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIOmhtemdouS4iuaLieinpuW6leS6i+S7tueahOWkhOeQhuWHveaVsFxuICAgICAqL1xuICAgIG9uUmVhY2hCb3R0b206IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy5kYXRhLmRhdGFMaXN0Lmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBsZXQgX3RoaXMgPSB0aGlzO1xuICAgICAgICBpZiAodGhpcy5kYXRhLmRvd25VcCA9PSAyIHx8IHRoaXMuZGF0YS5kYXRhTGlzdC5sZW5ndGggJSB0aGlzLmRhdGEucGFnZVNpemUgPiAwKSB7IC8v5rKh5pWw5o2u5LqG77yM5LiN55So5YaN6K+35rGC5LqGXG4gICAgICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgICAgICAgIGRvd25VcDogMlxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIHZhciBwYWdlTnVtID0gdGhpcy5kYXRhLmRhdGFMaXN0Lmxlbmd0aCAvIHRoaXMuZGF0YS5wYWdlU2l6ZSArIDFcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgIGRvd25VcDogMSxcbiAgICAgICAgICAgIHA6IHBhZ2VOdW1cbiAgICAgICAgfSlcblxuICAgICAgICB0aGlzLmluaXRRdWVyeSgpXG4gICAgfSxcbiAgICAvKipcbiAgICAgKiDnlKjmiLfngrnlh7vlj7PkuIrop5LliIbkuqtcbiAgICAgKi9cbiAgICBvblNoYXJlQXBwTWVzc2FnZTogZnVuY3Rpb24ocmVzKSB7XG5cbiAgICB9XG59KSJdfQ==
