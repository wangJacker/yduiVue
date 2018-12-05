<template>
    <yd-layout>
        <naver-bar slot='navbar'></naver-bar>
        <div class="carousel">
            <yd-slider autoplay="3000" pagination-color="#9F8D89" pagination-activecolor="#AE2309">
                <template v-for="item in imgArry">
                    <yd-slider-item>
                        <a href="javascript:void(0)"><img :src="item.img"></a>
                    </yd-slider-item>
                </template>
            </yd-slider>
        </div>
        <div class="nav">
            <ul class="navList">
                <li class="navItem">
                    <span><img src="@/base/images/jd.png" alt=""></span>
                    <b>京东</b>
                </li>
                <li class="navItem">
                    <span><img src="@/base/images/yx.png" alt=""></span>
                    <b>严选</b>
                </li>
                <li class="navItem">
                    <span><img src="@/base/images/autotrophy.png" alt=""></span>
                    <b>自营</b>
                </li>
                <li class="navItem">
                    <span><img src="@/base/images/coupon.png" alt=""></span>
                    <b>优惠券</b>
                </li>
            </ul>
        </div>
        <div class="goodsContainer">
            <h3 class="title">热销单品</h3>
            <yd-infinitescroll :callback="loadMore" ref="scrollLoadeMore">
                <goods-list :goodsList="goods" slot='list'></goods-list>
                <span slot="doneTip">已经加载完了...</span>
            </yd-infinitescroll>
        </div>
        <tab-bar slot='tabbar' :selectedHome='true'></tab-bar>
    </yd-layout>
</template>
<script type="text/javascript">
import naverBar from "@/components/common/naverBar";
import tabBar from "@/components/common/tabBar";
import goodsList from "@/components/common/goodsList";
import { carouselData } from '@/mock/mockData.js';
import { goodsData } from "@/mock/mockData";
import axios from "axios";
export default {
    name: "index",
    components: { naverBar, tabBar, goodsList },
    data: function() {
        return {
            page: 1,
            pageSize: 10,
            goods: [],

        }
    },
    created() {
        this.imgArry = carouselData.imgData;
        this.goods = goodsData.goods;
    },
    methods: {
        loadMore() {
            axios.get('/gets/goodsData').then(function(response) {
                const _list = response.data.goods;
                this.goods = [...this.goods, ..._list];
                if (_list.length < this.pageSize || this.page == 3) {
                    /* 所有数据加载完毕 */
                    this.$refs.scrollLoadeMore.$emit('ydui.infinitescroll.loadedDone');
                    return;
                }

                /* 单次请求数据完毕 */
                this.$refs.scrollLoadeMore.$emit('ydui.infinitescroll.finishLoad');

                this.page++;
            }.bind(this));
        }
    }
}

</script>
<style scope lang="less">
.carousel {
    padding: 0 0.24rem;
    margin-top: 0.16rem;

    .yd-slider-wrapper {
        .yd-slider-item {
            img {
                height: 4.12rem;
            }
        }
    }

    .yd-slider-pagination {
        bottom: 0.24rem;

        .yd-slider-pagination-item {
            display: block;
            width: 0.48rem;
            height: 0.04rem;
            background: #9F8D89;
            border-radius: 0;

        }
    }
}

.nav {
    margin-top: 0.16rem;
    padding: 0 0.24rem;

    .navList {
        padding: 0.32rem 0.48rem;
        background: #fff;
        display: flex;
        justify-content: space-between;

        .navItem {
            span {
                display: block;

                img {
                    display: block;
                    width: 1.12rem;
                    height: 1.12rem;
                }
            }

            b {
                display: block;
                text-align: center;
                font-size: 0.28rem;
                color: #351009;
                line-height: 0.4rem;
            }
        }
    }
}

.goodsContainer {
    margin-top: 0.48rem;
    padding: 0 0.24rem;

    .title {
        font-size: 0.3rem;
        color: #351009;
        line-height: 0.42rem;
        margin-bottom: 0.08rem;
    }
}

</style>
