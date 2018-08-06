<template>
  <div class="container">
    <a href="https://github.com/login/oauth/authorize?scope=user:email&client_id=96da7965ccc12aa06055">login with github</a> 
    <b-button @click="fake_login('miguelalarcos')">fake login miguelalarcos</b-button>
    <b-button @click="fake_login('acme-sl')">fake login acme</b-button>
    {{ name }}
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'login',
  data: function(){
      return { }
  },
  created: function(){
    //this.$store.dispatch('getLoginAction', {name: this.$route.query.name})
  },
  components: {
    
  },
  computed: {
    loading() {
      return this.$store.state.loading
    },
    name() {
        return this.$store.state.user.name
    }
  },
  methods:{
    fake_login(login) {
      this.$store.dispatch('getFakeLoginAction', {login})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>