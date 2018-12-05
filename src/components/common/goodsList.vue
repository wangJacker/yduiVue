<template>
    <ul class="goodsList">
        <li class="goodsItem" v-for="(item,index) in goodsList" :key="index">
            <img :src="item.src">
            <p>{{item.name}}</p>
            <span class="price">{{item.price}}</span>
        </li>
    </ul>
</template>
<script type="text/javascript">
export default {
    name: 'goodsList',
    props: ["goodsList"]
}

</script>
<style scope lang="less">
.goodsList {
    overflow: hidden;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .goodsItem {
        float: left;
        width: 3.38rem;
        box-sizing: border-box;
        height: 4.76rem;
        background: #fff;
        padding: 0.24rem 0.24rem 0 0.24rem;
        margin-top: 0.24rem;

        img {
            display: block;
            width: 2.9rem;
            height: 2.9rem;
        }

        p {
            font-size: 0.24rem;
            color: #9F8D89;
            line-height: 0.34rem;
            height: 0.68rem;
            overflow: hidden;
            margin-top: 0.32rem;
        }

        .price {
            font-size: 0.28rem;
            color: #AE2309;
            line-height: 0.32rem;
        }
    }
}

</style>
