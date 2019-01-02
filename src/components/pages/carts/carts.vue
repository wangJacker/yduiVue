<template>
    <yd-layout>
        <naver-bar slot='navbar' :showIcon='edit' @changeDelete='changeDelete'></naver-bar>
        <ul class="goods-list">
            <template v-if='!hasNoGoods'>
                <li ref='goodsItem' class="goodsItem" v-for="(item, index) in listInfo" :key='item.id'>
                    <div class="itemContainer" ref='itemContainer' @touchstart='touchstart($event,index)' @touchmove='touchmove($event,index)' @touchend='touchend($event,index)'>
                        <div class="left">
                            <input type="checkbox" :value='item.id' v-model='checkedBoxList'>
                            <span class='border' @click='handleChecked(item.id)'>
                            <i></i>
                        </span>
                        </div>
                        <div class="imgbox">
                            <img :src="item.src" alt="">
                    </div>
                            <div class="goodsname">
                                <p class="name">{{item.shopName}}</p>
                                <p class="price">{{item.shopPrice}}</p>
                                <div class="spinner">
                                    <span class='border' @click="reduce(index)">-</span>
                                    <input type="text" name="" @input='handleChange(index,$event)' v-model='item.shopCount' @blur='blurChange(index,$event)'>
                                    <span class='border' @click="add(index)">+</span>
                                </div>
                            </div>
                        </div>
                        <div class="deletebox" ref='deletebox'>
                            <span @click='deleate(item)'>删除</span>
                        </div>
                </li>
            </template>
            <template v-else>
                <li class="hasNoGoods">没有更多商品...</li>
            </template>
        </ul>
        <div slot='bottom' class="bottom" v-if="deleteAll">
            <div class="left" @click='checkedAllGoods'>
                <input type="checkbox" checked value="1" v-model='checkedAll'>
                <span class='border'>
                    <i></i>
                </span>
                <b>全选</b>
            </div>
            <div class="right">
                <div class="totalPrice">
                    <span>合计：</span>
                    <b>￥{{totalPrice}}</b>
                </div>
                <span class="goAccount">结算</span>
            </div>
        </div>
        <div slot='bottom' class="bottom" v-else>
            <div class="left" @click='checkedAllGoods'>
                <input type="checkbox" checked value="1" v-model='checkedAll'>
                <span class='border'>
                    <i></i>
                </span>
                <b>全选</b>
            </div>
            <div class="right">
                <span class="goAccount" @click='deleteAllGoods'>删除</span>
            </div>
        </div>
        <tab-bar slot='tabbar' :selectedCart='true'></tab-bar>
    </yd-layout>
</template>
<script type="text/javascript">
import naverBar from "@/components/common/naverBar";
import tabBar from "@/components/common/tabBar";
import Bscroll from 'better-scroll';
import { Calculate } from '@/base/js/calculate';
import { cartsGoods } from '@/mock/mockData';

export default {
    name: 'carts',
    data() {
        return {
            edit: "edit",
            checkedBoxList: [],
            //全选
            // checkedAll: false,
            // listInfo: [
            //     { id: 1, shopName: "男装1", shopPrice: 10, shopCount: 1 },
            //     { id: 2, shopName: "男装2", shopPrice: 20, shopCount: 1 },
            //     { id: 3, shopName: "男装3", shopPrice: 30, shopCount: 1 },
            //     { id: 4, shopName: "男装4", shopPrice: 40, shopCount: 1 },
            //     { id: 5, shopName: "男装5", shopPrice: 50, shopCount: 1 },
            // ],
            listInfo: [],
            //水平移动的距离
            horizontalX: 0,
            //垂直移动的距离
            verticalY: 0,
            //移动的方向direction 0 为初始 1 为水平 2为垂直
            direction: 0,
            //目标对象的位置
            emitPostion: 0,
            //删除按钮的宽度
            buttonWidth: 0,
            //全选删除
            deleteAll: true,
        }
    },
    components: { naverBar, tabBar },
    created() {
        this.Calculate = Calculate;
        this.listInfo = cartsGoods.cartsGoods;
    },
    mounted() {

        let scroll = document.getElementById('scrollView');
        this.overflowScroll(scroll);
        //获取删除按钮的宽度
        this.buttonWidth = this.$refs.deletebox[0].getBoundingClientRect().width;
    },
    methods: {
        changeDelete(index) {
            this.deleteAll = !this.deleteAll;
            this.checkedBoxList = [];
        },
        deleteAllGoods() {
            if (!this.checkedBoxList.length && this.listInfo.length) {
                this.$dialog.notify({
                    mes: '请选择要删除的商品！！',
                    timeout: 3000,
                });
                return false;
            } else if (!this.checkedBoxList.length && !this.listInfo.length) {
                this.$dialog.notify({
                    mes: '购物车内没有商品可以删除！！',
                    timeout: 3000,
                });
                return false;
            }
            this.$dialog.confirm({
                title: '信息',
                mes: `您确定要删除这${this.checkedBoxList.length}件商品嘛？`,
                opts: () => {
                    let checkDeleteGoods = this.listInfo.filter(vaule => !this.checkedBoxList.includes(vaule.id));
                    this.listInfo = checkDeleteGoods;
                    this.checkedBoxList = [];
                    this.$dialog.toast({
                        mes: '删除成功',
                        timeout: 1500,
                        icon: 'success'
                    });
                }
            });
        },
        handleChecked(value) {
            if (this.checkedBoxList.includes(value)) {
                let index = this.checkedBoxList.findIndex(item => item === value);
                this.checkedBoxList.splice(index, 1);
            } else {
                this.checkedBoxList.push(value);
            }
        },
        reduce(index) {
            if (this.listInfo[index].shopCount <= 0) {
                this.listInfo[index].shopCount = 0;
            } else {
                this.listInfo[index].shopCount--;
            }
        },
        add(index) {
            this.listInfo[index].shopCount++;
        },
        handleChange(index, e, oldNum) {
            if (e.target.value.length == 1) {
                this.listInfo[index].shopCount = e.target.value.replace(/[^1-9]/g, '')
            } else {
                this.listInfo[index].shopCount = e.target.value.replace(/\D/g, '')
            }
        },
        blurChange(index, e) {
            if (e.target.value.length < 1) {
                this.listInfo[index].shopCount = 1;
            } else {
                if (e.target.value.length == 1) {
                    this.listInfo[index].shopCount = e.target.value.replace(/[^1-9]/g, '')
                } else {
                    this.listInfo[index].shopCount = e.target.value.replace(/\D/g, '')
                }
            }

        },
        touchstart(e, index) {
            e = e || event;
            //记录初始位置X
            //记录初始位置X
            this.horizontalX = e.targetTouches[0].pageX;
            //记录初始位置Y
            this.verticalY = e.targetTouches[0].pageY;
            this.$refs.itemContainer.forEach((item, indx) => {
                if (indx !== index) {
                    this.$refs.itemContainer[indx].style.transition = "all 0.2s";
                    this.$refs.itemContainer[indx].style.WebkitTransform = "translateX(" + 0 + "px)";
                }
            });
            //获取transition的距离
            this.emitPostion = (this.$refs.itemContainer[index].style.WebkitTransform.replace(/translateX\(/g, "").replace(/px\)/g, "")) * 1;
        },
        touchmove(e, index) {
            e = e || event;
            if (this.emitPostion === 0) {
                //这个是初始位置的时候
                switch (this.direction) {
                    case 0:
                        this.calculateDirection(e);
                        break;
                    case 1:
                        // 水平滑动距离
                        this.moveX = e.targetTouches[0].pageX;
                        this.X = this.moveX - this.horizontalX;
                        if (this.X >= 0) {
                            // 向右滑动表示
                            this.$refs.itemContainer[index].style.WebkitTransform = "translateX(" + 0 + "px)";
                        } else if (this.X < 0) {
                            // 向左滑动
                            let left = Math.abs(this.X);
                            if (left > this.buttonWidth) {
                                left = this.buttonWidth;
                            }
                            this.$refs.itemContainer[index].style.WebkitTransform = "translateX(" + -left + "px)";
                        }
                        break;
                    case 2:
                        break;
                }
            } else if (this.emitPostion < 0) {
                // 以及滑动开了
                switch (this.direction) {
                    case 0:
                        this.calculateDirection(e);
                        break;
                    case 1:
                        e.preventDefault();
                        this.moveX = e.targetTouches[0].pageX;
                        this.X = this.moveX - this.horizontalX;
                        if (this.X >= 0) {
                            // 向右滑动表示
                            let right = -this.buttonWidth + Math.abs(this.X);
                            if (right > 0) {
                                right = 0;
                            }
                            this.$refs.itemContainer[index].style.WebkitTransform = "translateX(" + right + "px)";
                        } else if (this.X < 0) {
                            // 向左滑动
                            this.$refs.itemContainer[index].style.WebkitTransform = "translateX(" + -this.buttonWidth + "px)";
                        }
                        break;
                    case 2:
                        break;
                }
            }
        },
        touchend(e, index) {
            e = e || event;
            this.emitPostion = (this.$refs.itemContainer[index].style.WebkitTransform.replace(/translateX\(/g, "").replace(/px\)/g, "")) * 1;
            if (this.emitPostion > -this.buttonWidth / 2) {
                // 超过一半归0
                // this.$refs.itemContainer[index].style.transition = "all 0.2s";
                this.$refs.itemContainer[index].style.WebkitTransform = "translateX(" + 0 + "px)";
                this.$refs.itemContainer[index].style.transition = "all 0.1s";
                this.emitPostion = 0;
            } else {
                // this.$refs.itemContainer[index].style.transition = "all 0.2s";
                this.$refs.itemContainer[index].style.WebkitTransform = "translateX(" + -this.buttonWidth + "px)";
                this.$refs.itemContainer[index].style.transition = "all 0.1s";
                this.emitPostion = -this.buttonWidth;
            }
            // 将移动方向归0初始化
            this.direction = 0;
        },
        calculateDirection(e) {
            this.moveX = e.targetTouches[0].pageX;
            // 垂直移动距离
            this.moveY = e.targetTouches[0].pageY;
            this.X = Math.abs(this.moveX - this.horizontalX);
            this.Y = Math.abs(this.moveY - this.verticalY);
            if (this.X > this.Y) {
                this.direction = 1;
            } else {
                this.direction = 2;
            }
        },
        deleate(item) {
            this.$dialog.confirm({
                title: '信息',
                mes: '您确定要删除嘛？',
                opts: () => {
                    let listInfoIndex = this.listInfo.findIndex(value => value.id === item.id);
                    let checkedIndex = this.checkedBoxList.findIndex(value => value === item.id);
                    this.listInfo.splice(listInfoIndex, 1);
                    checkedIndex >= 0 ? this.checkedBoxList.splice(checkedIndex, 1) : "";
                    this.$dialog.toast({
                        mes: '删除成功',
                        timeout: 1500,
                        icon: 'success'
                    });
                }
            });
        },
        checkedAllGoods() {
            if (this.checkedAll) {
                this.checkedBoxList = [];
            } else {
                this.listInfo.forEach((item, index) => {
                    if (!this.checkedBoxList.includes(item.id)) {
                        this.checkedBoxList.push(item.id)
                    }
                });
            }
        },
    },
    computed: {
        checkedAll: {
            get() {
                return this.checkedBoxList.length === 0 ? false : this.checkedBoxList.length === this.listInfo.length;
            },
            set(newValue) {}
        },
        totalPrice() {
            let checkGoods = this.listInfo.filter(vaule => this.checkedBoxList.includes(vaule.id));
            let total = 0;
            checkGoods.forEach((item) => {
                total = this.Calculate.accAdd(this.Calculate.accMul(item.shopPrice, item.shopCount), total);
            })
            return total;
        },
        hasNoGoods() {
            return this.listInfo.length ? false : true;
        }
    }

}

</script>
<style scope lang="less">
.goods-list {
    padding: 0 0.24rem;

    .goodsItem {
        position: relative;
        margin-top: 0.24rem;
        height: 2.48rem;
        overflow: hidden;
        // text-align: right;

        .itemContainer {
            float: right;
            transform: translateZ(100px);
            display: flex;
            align-content: center;
            align-items: center;
            padding: 0.24rem 0.32rem;
            background: #fff;
            height: 2.48rem;
            position: absolute;
            width: 100%;
            left: 0;
            top: 0;
            overflow: hidden;

            .left {
                input[type='checkbox'] {
                    display: none;
                }

                input[type='checkbox']+span {
                    position: relative;
                    width: 0.32rem;
                    height: 0.32rem;
                    display: block;

                    i {
                        display: block;
                        width: 0.12rem;
                        height: 0.24rem;
                        border: 2px solid #fff;
                        border-left: none;
                        border-top: none;
                        transform: translate(-50%, -50%) rotate(45deg) scale(0);
                        position: absolute;
                        left: 50%;
                        top: 45%;
                    }
                }

                input[type='checkbox']:checked+span {
                    i {
                        border-color: #AE2309;
                        transform: translate(-50%, -50%) rotate(45deg) scale(1);
                        transition: all 0.3s;
                    }
                }
            }

            .imgbox {
                margin-left: 0.24rem;

                img {
                    display: block;
                    height: 2.0rem;
                    width: 2.0rem;
                    border: none;
                }
            }

            .goodsname {
                flex: 1;
                margin-left: 0.32rem;
                height: 100%;

                .name {
                    font-size: 0.24rem;
                    color: #9F8D89;
                    line-height: 0.34rem;
                    height: 0.68rem;
                    overflow: hidden;
                }

                .price {
                    font-size: 0.28rem;
                    color: #AE2309;
                    line-height: 0.32rem;
                }

                .spinner {
                    display: flex;
                    margin-top: 0.3rem;
                    justify-content: flex-end;

                    span {
                        display: block;
                        width: 0.48rem;
                        height: 0.48rem;
                        font-size: 0.5rem;
                        color: #351009;
                        text-align: center;
                        line-height: 0.46rem;
                    }

                    input[type='text'] {
                        border: none;
                        text-align: center;
                        width: 0.8rem;
                        height: 0.48rem;
                        font-size: 0.28rem;
                        color: #351009;
                    }

                    .border {
                        &::before {
                            border-color: #D4D4D4;
                        }
                    }
                }
            }
        }

        .deletebox {
            width: 1.6rem;
            height: 98%;
            background: #AE2309;
            text-align: center;
            float: right;
            margin-right: 1px;
            margin-top: 1px;

            span {
                display: block;
                width: 100%;
                height: 100%;
                color: #fff;
                line-height: 2.48rem;
                font-size: 0.28rem;
            }
        }

    }

    .hasNoGoods {
        text-align: center;
        padding-top: 3rem;
        font-size: 0.24rem;
        color: #9F8D89;
    }
}

.bottom {
    height: 0.96rem;
    margin: 0 0.24rem;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.18rem;

    .left {
        display: flex;
        align-items: center;
        margin-left: 0.32rem;

        input[type='checkbox'] {
            display: none;
        }

        b {
            font-size: 0.32rem;
            color: #351009;
            margin-left: 0.28rem;
        }

        input[type='checkbox']+span {
            position: relative;
            width: 0.32rem;
            height: 0.32rem;
            display: block;

            i {
                display: block;
                width: 0.12rem;
                height: 0.24rem;
                border: 2px solid #fff;
                border-left: none;
                border-top: none;
                transform: translate(-50%, -50%) rotate(45deg) scale(0);
                position: absolute;
                left: 50%;
                top: 45%;
            }
        }

        input[type='checkbox']:checked+span {
            i {
                border-color: #AE2309;
                transform: translate(-50%, -50%) rotate(45deg) scale(1);
                transition: all 0.3s;
            }
        }
    }

    .right {
        display: flex;
        align-items: center;

        .totalPrice {
            display: flex;
            font-size: 16px;
            margin-right: 0.48rem;

            span {
                color: #351009;
            }

            b {
                color: #AE2309;
            }
        }

        .goAccount {
            width: 1.76rem;
            height: inherit;
            background: #AE2309;
            font-size: 0.32rem;
            color: #fff;
            text-align: center;
            line-height: 0.96rem;
        }
    }
}

</style>
