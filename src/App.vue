<template>
  <v-app>

    <v-navigation-drawer app temporary v-model="drawer">
      <v-list v-if="isSignedIn">
        <v-list-tile router to="/items">
          <v-list-tile-action><v-icon>list</v-icon></v-list-tile-action>
          <v-list-tile-content>Items</v-list-tile-content>
        </v-list-tile>
        <v-list-tile router to="/restock" v-if="isAdmin">
          <v-list-tile-action><v-icon>playlist_add_check</v-icon></v-list-tile-action>
          <v-list-tile-content>Restocking list</v-list-tile-content>
        </v-list-tile>
        <v-list-tile router @click="signOut">
          <v-list-tile-action><v-icon>exit_to_app</v-icon></v-list-tile-action>
          <v-list-tile-content>Sign out</v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-list v-if="!isSignedIn">
        <v-list-tile router to="/signin">
          <v-list-tile-action><v-icon>lock_open</v-icon></v-list-tile-action>
          <v-list-tile-content>Sign in</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
   
    <v-toolbar app dark class="primary" >
      <v-toolbar-side-icon class="hidden-sm-and-up" @click="toggleDrawer"></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">
          RESTOCKING
          <span class="third--text" v-if="isSignedIn"> ( {{ role }}  ) </span>
         </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <template v-if="isSignedIn">
          <v-btn flat to="/items"><v-icon left>list</v-icon>Items</v-btn>
          <v-btn flat to="/restock" v-if="isAdmin"><v-icon left>playlist_add_check</v-icon>Restocking list</v-btn>
          <v-btn flat @click="signOut"><v-icon left>exit_to_app</v-icon>Sign out</v-btn>
        </template>
        <template v-if="!isSignedIn">
          <v-btn flat to="/signin"><v-icon left>lock_open</v-icon>Sign in</v-btn>
        </template>  
      </v-toolbar-items>
    </v-toolbar>

    <v-content>
      <router-view/>       
     </v-content>

  </v-app>
</template>

<script>
import { SIGNOUT,ROLE_ADMIN,ROLE_WORKER } from '@/store/types'

export default {
  name: 'App',
  data() {
    return {
      drawer: false
    }
  },
  computed: {
    isSignedIn() {
      return this.$store.getters.isUser
    },
    role() {
      if (this.isAdmin) {
        return ROLE_ADMIN
      }
      return ROLE_WORKER
      
    }
  },
  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer
    },
    signOut() {
      this.$store.dispatch(SIGNOUT)
      this.$router.push("/")
    }
  },
  watch: {
    isSignedIn(newValue) {
      if(newValue) {
        this.$router.push('/')
      }
    }
  }
}
</script>
