import Vue from 'vue'
import App from './App.vue'
import MapView from 'minemap-view'
import 'minemap-view/lib/index.css'

Vue.config.productionTip = false
Vue.use(MapView);
new Vue({
  render: h => h(App),
}).$mount('#app')