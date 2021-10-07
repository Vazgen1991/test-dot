import Vue from 'vue'
import App from './App.vue'
import Multiselect from 'vue-multiselect'
require('./assets/app.scss');

Vue.config.productionTip = false
Vue.use(Multiselect);

new Vue({
  render: h => h(App),
}).$mount('#app')
