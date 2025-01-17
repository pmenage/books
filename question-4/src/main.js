import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import Fragment from 'vue-fragment';

Vue.config.productionTip = false
Vue.use(Fragment.Plugin)

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
