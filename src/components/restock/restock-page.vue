<template>
  <v-container>
    <v-layout class="hidden-xs-only">  
      <v-flex xs12 sm6 offset-sm3>
        <v-breadcrumbs>
          <v-breadcrumbs-item to="/" exact>Home</v-breadcrumbs-item>
          <v-breadcrumbs-item>Restocking List</v-breadcrumbs-item>
        </v-breadcrumbs>
      </v-flex>
    </v-layout>    
    <v-layout>  
      <v-flex xs12 sm6 offset-sm3>
        <h2 class="secondary--text">Restocking List</h2>
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
        </template>
      </v-data-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'restock-page',
  data() {
    return {
      search: '',
      showDialog: false,
      headers: [
          { text: 'Name', value: 'name' },
          { text: 'Quantity', value: 'quantity', sortable: false },
          { text: 'Amount', value: 'amount', sortable: false },
          { text: 'Status', value: 'status', sortable: false },
          { text: '', value: 'name', sortable: false } 
        ],
    }
  },
  computed: {
    items() {
      return this.$store.getters.items.filter(item => item.restock == 1)
    },
    isLoading() {
      return this.$store.getters.isLoading
    }
  },
}
</script>

