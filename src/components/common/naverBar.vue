<template>
    <div class="header borderTop" v-wechat-title="$route.meta.title">
        <span class="goBack"></span>
        <h3 class="title">{{$route.meta.title}}</h3>
        <span class="search"></span>
    </div>
</template>
<script type="text/javascript">
export default {
    name: "naverBar",
}

</script>
<style scope lang="less">
@imgaes: "../../base/images";

.header {
    display: flex;
    height: 0.9rem;
    box-sizing: border-box;
    justify-content: space-between;
    align-items: center;
    background: #fff;
    padding: 0 0.24rem;
    &:before{
        border-color: #FBF8F7;
        color: #FBF8F7;
    }

    span {
        display: block;
        width: 0.4rem;
        height: 0.4rem;
    }
    .title{
        font-size: 0.28rem;
        color: #351009;
    }
    .goBack {
        background: url("@{imgaes}/goback.png") center no-repeat;
        background-size: contain;
    }
    .search{
        background: url("@{imgaes}/search.png") center no-repeat;
        background-size: contain;
    }
}

</style>
