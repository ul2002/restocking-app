<template>
  <v-container>
    <v-layout class="hidden-xs-only">  
      <v-flex xs12 sm6 offset-sm3>
        <v-breadcrumbs>
          <v-breadcrumbs-item>Home</v-breadcrumbs-item>
        </v-breadcrumbs>
      </v-flex>
    </v-layout>    
    <v-layout>  
      <v-flex xs12 sm6 offset-sm3>
        <dashboard v-if="isSignedIn"/>
        <welcome v-if="!isSignedIn"/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import dashboard from '@/components/home/dashboard'
import welcome from '@/components/home/welcome'

  export default {
    name: 'home-page',
    components: {
      welcome,
      dashboard
    },
    computed: {
    isSignedIn() {
      return this.$store.getters.isUser
    }
    }
  }
</script>
