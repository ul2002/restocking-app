import Vue from 'vue'
import * as types from './types'

function convertDataToItems(data) {
  const items = []
  for(let key in data) {
    items.push({
      id: data[key].id,
      name: data[key].name,
      quantity: data[key].quantity,
      amount: data[key].amount,
      status: data[key].status,
      restock: data[key].restock
    })
  }
  return items
}

function convertPayloadToItem(payload) {
  let quantity = (!payload.quantity || payload.quantity === '') ? 0 : parseInt(payload.quantity)
  let amount = (!payload.amount || payload.amount === '') ? 0 : parseInt(payload.amount)
  let status = payload.status
  const item = {name: payload.name, quantity: quantity, amount: amount, status: status}
  return item
}

export default {
  state: {
    items: [],
    restocks: [],
    item: null,
    isLoading: false,
    isEditMode: false
  },
  getters: {
    items(state) {
      return state.items
    },
    item(state) {
      return state.item
    },
    restocks(state) {
      return state.restocks
    },
    isLoading(state) {
      return state.isLoading
    },
    isEditMode(state) {
      return state.isEditMode
    }
  },
  mutations: {
    [types.SET_ITEMS](state,payload) {
      state.items = payload
    },
    [types.SET_ITEM](state, payload) {
      state.item = payload
    },
    [types.ADD_ITEM](state, payload) {
      state.items.push(payload)
    },
    [types.SET_LOADING_STATE](state, payload) {
      state.isLoading = payload
    },
    [types.REMOVE_ITEM](state, payload) {
      var removeIndex = state.items.map(function(item) { return item.id; }).indexOf(payload);
      state.items.splice(removeIndex, 1);  
    },
    [types.REPLACE_ITEM](state, payload) {      
      var updateIndex = state.items.map(function(item) { return item.id; }).indexOf(payload.id);
      Vue.set(state.items, updateIndex, payload)
    },
    [types.SET_EDIT_MODE](state, payload) {
      state.isEditMode = payload
    }
  },
  actions: {
    [types.CLEAR_ITEMS]({commit}) {
      commit(types.SET_ITEMS, [])
    },
    [types.FETCH_ITEMS]({commit}) {
      commit(types.SET_LOADING_STATE, true)

      axios.get(types.PRODUCTS).then(
         function(response){
            const items = convertDataToItems(response.data.items)
            commit(types.SET_ITEMS, items)
            commit(types.SET_LOADING_STATE, false)
         }

      ).catch(function(error){ console.log(error.message); })
    },
    [types.CREATE_ITEM]({commit}, payload) {
      const item = convertPayloadToItem(payload)

      axios.post(types.PRODUCTS, item).then(
         function(response){
            item.id=response.data.id
            commit(types.ADD_ITEM, item)
         }

      ).catch(function(error){ console.log(error.message); })
    },
    [types.DELETE_ITEM]({commit}, payload) {
      axios.delete(types.PRODUCT+payload).then(
         function(response){
            commit(types.REMOVE_ITEM, payload)
         }
      ).catch(function(error){ console.log(error.message); })
      
    },
    [types.UPDATE_ITEM]({commit}, payload) {
        const item = convertPayloadToItem(payload)
        axios.put(types.PRODUCT+payload.id,item).then(
         function(response){
            commit(types.REPLACE_ITEM, payload)
         }
      ).catch(function(error){ console.log(error.message);})
    },
    [types.RESTOCK_ITEM]({commit}, payload) {
        axios.put(types.PRODUCT+payload.id,{restock: 1}).then(
         function(response){
            //commit(types.REPLACE_ITEM, payload)
         }
      ).catch(function(error){ console.log(error.message);})
    },
    [types.ENABLE_EDIT_MODE]({commit}, payload) {
        commit(types.SET_ITEM, payload)
        commit(types.SET_EDIT_MODE, true)
    },
    [types.DISABLE_EDIT_MODE]({commit}) {
      commit(types.SET_EDIT_MODE, false)
    }
  }
}

