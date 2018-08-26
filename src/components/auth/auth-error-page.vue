<template>
  <v-container>
    <v-layout class="hidden-xs-only">  
      <v-flex xs12 sm6 offset-sm3>
        <v-breadcrumbs>
          <v-breadcrumbs-item to="/" exact>Home</v-breadcrumbs-item>
          <v-breadcrumbs-item>Sign in</v-breadcrumbs-item>
        </v-breadcrumbs>
      </v-flex>
    </v-layout>  
    <v-layout>  
      <v-flex xs12 sm6 offset-sm3 lg4 offset-lg4>
        <h2 class="secondary--text">Unauthorised</h2>
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex xs12 sm6 offset-sm3 lg4 offset-lg4>
        <v-alert type="error" :value="true" outline>
          You are not authorised to access this page. Please signin to continue.
        </v-alert>
      </v-flex>
    </v-layout>



    <signin-form></signin-form>

  </v-container>
</template>

<script>
import signinForm from '@/components/auth/signin-form'

export default {
  name: 'auth-error-page',
  components: {
    signinForm
  }
}
</script>
