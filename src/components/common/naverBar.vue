<template>
    <div class="header borderTop" v-wechat-title="$route.meta.title">
        <span class="goBack"></span>
        <h3 class="title">{{$route.meta.title}}</h3>
        <span v-if="showIcon === 'search'" class="search"></span>
        <span v-else-if="showIcon === 'edit'" class="edit" @click="changeDeleteAll">{{eidt}}</span>
    </div>
</template>
<script type="text/javascript">
export default {
    name: "naverBar",
    data() {
        return {
            eidt: '编辑'
        }
    },
    props: {
        showIcon: {
            type: String,
            default: 'search'
        }
    },
    methods: {
        changeDeleteAll(num) {
            this.eidt = this.eidt == '编辑' ? '完成' : "编辑";
            this.$emit('changeDelete');
        }
    }
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

    &:before {
        border-color: #FBF8F7;
        color: #FBF8F7;
    }

    span.search {
        display: block;
        width: 0.4rem;
        height: 0.4rem;
    }

    span.goBack {
        display: block;
        width: 0.4rem;
        height: 0.4rem;
    }

    span.edit {
        font-size: 0.28rem;
        color: #351009;
    }

    .title {
        font-size: 0.28rem;
        color: #351009;
    }

    .goBack {
        background: url("@{imgaes}/goback.png") center no-repeat;
        background-size: contain;
    }

    .search {
        background: url("@{imgaes}/search.png") center no-repeat;
        background-size: contain;
    }
}

</style>
