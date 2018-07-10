<template>
  <div>
      <div class="notification">
        <b-alert variant="success" show>
            <h4 class="alert-heading">Bienvenido {{name}}!</h4>
            <!--<div v-if="if2ormore">tienes {{ totalNotifications }} nuevas notificaciones.
            </div>
            <div v-if="if1">tienes una nueva notificación:
                <span v-if="ifnewcandidates">
                    un nuevo <a href="#/candidates?new=true" class="alert-link">candidato.</a>
                </span>
                <span v-if="ifnewmessages">
                    un nuevo <a href="#/candidates?message=true" class="alert-link">mensajes</a>.
                </span>
            </div>
            <div v-if="if0">no tienes nuevas notificaciones.</div>
            -->
        </b-alert>
    </div>
    <div class="success">
        <b-alert v-if="successMessage !== ''" variant="success" show>
            <span>{{ successMessage }}</span>
        </b-alert>
    </div>
    <div class="error">
        <b-alert v-if="errorMessage !== ''" variant="danger" show>
            <span>{{ errorMessage }}</span>
        </b-alert>
    </div>
    <!--<button @click="newError()">new error</button>-->
  </div>
</template>

<script>
export default {
  name: 'NotificationBar',
  computed: {
    successMessage(){ return this.$store.state.successMessage },
    errorMessage() { 
        return this.$store.state.errorMessage 
    },
    /*totalNotifications(){
      return this.$store.getters.totalNotifications
    },
    if0(){ return this.$store.getters.totalNotifications == 0},
    if1(){ return this.$store.getters.totalNotifications== 1},
    if2ormore(){ return this.$store.getters.totalNotifications > 1},
    */
    ifnewcandidates() { return this.$store.getters.totalCandidateNotifications > 0},
    ifnewmessages() { return this.$store.getters.totalMessageNotifications > 0},
    name(){return this.$store.state.name}
  },
  methods: {
      newError() {
          this.$store.dispatch('newError', 'un error.')
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
a {
  color: #42b983;
}
</style>
