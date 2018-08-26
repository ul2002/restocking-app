<template>
  <v-container>
    <v-layout class="hidden-xs-only">  
      <v-flex xs12 sm6 offset-sm3>
        <v-breadcrumbs>
          <v-breadcrumbs-item to="/" exact>Home</v-breadcrumbs-item>
          <v-breadcrumbs-item>Items</v-breadcrumbs-item>
        </v-breadcrumbs>
      </v-flex>
    </v-layout>    
    <v-layout>  
      <v-flex xs12 sm6 offset-sm3 mb-2>
        <h2 class="secondary--text">Items</h2>
      </v-flex>
    </v-layout>

    <v-layout>  
      <v-flex xs12 sm6 offset-sm3 mb-2>    
        <v-layout row wrap>
          <v-spacer></v-spacer>
          <v-text-field v-model="search"
                        append-icon="search"
                        label="Search"
                        single-line
                        hide-details></v-text-field>
        </v-layout>
      </v-flex>
    </v-layout>
     <v-layout row wrap>
      <v-flex xs12 sm8 offset-sm3 mb-2>
        <v-data-table
          :headers="headers"
          :items="items"
          hide-actions
          class="elevation-1"
          :loading="isLoading"
          :search="search"
        >
        <template slot="items" slot-scope="props">
          <td>{{ props.item.name }}</td>
          <td class="text-xs-left">{{ props.item.quantity }}</td>
          <td class="text-xs-left">{{ props.item.amount }}</td>
          <td class="text-xs-left">{{ props.item.status }}</td>
          <td class="text-xs-left">
            
            <v-btn icon class="mx-0" @click="restockItem(props.item.id)" v-if="isAdmin">
              <v-icon color="secondary">add_shopping_cart</v-icon>
            </v-btn>
            <v-btn icon class="mx-0" @click="editItem(props.item.id)">
              <v-icon color="secondary">edit</v-icon>
            </v-btn>
            <v-btn icon class="mx-0" @click="deleteItem(props.item.id)" v-if="isAdmin">
              <v-icon color="secondary">delete</v-icon>
            </v-btn>
            
          </td>
        </template>
      </v-data-table>

      </v-flex>
    </v-layout>
    
    <v-layout>
      <v-flex xs12 sm6 offset-sm3>   
        <v-layout justify-end align-end>
          <v-btn fab dark color="primary" @click="showForm" v-if="isAdmin">
            <v-icon dark>add</v-icon>
          </v-btn>
        </v-layout>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex xs12 sm-6 offset-sm3>
        <item-dialog :show="showDialog" @onHideForm="hideForm" />
      </v-flex>
    </v-layout>

  </v-container>
</template>

<script>
import itemDialog from '@/components/items/item-dialog'
import { FETCH_ITEMS, DELETE_ITEM, RESTOCK_ITEM, ENABLE_EDIT_MODE, DISABLE_EDIT_MODE } from '@/store/types'

export default {
  name: 'stock-page',
  components: {
    itemDialog
  },
  data() {
    return {
      search: '',
      showDialog: false,
      headers: [
          { text: 'Name', value: 'name' },
          { text: 'Quantity', value: 'quantity', sortable: false },
          { text: 'Amount', value: 'amount', sortable: false },
          { text: 'Status', value: 'status', sortable: false },
          { text: 'actions', value: 'name', sortable: false } 
        ],
    }
  },
  computed: {
    items() {
      return this.$store.getters.items
    },
    isLoading() {
      return this.$store.getters.isLoading
    }
  },

  methods: {
    showForm() {
      this.showDialog = true
    },
    hideForm() {
      this.showDialog = false
      this.$store.dispatch(DISABLE_EDIT_MODE)
    },
    editItem(id) {
      this.$store.dispatch(ENABLE_EDIT_MODE, id)
      this.showDialog = true
    },
    deleteItem(id) {
      this.$store.dispatch(DELETE_ITEM, id)
    },
    restockItem(id) {
       this.$store.dispatch(RESTOCK_ITEM, {id: id,stock: 1})
    }
  },
  created() {
    this.$store.dispatch(FETCH_ITEMS)
  },

}
</script>
