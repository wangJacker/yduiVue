import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import WechatTitle from "vue-wechat-title";
const Index = () => import('@/components/pages/index/index');
const Classify = () => import('@/components/pages/classify/classify');

Vue.use(Router);
Vue.use(WechatTitle);

export default new Router({
    routes: [{
            path: '/',
            name: 'index',
            redirect: '/index',
            meta: {
                title: "微信商城"
            }
        },
        {
            path: '/index',
            name: 'indexhome',
            component: Index,
            meta: {
                title: "微信商城"
            }
        },
        {
            path: '/Classify',
            name: 'classify',
            component: Classify,
            meta: {
                title: "商品分类"
            }
        }
    ]
})
