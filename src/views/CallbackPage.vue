<template>
<div v-if="!loading">
    <NotificationBar />
    <div class="container">
        <h2>Hola {{ name }}!</h2>
    </div>
</div>
<div v-else>
    <pulse-loader :loading="loading"></pulse-loader>
</div>
</template>

<script>
// @ is an alias to /src
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import NotificationBar from '@/components/NotificationBar.vue'

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
      PulseLoader, NotificationBar
  },
  computed: {
    loading() {
      return this.$store.state.loading
    },
    name() {
        return this.$store.state.user.name
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>