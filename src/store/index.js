import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth'
import items from './items'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    items
  }
})