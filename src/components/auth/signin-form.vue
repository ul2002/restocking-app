<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3 lg4 offset-lg4 v-if="hasSigninError">
        <v-alert type="error" :value="true" outline>
          {{ signinError }}
        </v-alert>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3 lg4 offset-lg4>
        <form @keyup.enter="onSignin">
          <v-text-field name="email" 
                        label="Email" 
                        id="email" 
                        v-model="email" 
                        @blur="$v.email.$touch()" 
                        :error-messages="emailErrors"
                        required></v-text-field>  
          <v-text-field name="password" 
                        label="Password" 
                        id="password" 
                        type="password" 
                        v-model="password" 
                        @blur="$v.password.$touch()" 
                        :error-messages="passwordErrors"
                        required></v-text-field>  
          <v-btn color="primary" @click="onSignin">Sign in</v-btn>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { SIGNIN } from '@/store/types'
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'signin-form',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  validations: {
    email: {
      required
    },
    password: {
      required
    }
  },
  computed: {
    signinError() {
      return this.$store.getters.authError
    },
    hasSigninError() {
      return this.$store.getters.hasAuthError
    },
    emailErrors() {
      const errors = []
      if (!this.$v.email.$dirty) return errors 
      !this.$v.email.required && errors.push('Email is required.')
      return errors
    },
    passwordErrors() {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.required && errors.push('Password is required.')        
      return errors
    },
  },
  methods: {
    onSignin() {
      this.$v.$touch()
      if(!this.$v.$error) {
        this.$store.dispatch(SIGNIN, {email: this.email, password: this.password})
      } else {
        console.log("Error")
      }
    }
  }
}
</script>

