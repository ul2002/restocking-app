import Vue from 'vue'
import globalMixins from './mixins/global'
import App from './App'
import router from './router'
import store from './store'


// Vuetify
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import colors from 'vuetify/es5/util/colors'

require('./bootstrap')

Vue.use(Vuetify, {
  theme: {
    secondary: colors.grey.darken2,
  }
})

// Validation
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

Vue.config.productionTip = false

/* eslint-disable no-new */

import { AUTO_SIGNIN, CLEAR_ITEMS } from '@/store/types'

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
