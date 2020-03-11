import Vue from 'vue'
import App from './App.vue'
import { ColorPicker } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import MapView from 'minemap-view'
import 'minemap-view/lib/index.css'

Vue.config.productionTip = false;
Vue.use(Antd);
Vue.component(ColorPicker.name, ColorPicker);
Vue.use(MapView);
Vue.prototype.$eBus=new Vue();
String.prototype.toPoint=function (reg) {
  if (!reg && reg !== ' ') reg = ' ';
  if (!this || this.indexOf(reg) <= 0) return null;
  let arr = this.split(reg);
  return [parseFloat(arr[0]), parseFloat(arr[1])];
};
new Vue({
  render: h => h(App),
}).$mount('#app')