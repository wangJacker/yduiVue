<template>
    <div class="section">
        <naver-bar></naver-bar>
        <div class="classifyContainer">
            <div class="menuContainer" ref='scrollMenu'>
                <ul class="menuList">
                    <li class="menuItem" :class="{cur:index==current}" v-for="(item, index) in menuData" :key="index" @click="handleClick(index,$event)">
                        <p>{{item.name}}</p>
                    </li>
                </ul>
            </div>
            <ul class="menuGoods" ref='menuGoods'>
                <template v-for="(item, index) in classify">
                    <li class="goods">
                        <img :src="item.src">
                        <p>{{item.name}}</p>
                    </li>
                </template>
            </ul>
        </div>
        <tab-bar :selectedClass='true'></tab-bar>
    </div>
</template>
<script type="text/javascript">
import naverBar from "@/components/common/naverBar";
import tabBar from "@/components/common/tabBar";
import { menuData } from "@/mock/mockData";
import BScroll from "better-scroll";
import { CLASSFILY } from '@/base/url';
import axios from 'axios';
export default {
    name: "classify",
    components: { naverBar, tabBar },
    created() {
        this.menuData = menuData.menu;
    },
    data() {
        return {
            current: 0,
            scroll: "",
            scrollContainer: "",
            maxScrollY: "",
            classify: []
        }
    },
    mounted() {
        this.overflowScroll(this.$refs.scrollMenu);
        this.overflowScroll(this.$refs.menuGoods);
        // 这里的 this.$nextTick 是一个异步函数，为了确保 DOM 已经渲染
        this.$nextTick(() => {
            this.scroll = new BScroll(this.$refs.scrollMenu, {
                click: true,
                probeType: 2,
            });
            this.scrollContainer = this.$refs.scrollMenu.clientHeight;
            this.maxScrollY = this.scroll.maxScrollY;
        })
        this.init();
    },
    computed: {
        maxHeight() {
            return -this.maxScrollY + this.scrollContainer / 2;
        }
    },
    methods: {
        async handleClick(index, e) {
            this.current = index;
            let $this = e.currentTarget;
            // 获取当前元素距离容器顶部的距离
            let slideTop = $this.offsetTop;
            // 获取当前元素的高度
            let slideHeight = $this.clientHeight;
            // 中间位置
            let slideCenter = slideTop + slideHeight / 2;
            // 判断位置
            if (slideCenter < this.scrollContainer / 2) {
                // 滚动为0；
                this.scroll.scrollTo(0, 0, 500);
            } else if (slideCenter > this.maxHeight) {
                // 滚动到最大位置
                this.scroll.scrollTo(0, this.maxScrollY, 500);
            } else {
                this.scroll.scrollTo(0, -(slideCenter - this.scrollContainer / 2), 500);
            }
            this.$dialog.loading.open('正在加载中...');
            //获取右边值
            await axios.get(CLASSFILY).then(function(data) {
                this.classify = data.data.goods;
                // console.log(data.data.goods)
            }.bind(this))
            this.$dialog.loading.close();
            this.$dialog.toast({
                mes: '加载成功！',
                icon: 'success'
            })
            this.$refs.menuGoods.scrollTop = 0;
        },
        init() {
            axios.get(CLASSFILY).then(function(data) {
                this.classify = data.data.goods;
            }.bind(this))
        }
    }
}

</script>
<style scope lang="less">
.section {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.classifyContainer {
    display: flex;
    justify-content: space-between;
    padding: 0 0.24rem;
    margin-top: 0.16rem;
    overflow: hidden;
    flex: 1;

    .menuList {
        position: relative;
        width: 1.6rem;
        height: inherit;
        overflow: hidden;
        -webkit-overflow-scrolling: touch;

        .menuItem {
            padding: 0 0.32rem;
            height: 0.8rem;
            background: #fff;
            margin-top: 0.04rem;

            p {
                font-size: 0.24rem;
                color: #9F8D89;
                line-height: 0.34rem;
                max-height: 0.68rem;
                overflow: hidden;
                position: relative;
                text-align: center;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
            }
        }

        .cur {
            background: #AE2309;

            p {
                color: #fff;
            }
        }

        .menuItem:first-child {
            margin-top: 0;
        }
    }

    .menuGoods {
        margin-left: 2px;
        flex: 1;
        overflow: hidden;
        background: #fff;
        display: flex;
        align-content: flex-start;
        -webkit-align-content: flex-start;
        flex-flow: wrap;
        overflow: auto;
        -webkit-overflow-scrolling: touch;
        padding: 0 0.13rem;

        .goods {
            padding: 0.48rem 0 0 0.32rem;

            img {
                width: 1.28rem;
                height: 1.28rem;
                display: block;
                border: none;
            }

            p {
                line-height: 0.34rem;
                width: 1.28rem;
                height: 0.68rem;
                overflow: hidden;
                margin-top: 0.16rem;
                font-size: 0.24rem;
                color: #351009;
            }
        }
    }
}

</style>
