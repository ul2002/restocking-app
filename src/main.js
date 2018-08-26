import Vue from 'vue'
import globalMixins from './mixins/global'
import App from './App'
import router from './router'
import store from './store'


// Vuetify
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import colors from 'vuetify/es5/util/colors'

// Firebase
import * as firebase from 'firebase'

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
  template: '<App/>',
  created() {
    firebase.initializeApp({
      apiKey: "AIzaSyCuzkG5_Ve0n5w8hJ2ceZdHF7dfq1TxL-E",
      authDomain: "restock-55c4b.firebaseapp.com",
      databaseURL: "https://restock-55c4b.firebaseio.com",
      projectId: "restock-55c4b",
      storageBucket: "restock-55c4b.appspot.com",
      messagingSenderId: "1098534049698",
    }),
    firebase.auth().onAuthStateChanged((user)=> {
      this.$store.dispatch(CLEAR_ITEMS)
      if(user) {
        this.$store.dispatch(AUTO_SIGNIN, user)
      }
    })
  }
})
