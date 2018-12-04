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
        <tab-bar slot='tabbar'></tab-bar>
    </yd-layout>
</template>
<script type="text/javascript">
import naverBar from "@/components/common/naverBar";
import tabBar from "@/components/common/tabBar";
import { carouselData } from '@/mock/mockData.js';
export default {
    name: "index",
    components: { naverBar, tabBar },
    data: function() {
        return {
            // title:"优礼微信商城"
            // imgArry: []
        }
    },
    created() {
        this.imgArry = carouselData.imgData;
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
.nav{
    margin-top:0.16rem;
    padding:0 0.24rem;
    .navList{
        padding: 0.32rem 0.48rem;
        background: #fff;
        display: flex;
        justify-content: space-between;
        .navItem{
            span{
                display: block;
                img{
                    display: block;
                    width: 1.12rem;
                    height: 1.12rem;
                }
            }
            b{
                display: block;
                text-align: center;
                font-size: 0.28rem;
                color: #351009;
                line-height: 0.4rem;
            }
        }
    }
}
</style>
