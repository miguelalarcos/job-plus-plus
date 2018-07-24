<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Mis ofertas</router-link> |
      <router-link to="/my-candidatures">Candidaturas</router-link> |
      <router-link to="/evaluate-form">Evaluate</router-link> |
      <router-link to="/user-experiencies">Experiencias</router-link> |
      <router-link to="/search-offers">Search</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/login?name=miguel.alarcos@gmail.com">login miguel</router-link> |
      <router-link to="/login?name=acme@acme.org">login acme</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  //text-align: center;
  color: #2c3e50;
  background-color: #ffffba;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
