<template>
  <div class="form">
    <span v-bind:key="index" v-for="(item, index) in questions()">
        <EvaluateQuestion :index="index" :item="item" />
    </span> 
    Puntuación: {{ totalMark }}
    <div>Observaciones generales: <textarea @input="saveObservations($event.target.value)" :value="observations"></textarea></div>
    <button @click="save">Guardar</button>
  </div>
</template>

<script>
// @ is an alias to /src
import EvaluateQuestion from '@/components/EvaluateQuestion.vue'

export default {
  name: 'EvaluateForm',
  data: function(){
    return {
      candidature: this.$route.query.candidature, // maybe a method?
      }
  },
  methods: {
    questions() {
      return this.$store.state.evaluationForm
    },
    save() {
      this.$store.commit('offererSavesEvaluationOnCandidature', {candidature: this.candidature, observations: this.observations, form: this.$store.state.evaluationForm})
    }
  },
  computed: {
    observations() {return this.$store.state.candidaturesForOfferer['0'/*this.$route.query.candidature*/].offererObservations},
    totalMark() {
        return this.$store.state.evaluationForm.reduce((a, b) => a + parseInt(b.mark), 0)
    }
  },
  components: {
      EvaluateQuestion
  }
}
</script>

<style lang="scss">
.form {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>