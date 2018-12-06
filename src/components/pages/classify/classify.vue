<template>
    <yd-layout>
        <naver-bar slot='navbar'></naver-bar>
        <div class="classifyContainer" slot="">
            <ul class="menuList">
                <li class="menuItem" v-for="(item, index) in menuData" :key="index">
                    <p>{{item.name}}</p>
                </li>
            </ul>
            <ul class="menuGoods">
                <li class="goods">
                    <img src="https://via.placeholder.com/64x64">
                    <p>除味皂除味皂除味皂</p>
                </li>
            </ul>
        </div>
        <tab-bar slot='tabbar' :selectedClass='true'></tab-bar>
    </yd-layout>
</template>
<script type="text/javascript">
import naverBar from "@/components/common/naverBar";
import tabBar from "@/components/common/tabBar";
import { menuData } from "@/mock/mockData";
export default {
    name: "classify",
    components: { naverBar, tabBar },
    created() {
        this.menuData = menuData.menu;
        console.log(menuData)
    }
}

</script>
<style scope lang="less">
#scrollView:after {
    height: 0;
}
#scrollView{
    display: flex;
    flex-direction: column;
}
.classifyContainer {
    display: flex;
    justify-content: space-between;
    padding: 0 0.24rem;
    overflow: hidden;
    flex: 1;

    .menuList {
        position: relative;
        width: 1.6rem;
        height: inherit;
        overflow: auto;

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

        .menuItem:first-child {
            margin-top: 0;
        }
    }
}

</style>
