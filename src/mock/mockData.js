/**
 * 
 * @authors WangYe wangjacker@163.com
 * @date    2018-09-20 15:40:56
 * @version $Id$
 */

import Mock from "mockjs";
export const data = Mock.mock({
    'foods|20': [{
        'name': "@ctitle(2,10)",
        "img": "@image('600x600',#b7ef7c)",
        "brief": "@csentence(1,50)",
        "price|0-20.0-2": 1,
        "num": 0,
        "minusFlag": true,
        "time": "@time",
        "peisongfei|0-100.0-2": 1,
        "limit|0-50": 1
    }]
})
export const carouselData = Mock.mock({
    'imgData|5': [{
        "img": "@image('302x206',#b7ef7c)",
        "id|+1": 0
    }]
})
export const goodsData = Mock.mock({
    'goods|11': [{
        'name': "@ctitle(8,24)",
        "src": "@image('145x145',#b7ef7c)",
        "price|100-400.1-2": 100,
    }]
})
export const listData = Mock.mock({
    "list|20": [{
        'name': "@ctitle(8,12)"
    }]
})
export const cartsGoods = Mock.mock({
    'cartsGoods|10': [{
        'id|+1': 1,
        'shopCount|1-5':1,
        'shopName': "@ctitle(8,24)",
        "src": "@image('145x145',#b7ef7c)",
        "shopPrice|100-400.1-2": 100,
    }]
})
export const menuData = Mock.mock({
    'menu|26': [{
        'name': "@ctitle(4,8)",
    }]
})
Mock.mock("/gets/listData", "get", {
    "list|20": [{
        'name': "@ctitle(8,12)"
    }]

})
Mock.mock("/gets/goodsData", "get", {
    'goods|11': [{
        'name': "@ctitle(8,24)",
        "src": "@image('145x145',#b7ef7c)",
        "price|100-400.1-2": 100,
    }]
})
Mock.mock("/gets/classfiy", "get", {
    'goods|20': [{
        'name': "@ctitle(3,16)",
        "src": "@image('64x64',#b7ef7c)",
    }]
})
Mock.setup({
    timeout: 4000
})
