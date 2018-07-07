/**
 * ps：数据加减删除都有请求接口做数据库对应数据更改，但前台未进行数据的重新请求渲染，次放法适合不允许多端一起在线操作
 */

let regeneratorRuntime = require("../../lib/runtime.js");
"use strict";
let app = getApp();
let filterService = require('../../service/filterService');
Page({
    data: {
        saveHidden: true, //结算按钮隐藏与否
        totalPrice: 0, //总价
        totalScoreToPay: 0, //购买所积累的积分
        allSelect: true, //是否全选
        noSelect: false, //是否有选中的商品
        list: [], //循环的数据
        selectedID: [], //选中的ID，这里用逗号隔开
        delBtnWidth: 120 //删除按钮宽度单位（rpx）
    },

    //获取元素自适应后的实际宽度
    getEleWidth: function(w) {
        let real = 0;
        try {
            let res = wx.getSystemInfoSync().windowWidth;
            let scale = (750 / 2) / (w / 2); //以宽度750px设计稿做宽度的自适应
            real = Math.floor(res / scale);
            return real;
        } catch (e) {
            return false;
        }
    },
    // 右滑删除按钮的位置
    initEleWidth: function() {
        let delBtnWidth = this.getEleWidth(this.data.delBtnWidth);
        this.setData({
            delBtnWidth: delBtnWidth
        });
    },
    onLoad: async function() {
        this.initEleWidth();
        let shopList = [];
        let that = this
            // 获取购物车数据
        let shopCarInfoMem = await filterService.getShopCart()
        if (shopCarInfoMem && shopCarInfoMem.shopList) {
            shopList = shopCarInfoMem.shopList
            shopList.forEach(function(item) {
                that.data.selectedID.push(item.goodsId)
            })
        }
        this.data.list = shopList;
        this.setGoodsList(this.getSaveHide(), this.totalPrice(), this.allSelect(), this.noSelect(), shopList);
    },
    //  触摸左移开始
    touchS: function(e) {
        if (e.touches.length == 1) {
            this.setData({
                startX: e.touches[0].clientX
            });
        }
    },
    //触摸左移移动
    touchM: function(e) {
        let index = e.currentTarget.dataset.index;
        if (e.touches.length == 1) {
            let moveX = e.touches[0].clientX;
            let disX = this.data.startX - moveX;
            let delBtnWidth = this.data.delBtnWidth;
            let left = "";
            if (disX == 0 || disX < 0) { //如果移动距离小于等于0，container位置不变
                left = "margin-left:0px";
            } else if (disX > 0) { //移动距离大于0，container left值等于手指移动距离
                left = "margin-left:-" + disX + "px";
                if (disX >= delBtnWidth) {
                    left = "left:-" + delBtnWidth + "px";
                }
            }
            let list = this.data.list;
            if (index != "" && index != null) {
                list[parseInt(index)].left = left;
                this.setGoodsList(this.getSaveHide(), this.totalPrice(), this.allSelect(), this.noSelect(), list);
            }
        }
    },
    //触摸左移结束
    touchE: function(e) {
        let index = e.currentTarget.dataset.index;
        if (e.changedTouches.length == 1) {
            let endX = e.changedTouches[0].clientX;
            let disX = this.data.startX - endX;
            let delBtnWidth = this.data.delBtnWidth;
            //如果距离小于删除按钮的1/2，不显示删除按钮
            let left = disX > delBtnWidth / 2 ? "margin-left:-" + delBtnWidth + "px" : "margin-left:0px";
            let list = this.data.list;
            if (index !== "" && index != null) {
                list[parseInt(index)].left = left;
                this.setGoodsList(this.getSaveHide(), this.totalPrice(), this.allSelect(), this.noSelect(), list);

            }
        }
    },
    // 单条数据删除
    delItem: async function(e) {
        let index = e.currentTarget.dataset.index;
        let list = this.data.list;
        let selectedID = this.data.selectedID
        let param = {
            id: e.currentTarget.dataset.id, //当前数据ID
        }
        await filterService.delCartList({ params: param })
        list.splice(index, 1);
        this.setGoodsList(this.getSaveHide(), this.totalPrice(), this.allSelect(), this.noSelect(), list);
    },
    // 单条选择
    selectTap: function(e) {
        let index = e.currentTarget.dataset.index;
        let id = e.currentTarget.dataset.id
        let list = this.data.list;
        if (index !== "" && index != null) {
            list[parseInt(index)].active = !list[parseInt(index)].active;
            this.setGoodsList(this.getSaveHide(), this.totalPrice(), this.allSelect(), this.noSelect(), list);
        }
    },
    // 计算总价
    totalPrice: function() {
        //通过接口计算价格
        // let param={
        //   id:this.data.selectedID
        // }
        // let result=await filterService.totalPrice()
        // 前台计算价格
        let list = this.data.list;
        let total = 0;
        let totalScoreToPay = 0;
        for (let i = 0; i < list.length; i++) {
            let curItem = list[i];
            if (curItem.active) {
                total += parseFloat(curItem.price) * curItem.number;
                totalScoreToPay += curItem.score * curItem.number;
            }
        }
        this.data.totalScoreToPay = totalScoreToPay;
        total = parseFloat(total.toFixed(2)); //js浮点计算bug，取两位小数精度
        return total;
    },
    // 是否全选
    allSelect: function() {
        let list = this.data.list;
        let allSelect = false;
        for (let i = 0; i < list.length; i++) {
            let curItem = list[i];
            if (curItem.active) {
                allSelect = true;
            } else {
                allSelect = false;
                break;
            }
        }
        return allSelect;
    },
    // 是否没有全选为了结算，删除按钮是否变灰色
    noSelect: function() {
        let list = this.data.list;
        let noSelect = 0;
        for (let i = 0; i < list.length; i++) {
            let curItem = list[i];
            if (!curItem.active) {
                noSelect++;
            }
        }
        if (noSelect == list.length) {
            return true;
        } else {
            return false;
        }
    },
    // 
    setGoodsList: function(saveHidden, total, allSelect, noSelect, list) {
        this.setData({
            saveHidden: saveHidden,
            totalPrice: total,
            allSelect: allSelect,
            noSelect: noSelect,
            list: list,
            selectedID: this.selectedID(list),
            totalScoreToPay: this.data.totalScoreToPay
        });
    },
    // 全选事件
    bindAllSelect: function() {
        let currentAllSelect = this.data.allSelect;
        let list = this.data.list;
        if (currentAllSelect) {
            for (let i = 0; i < list.length; i++) {
                let curItem = list[i];
                curItem.active = false;
            }
        } else {
            for (let i = 0; i < list.length; i++) {
                let curItem = list[i];
                curItem.active = true;
            }
        }

        this.setGoodsList(this.getSaveHide(), this.totalPrice(), !currentAllSelect, this.noSelect(), list);
    },
    // 商品数量增加
    jiaBtnTap: async function(e) {
        let index = e.currentTarget.dataset.index;
        let list = that.data.list;
        if (index !== "" && index != null) {
            // 添加判断当前商品购买数量是否超过当前商品可购买库存
            let param = {
                id: list[parseInt(index)].goodsId
            }
            let carShopBeanStores = 0;
            let result = await filterService.addShopCart({ params: param })
            carShopBeanStores = result.stores; //库存
            if (list[parseInt(index)].number < carShopBeanStores) {
                list[parseInt(index)].number++;
                this.setGoodsList(this.getSaveHide(), this.totalPrice(), this.allSelect(), this.noSelect(), list);
            }
            this.setData({
                curTouchGoodStore: carShopBeanStores
            })
        }
    },
    // 商品数量减少
    jianBtnTap: async function(e) {
        let index = e.currentTarget.dataset.index;
        let param = {
            id: list[parseInt(index)].goodsId
        }
        let list = this.data.list;
        if (index !== "" && index != null) {
            if (list[parseInt(index)].number > 1) {
                let result = await filterService.cutShopCart({ params: param })
                list[parseInt(index)].number--;
                this.setGoodsList(this.getSaveHide(), this.totalPrice(), this.allSelect(), this.noSelect(), list);
            }
        }
    },
    // 编辑
    editTap: function() {
        let list = this.data.list;
        for (let i = 0; i < list.length; i++) {
            let curItem = list[i];
            curItem.active = false;
        }
        this.setGoodsList(!this.getSaveHide(), this.totalPrice(), this.allSelect(), this.noSelect(), list);
    },
    // 完成
    saveTap: function() {
        console.log(this.data.selectedID)
        let list = this.data.list;
        for (let i = 0; i < list.length; i++) {
            let curItem = list[i];
            curItem.active = true;
        }
        this.setGoodsList(!this.getSaveHide(), this.totalPrice(), this.allSelect(), this.noSelect(), list);
    },
    getSaveHide: function() {
        let saveHidden = this.data.saveHidden;
        return saveHidden;
    },
    // 删除选中的
    deleteSelected: function() {
        let list = this.data.list;
        list = list.filter(function(curGoods) {
            return !curGoods.active;
        });
        this.setGoodsList(this.getSaveHide(), this.totalPrice(), this.allSelect(), this.noSelect(), list);
    },
    // 选中的数据ID
    selectedID(list) {
        let selectedID = []
        list.forEach(function(item) {
            if (item.active) {
                selectedID.push(item.goodsId)
            }
        })
        return selectedID
    },
    // 结算
    toPayOrder: async function() {
        wx.showLoading();
        if (this.data.noSelect) {
            wx.hideLoading();
            return;
        }
        let param = {
            selectedID: this.data.selectedID
        }
        await filterService.confirmOrder({ params: param })
        wx.hideLoading();
        wx.navigateTo({
            url: '../index/index'
        });
    }
})