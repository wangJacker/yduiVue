// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import "@/base/css/app.less";
import 'vue-ydui/dist/ydui.base.css';
import { Layout } from 'vue-ydui/dist/lib.rem/layout';
import { Button, ButtonGroup } from 'vue-ydui/dist/lib.rem/button';
import { Slider, SliderItem } from 'vue-ydui/dist/lib.rem/slider';
import { InfiniteScroll } from 'vue-ydui/dist/lib.rem/infinitescroll';
import { Confirm, Alert, Toast, Notify, Loading } from 'vue-ydui/dist/lib.rem/dialog';
import StopRolling from "@/base/js";
Vue.component(Layout.name, Layout);
Vue.component(Button.name, Button);
Vue.component(ButtonGroup.name, ButtonGroup);
Vue.component(Slider.name, Slider);
Vue.component(SliderItem.name, SliderItem);
Vue.component(InfiniteScroll.name, InfiniteScroll);
Vue.use(StopRolling);
Vue.config.productionTip = false
Vue.prototype.$dialog = {
    confirm: Confirm,
    alert: Alert,
    toast: Toast,
    notify: Notify,
    loading: Loading,
};
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})
