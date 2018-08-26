import Vue from 'vue'

export default Vue.mixin({
    data: () => ({
        
    }),
    computed: {
        isAdmin() {
          return this.$store.getters.isAdmin
        }
  },
    methods: {

    }
})
