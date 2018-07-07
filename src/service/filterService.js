let app = getApp()
    /**
     * @param {object} Interface 各接口地址
     * @param {string} getFilterData 过滤数据
     */
let Interface = {
        'getFilterData': ''
    }
    // debug是为了在接口没有的情况下前台自我mock数据，最后只用更改debug值即可正式测试，这里只写了一个例子，其他同样
let getFilterData = function(obj) {
    if (app.globalData.debug == 1) {
        let obj = {
            "msg": "success",
            "data": [{ key: 'B', cols: [{ display: '冰河路', searchs: 'BHL', id: 0 }, { display: '滨康路', searchs: 'BKL', id: 2 }] }, { key: 'C', cols: [{ display: '曹家桥', searchs: 'CJQ', id: 3 }, { display: '朝阳', searchs: 'CY', id: 4 }] }, { key: 'D', cols: [{ display: '打铁关', searchs: 'DTG', id: 5 }, { display: '定安路', searchs: 'DAL', id: 7 }] }, { key: 'X', cols: [{ display: '西湖文化广场', searchs: 'XHWHGC', id: 6 }, { display: '湘湖', searchs: 'XH', id: 8 }] }],
            "code": 200
        }
        return obj
    }

    return fml.request({
        url: Interface.getFilterData,
        data: obj.params,
        method: 'POST'
    })
}

let getCityList = function() {
    let obj = {
        "msg": "success",
        "code": '00000',
        "data": [{ "region_id": "110100", "name": "市辖区", "pinyin": "shixiaqu" }, { "region_id": "120100", "name": "市辖区", "pinyin": "shixiaqu" }, { "region_id": "130100", "name": "石家庄市", "pinyin": "shijiazhuangshi" }, { "region_id": "130200", "name": "唐山市", "pinyin": "tangshanshi" }, { "region_id": "130300", "name": "秦皇岛市", "pinyin": "qinhuangdaoshi" }, { "region_id": "130400", "name": "邯郸市", "pinyin": "handanshi" }, { "region_id": "130500", "name": "邢台市", "pinyin": "xingtaishi" }, { "region_id": "130600", "name": "保定市", "pinyin": "baodingshi" }, { "region_id": "130700", "name": "张家口市", "pinyin": "zhangjiakoushi" }, { "region_id": "130800", "name": "承德市", "pinyin": "chengdeshi" }, { "region_id": "130900", "name": "沧州市", "pinyin": "cangzhoushi" }, { "region_id": "131000", "name": "廊坊市", "pinyin": "langfangshi" }, { "region_id": "131100", "name": "衡水市", "pinyin": "hengshuishi" }]
    }
    return obj
}
let getProductList = function() {
    let obj = {
        "data": [{ "id": "1886", "img": "http:\/\/cmall-file.ishaohuo.cn\/uploads\/20180611\/1528686384472925.jpg", "goods_name": "一包装在口袋里的美颜秘籍，想喝就能喝的纯天然蜂蜜", "price": "168.00", "purchase_price": "0.00", "member_price": "0.00", "describe": "", "shop_id": "1" }, { "id": "1887", "img": "http:\/\/cmall-file.ishaohuo.cn\/uploads\/20180611\/1528687668527906.jpg", "goods_name": "添乐爆浆曲奇牛奶芒果蔓越莓夹心软饼干网红休闲零食批发128g", "price": "285.00", "purchase_price": "0.00", "member_price": "0.00", "describe": "", "shop_id": "1" }, { "id": "1888", "img": "http:\/\/cmall-file.ishaohuo.cn\/uploads\/20180611\/1528697902793625.jpg", "goods_name": "欧扎克50%水果坚果麦片干吃早餐零食脆麦食品350g", "price": "38.00", "purchase_price": "0.00", "member_price": "0.00", "describe": "", "shop_id": "1" }, { "id": "1889", "img": "http:\/\/cmall-file.ishaohuo.cn\/uploads\/20180611\/1528698158576831.jpg", "goods_name": "俄罗斯进口果汁 喜爱牌水果果汁无添加 10种口味950ml", "price": "145.00", "purchase_price": "0.00", "member_price": "0.00", "describe": "", "shop_id": "1" }, { "id": "1890", "img": "http:\/\/cmall-file.ishaohuo.cn\/uploads\/20180611\/1528698355711530.jpg", "goods_name": "俄罗斯进口食品芒果糖芒果味软糖嗨芒果办公室休闲零食品", "price": "26.00", "purchase_price": "0.00", "member_price": "0.00", "describe": "", "shop_id": "1" }],
        "count": "11",
        "code": "200",
        "msg": "\u8bf7\u6c42\u53c2\u6570\u9519\u8bef"
    }
    return obj
}
let getShopCart = function() {
    let obj = {
        "shopList": [{ "goodsId": 6761, "pic": "http:\/\/cmall-file.ishaohuo.cn\/uploads\/20180611\/1528698158576831.jpg", "name": "新产品新吃法", "propertyChildIds": "", "label": "", "price": 90, "score": 0, "left": "", "active": true, "number": 2, "logisticsType": 386, "logistics": { "isFree": true, "feeType": 0, "feeTypeStr": "按件数", "details": [{ "addAmount": 0, "addNumber": 1, "firstAmount": 8, "firstNumber": 100, "type": 0, "userId": 951 }] }, "weight": 0 }, { "goodsId": 4510, "pic": "http:\/\/cmall-file.ishaohuo.cn\/uploads\/20180611\/1528686384472925.jpg", "name": "好吃不加价", "propertyChildIds": "871:1600,", "label": "颜色:白色  ", "price": 15, "score": 0, "left": "", "active": true, "number": 1, "logisticsType": 459, "logistics": { "isFree": false, "feeType": 0, "feeTypeStr": "按件数", "details": [{ "addAmount": 5, "addNumber": 1, "firstAmount": 0, "firstNumber": 3, "type": 0, "userId": 951 }] }, "weight": 0 }],
        "shopNum": 3
    }
    return obj
}
let addShopCart = function() {
    let obj = {
        "stores": 20
    }
    return obj
}
let delShopCart = function() {
    return true
}
let totalPrice = function() {
    return 30
}
let confirmOrder = function() {
    return true
}
let confirmAddr = function() {
    return true
}
let getAddrList = function() {
    let obj = {
        "code": "000000",
        "msg": "操作成功",
        "total": 1,
        "per_page": 10,
        "current_page": 1,
        "last_page": 1,
        "data": [
            { "id": "50", "uid": "2", "consignee": "嗯哼", "province": "浙江省", "city": "杭州市", "district": "滨江区", "address": "江陵路2028号)", "building": "", "mobile": "13235864523", "is_default": "0", "lat": "30.2117730", "lng": "120.2153200", "type": "1", "source": "1", "is_delete": "0", "create_time": "2018-04-25 16:07:42", "update_time": "2018-04-25 16:07:42", "pp": null }, { "id": "50", "uid": "2", "consignee": "嗯哼", "province": "浙江省", "city": "杭州市", "district": "滨江区", "address": "江陵路2028号)", "building": "", "mobile": "13235864523", "is_default": "1", "lat": "30.2117730", "lng": "120.2153200", "type": "1", "source": "1", "is_delete": "0", "create_time": "2018-04-25 16:07:42", "update_time": "2018-04-25 16:07:42", "pp": null }, { "id": "50", "uid": "2", "consignee": "嗯哼", "province": "浙江省", "city": "杭州市", "district": "滨江区", "address": "江陵路2028号)", "building": "", "mobile": "13235864523", "is_default": "1", "lat": "30.2117730", "lng": "120.2153200", "type": "1", "source": "1", "is_delete": "0", "create_time": "2018-04-25 16:07:42", "update_time": "2018-04-25 16:07:42", "pp": null }

        ]
    }
    return obj
}
let deleteAddr = function() {
    return true
}



module.exports = {
    getFilterData: getFilterData,
    getCityList: getCityList,
    getProductList: getProductList,
    getShopCart: getShopCart,
    addShopCart: addShopCart,
    delShopCart: delShopCart,
    totalPrice: totalPrice,
    confirmOrder: confirmOrder,
    confirmAddr: confirmAddr,
    getAddrList: getAddrList,
    deleteAddr: deleteAddr
}