<template>
    <div class="footer">
        <ul class="tabList">
            <li class="tabItem" :class="{selectedHome:selectedHome}">
                <router-link to='/'>
                    <span class="icon"></span>
                    <a href="javascript:void(0)">商城</a>
                </router-link>
            </li>
            <li class="tabItem" :class="{selectedClass:selectedClass}">
                <router-link to='/Classify'>
                    <span class="icon"></span>
                    <a href="javascript:void(0)">分类</a>
                </router-link>
            </li>
            <li class="tabItem" :class="{selectedCart:selectedCart}">
                <router-link to='/carts'>
                    <span class="icon"></span>
                    <a href="javascript:void(0)">购物车</a>
                </router-link>
            </li>
            <li class="tabItem" :class="{selectedMy:selectedMy}">
                <span class="icon"></span>
                <a href="javascript:void(0)">个人中心</a>
            </li>
        </ul>
    </div>
</template>
<script type="text/javascript">
export default {
    name: "tabBar",
    props: {
        selectedMy: {
            type: Boolean,
            default: false
        },
        selectedCart: {
            type: Boolean,
            default: false
        },
        selectedClass: {
            type: Boolean,
            default: false
        },
        selectedHome: {
            type: Boolean,
            default: false
        }
    }
}

</script>
<style scope lang="less">
@images: "../../base/images";

.footer {
    .tabList {
        height: 0.98rem;
        background: #fff;
        display: flex;
        justify-content: space-around;

        .tabItem {
            margin-top: 0.14rem;
            display: flex;
            flex-direction: column;
            align-items: center;

            span {
                display: block;
                width: 0.56rem;
                height: 0.48rem;
            }

            a {
                margin-top: 0.04rem;
                font-size: 0.2rem;
                color: #9F8D89;
            }
        }

        .tabItem:nth-child(1) {
            span {
                background: url("@{images}/store.png") center no-repeat;
                background-size: contain;
            }
        }

        .tabItem:nth-child(2) {
            span {
                background: url("@{images}/classify.png") center no-repeat;
                background-size: 0.4rem;
            }
        }

        .tabItem:nth-child(3) {
            span {
                background: url("@{images}/cart.png") center no-repeat;
                background-size: contain;
            }
        }

        .tabItem:nth-child(4) {
            span {
                background: url("@{images}/myCenter.png") center no-repeat;
                background-size: contain;
            }
        }

        .tabItem.selectedMy {
            span {
                background: url("@{images}/myCenter_selected.png") center no-repeat;
                background-size: contain;
            }

            a {
                color: #351009;
            }
        }

        .tabItem.selectedCart {
            span {
                background: url("@{images}/cart_selected.png") center no-repeat;
                background-size: contain;
            }

            a {
                color: #351009;
            }
        }

        .tabItem.selectedClass {
            span {
                background: url("@{images}/classify_selected.png") center no-repeat;
                background-size: contain;
            }

            a {
                color: #351009;
            }
        }

        .tabItem.selectedHome {
            span {
                background: url("@{images}/store_selected.png") center no-repeat;
                background-size: contain;
            }

            a {
                color: #351009;
            }
        }

    }
}

</style>
