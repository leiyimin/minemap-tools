import Vue from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import { ColorPicker } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import MapView from 'minemap-view'
import 'minemap-view/lib/index.css'

Vue.config.productionTip = false;
Vue.use(Antd);
Vue.component(ColorPicker.name, ColorPicker);
Vue.use(MapView);
Vue.prototype.$eBus=new Vue();
new Vue({
  render: h => h(App),
}).$mount('#app')