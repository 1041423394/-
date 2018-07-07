let filterService = require('../../service/filterService.js')
let app = getApp()
Page({
    /**
     * currentCity 当前城市
     * initialList 后台返回的城市列表信息
     * initCityList 初次渲染展示的城市列表 
     * searchResult 搜索结果数据 
     * keyup 是否输入搜索 true搜索 false未启动搜索
     * historyCity 历史访问城市 暂时缓存设置最新访问的5个城市信息
     * 
     */
    data: {
        currentCity: '杭州',
        initialList: [],
        initCityList: [],
        searchResult: [],
        keyup: false,
        historyCity: []
    },
    //搜索
    searchInput(e) {
        let valInput = e.detail.value.toLowerCase() //搜索关键字
        let initialList = this.data.initialList //检索数据
        if (valInput != '') {
            this.setData({
                keyup: true,
                searchResult: this.searchHandle(initialList, valInput)
            })
        } else {
            this.setData({
                keyup: false
            })
        }
    },
    // 输入值处理
    searchHandle(initialList, valInput) {
        let searchResult = []
        for (var i = 0; i < initialList.length; i++) {
            if ((initialList[i]['pinyin']).indexOf(valInput) > -1 || (initialList[i]['name']).indexOf(valInput) > -1) {
                searchResult.push(initialList[i]);
            }
        }
        return searchResult
    },

    // 城市列表初始化处理
    initCity(selectItem) {
        var initCityList = [],
            keys = []; //ABCD...
        for (var i = 0; i < selectItem.length; i++) {
            var searchList = {},
                cols = [],
                firstLetter = (selectItem[i].pinyin.slice(0, 1)).toUpperCase(), //获取pinyin字段第一个字符
                name = selectItem[i].name, //城市名
                id = selectItem[i].region_id, //城市标识id
                index = keys.indexOf(firstLetter); //取出来的首字母的位置
            // 判断取出来的首字母是否存在
            if (index > -1) {
                initCityList[index]['cols'].push({
                    region_id: id,
                    name: name
                })
            } else {
                keys.push(firstLetter)
                searchList['key'] = firstLetter
                searchList['id'] = keys.length - 1
                cols.push({
                    region_id: id,
                    name: name
                })
                searchList['cols'] = cols
                initCityList.push(searchList)
            }
        }
        keys = keys.sort(); //按ABCD...顺序排序展示
        this.setData({
            keys: keys,
            initialList: selectItem,
            initCityList: initCityList
        })
    },

    //地址单击事件 
    selectClick(e) {
        var Pindex = e.currentTarget.dataset.id, //全部数据中的某条数据索引
            id = e.currentTarget.dataset.pid,
            Cindex = e.currentTarget.dataset.index; //cols中某条数据的索引
        if (typeof(Pindex) == 'number') {
            var item = this.data.initCityList[Pindex]['cols'][Cindex].name;
        } else {
            var item = this.data.searchResult[Cindex].name;
        }
        this.selectCompail(item, id);
    },

    //最近访问记录单击 
    historyClick(e) {
        let id = e.currentTarget.dataset.id
        let item = e.currentTarget.dataset.item
        this.selectCompail(item, id);
    },

    //单击完成回首页
    selectCompail(item, id) {
        let oldHistoryCity = this.data.historyCity //缓存中有的数据
        let newHistoryCity = [{ region_id: id, name: item }]; //单击产生的新数据
        let arrCity = []; //存储历史记录的城市ID
        let wxShowModal = app.wxPromisify(wx.showModal)
        if (oldHistoryCity) {
            oldHistoryCity.forEach(city => {
                arrCity.push(city.region_id)
            });
        }
        wxShowModal({
            title: app.globalData.projectName,
            content: '是否切换成所选城市'
        }).then(res => {
            if (res.confirm) {
                wx.setStorageSync('selectedCity', { id: id, name: item }); //存储当前选择的城市
                wx.reLaunch({
                    url: '../index/index'
                })
                if (oldHistoryCity) {
                    // 判断当前选择的城市是否存在于已有的缓存数据
                    if (arrCity.indexOf(id) < 0) {
                        let unshiftData = [{
                            region_id: id,
                            name: item
                        }]
                        oldHistoryCity.unshift(unshiftData[0])
                    } else {
                        // 当前选择的数据永远放在第一位
                        let unshiftData = oldHistoryCity.splice(arrCity.indexOf(id), 1)
                        oldHistoryCity.unshift(unshiftData[0])
                    }
                    // 只缓存五条数据
                    if (oldHistoryCity.length > 5) {
                        oldHistoryCity.splice(5, (oldHistoryCity.length - 5))
                    }
                    wx.setStorage({
                        key: 'historyCity',
                        data: oldHistoryCity
                    });

                } else {
                    // 缓存选定的城市
                    wx.setStorage({
                        key: 'historyCity',
                        data: newHistoryCity
                    });
                }
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function(options) {
        let historyCity = wx.getStorageSync('historyCity')
        let cityList = wx.getStorageSync('cityList')
        this.setData({
            historyCity: historyCity
        })
        if (cityList) {
            this.initCity(cityList)
        } else {
            let result = await filterService.getCityList()
            this.initCity(result.data)
            wx.setStorageSync('cityList', result.data);
        }
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})