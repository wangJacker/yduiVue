<template>
    <yd-layout>
        <naver-bar slot='navbar' :showIcon='edit'></naver-bar>
        <ul class="goods-list">
            <li class="goodsItem" v-for="(item, index) in listInfo" :key='item.id'>
                <div class="itemContainer">
                    <div class="left">
                        <input type="checkbox" :value='index' v-model='checkedBoxList'>
                        <span class='border' @click='handleChecked(index)'>
                            <i></i>
                        </span>
                    </div>
                    <div class="imgbox">
                        <img src="http://dummyimage.com/'64x64'/b7ef7c" alt="">
                    </div>
                        <div class="goodsname">
                            <p class="name">{{item.shopName}}</p>
                            <p class="price">{{item.shopPrice}}</p>
                            <div class="spinner">
                                <span class='border' @click="reduce(index)">-</span>
                                <input type="text" name="" @keyup='handleChange(index,$event)' v-model.number='item.shopCount'>
                                <span class='border' @click="add(index)">+</span>
                            </div>
                        </div>
                    </div>
                    <div class="deletebox">
                        <span>删除</span>
                    </div>
            </li>
        </ul>
        <tab-bar slot='tabbar' :selectedCart='true'></tab-bar>
    </yd-layout>
</template>
<script type="text/javascript">
import naverBar from "@/components/common/naverBar";
import tabBar from "@/components/common/tabBar";

export default {
    name: 'carts',
    data() {
        return {
            edit: "edit",
            checkedBoxList: [],
            listInfo: [
                { id: 1, shopName: "男装1", shopPrice: 1000, shopCount: 0 },
                { id: 2, shopName: "男装2", shopPrice: 2000, shopCount: 0 },
                { id: 3, shopName: "男装3", shopPrice: 3000, shopCount: 0 },
                { id: 4, shopName: "男装4", shopPrice: 4000, shopCount: 0 },
                { id: 5, shopName: "男装5", shopPrice: 5000, shopCount: 0 },
            ],
        }
    },
    components: { naverBar, tabBar },
    mounted() {
        let scroll = document.getElementById('scrollView');
        this.overflowScroll(scroll);
    },
    methods: {
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
        handleChange(index, e) {
            if (e.target.value.length == 1) {
                this.listInfo[index].shopCount = e.target.value.replace(/[^1-9]/g, '')
            } else {
                this.listInfo[index].shopCount = e.target.value.replace(/\D/g, '')
                console.log(e.target.value)
            }
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

        .itemContainer {
            display: flex;
            align-content: center;
            align-items: center;
            padding: 0.24rem 0.32rem;
            background: #fff;
            height: 2.48rem;
            position: absolute;
            left: 0;
            top: 0;
            z-index: 1;
            width: 100%;
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
            width: 1.2rem;
            height: 100%;
            background: red;
            position: absolute;
            top: 0;
            right: 0;
            z-index: -12232;
        }

    }
}

</style>
