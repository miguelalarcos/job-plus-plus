<template>
<div v-if="!loading">
    <div class="container">
        <h2>Hola {{ name }}!</h2>
        <div>Estás logeado como {{ email }}</div>
    </div>
</div>
<div v-else>
    <pulse-loader :loading="loading"></pulse-loader>
</div>
</template>

<script>
// @ is an alias to /src
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

export default {
  name: 'callback',
  data: function(){
      return { 
          
      }
  },
  created: function(){
      this.$store.dispatch('getLoginAction', {code: this.$route.query.code})
  },
  components: {
      PulseLoader
  },
  computed: {
    loading() {
      return this.$store.state.loading
    },
    name() {
        return this.$store.state.user.name
    },
    email(){
        return this.$store.state.user.email
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>