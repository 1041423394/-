let util = require('../../utils/util')
var regeneratorRuntime = require("../../lib/runtime.js");
let TIP = util.TIP
let area = require('../../lib/area')
var filterService = require('../../service/filterService');
var provinces = []; //省
var citys = []; //城市
var countys = []; //区县
var index = [0, 0, 0];
var t = 0;
var show = true;
var moveY = 200;
var areaInfo = []; //省市区
Page({
        /**
         * 页面的初始数据
         */
        data: {
            tips: {
                hiddenErrmsg: true,
                errmsg: ''
            },
            show: show,
            is_default: 0, //是否设为默认
            provinces: provinces,
            citys: citys,
            countys: countys,
            value: [0, 0, 0],
            lat: '',
            lng: '',
            address_id: '',
            classStyle: 'slideInUp'
        },
        // 获取城市信息
        areaInfo() {
            let that = this
            let param = {
                command: 'regionList'
            }
            area.getAreaInfo(function(arr) {
                areaInfo = arr
                getProvinceData(that);

            })
        },
        // 城市选择t
        translate: function(e) {
            this.setData({
                classStyle: 'slideInUp'
            })
            if (t == 0) {
                moveY = 0;
                show = false;
                t = 1;
            } else {
                moveY = 200;
                show = true;
                t = 0;
            }
            animationEvents(this, moveY, show);

        },
        // 获取地址
        getReceiveAddr() {
            let _this = this
            wx.chooseLocation({
                success: function(res) {
                    _this.setData({
                        receive_addr: res.name,
                        receive_extralAddr: res.address,
                        lat: res.latitude,
                        lng: res.longitude
                    })
                }
            })
        },

        // 设为默认值
        defaultChange(e) {
            let isdefault = e.detail.value.length > 0 ? 1 : 0
            this.setData({
                is_default: isdefault
            })
        },

        //保存地址
        confirmSave: async function(e) {
            let queryParam = e.detail.value
            let userInfo = wx.getStorageSync('userInfo')

            if (!queryParam.receive_name) {
                TIP.showErrMsg(this, '请填写收货人姓名')
                return
            }
            if (!queryParam.receive_mobile) {
                TIP.showErrMsg(this, '请填写收货人联系电话')
                return
            }
            if (!queryParam.receive_addr) {
                TIP.showErrMsg(this, '请填写收货地址')
                return
            }
            let re = /^1\d{10}/g
            if (!re.test(queryParam.receive_mobile)) {
                TIP.showErrMsg(this, '手机号码格式不正确')
                return
            }

            let param = {
                consignee: queryParam.receive_name,
                address: queryParam.receive_addr,
                building: queryParam.receive_extralAddr,
                mobile: queryParam.receive_mobile,
                lat: this.data.lat,
                lng: this.data.lng,
                is_default: this.data.is_default
            }
            await filterService.confirmAddr({ params: param })
            wx.showToast({
                    title: '保存成功',
                    icon: 'success',
                    duration: 2000
                })
                // 返回页面是否做刷新动作
            let pages = getCurrentPages(); //当前页面
            let prevPage = pages[pages.length - 2]; //上一页面
            prevPage.setData({ //直接给上移页面赋值
                onshow: true
            });
            wx.navigateBack()

        },
        onShow: function() {

        },
        /**
         * 生命周期函数--监听页面加载
         */
        onLoad: function(options) {
            this.areaInfo()
        },

        /**
         * 生命周期函数--监听页面初次渲染完成
         */
        onReady: function() {
            this.animation = wx.createAnimation({
                transformOrigin: "50% 50%",
                duration: 0,
                timingFunction: "ease",
                delay: 0
            })
            this.animation.translateY(200 + 'vh').step();
            this.setData({
                animation: this.animation.export(),
                show: show
            })
        },
        //滑动事件
        bindChange: function(e) {
            var val = e.detail.value
            if (index[0] != val[0]) {
                val[1] = 0;
                val[2] = 0;
                getCityArr(val[0], this); //获取地级市数据
                getCountyInfo(val[0], val[1], this); //获取区县数据
            } else { //若省份column未做滑动，地级市做了滑动则定位区县第一位
                if (index[1] != val[1]) {
                    val[2] = 0;
                    getCountyInfo(val[0], val[1], this); //获取区县数据
                }
            }
            index = val;
            //更新数据
            this.setData({
                value: [val[0], val[1], val[2]],
                province: provinces[val[0]].name,
                city: citys[val[1]].name,
                county: countys[val[2]].name
            })
        },
        //隐藏弹窗浮层
        hiddenFloatView(e) {
            this.setData({
                classStyle: 'slideOutDown'
            })
            moveY = 200;
            setTimeout(function() {
                show = true;
            }, 300)
            t = 0;
            animationEvents(this, moveY, show);

        },
        /**
         * 用户点击右上角分享
         */
        onShareAppMessage: function(res) {

        }


    })
    //动画事件
function animationEvents(that, moveY, show) {

    that.animation = wx.createAnimation({
        transformOrigin: "50% 50%",
        duration: 400,
        timingFunction: "ease",
        delay: 0
    })
    that.animation.translateY(moveY + 'vh').step()

    that.setData({
        animation: that.animation.export(),
        show: show
    })

}
//获取省份数据
function getProvinceData(that) {
    var s;
    provinces = [];
    var num = 0;
    for (var i = 0; i < areaInfo.length; i++) {
        s = areaInfo[i];
        if (s.di == "00" && s.xian == "00") {
            provinces[num] = s;
            num++;
        }
    }
    that.setData({
        provinces: provinces
    })

    //初始化调一次
    getCityArr(0, that);
    getCountyInfo(0, 0, that);


}

// 获取地级市数据
function getCityArr(count, that) {
    var c;
    citys = [];
    var num = 0;
    for (var i = 0; i < areaInfo.length; i++) {
        c = areaInfo[i];
        if (c.xian == "00" && c.sheng == provinces[count].sheng && c.di != "00") {
            citys[num] = c;
            num++;
        }
    }
    if (citys.length == 0) {
        citys[0] = {
            name: ''
        };
    }

    that.setData({
        city: "",
        citys: citys,
        value: [count, 0, 0]
    })
}

// 获取区县数据
function getCountyInfo(column0, column1, that) {
    var c;
    countys = [];
    var num = 0;
    for (var i = 0; i < areaInfo.length; i++) {
        c = areaInfo[i];
        if (c.xian != "00" && c.sheng == provinces[column0].sheng && c.di == citys[column1].di) {
            countys[num] = c;
            num++;
        }
    }
    if (countys.length == 0) {
        countys[0] = {
            name: ''
        };
    }
    that.setData({
        county: "",
        countys: countys,
        value: [column0, column1, 0]
    })
}