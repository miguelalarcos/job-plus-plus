<template>
<span>
    <div v-bind:class="classBorder" class="card2">
        <div class="container2"> 
            <h3>{{this.item.candidate}} {{this.item.mark}}
                <a v-if="newMessages" :href='"#/messages?candidature=" + this.item._id' variant="primary"><b-badge variant="success" style="float: right">{{ newMessages }}</b-badge></a>   
            </h3>
            <div class="textarea">
                <textarea placeholder="mis notas privadas" v-stream:input="change$" ref="obs" :rows="4" :value="this.item.offererObservations"></textarea>
                <b-alert v-if="this.flag !== '' && this.flag !== undefined" class="flag" variant="success" show>{{ flag }}</b-alert>
            </div>   
            <div>Ver <a :href='"#/messages?candidature=" + this.item._id' variant="primary">mensajes.</a></div>
            <div>Ver cuestionario</div>
            <div>Ver candidato</div>
            <span v-if="this.item.status === 'open'">
                <b-button @click="discard()" class="button" :size="'sm'" :variant="'danger'">Descartar</b-button>  
            </span>
            <span v-else>
                <b-button @click="reactivate()" class="button" :size="'sm'" :variant="'success'">Reactivar</b-button>  
            </span>
        </div>
    </div>
</span>
</template>

<script>
import { Subject, timer } from 'rxjs'
import { switchMap } from 'rxjs/operators'

export default {
  name: 'CandidatureForOffererCard',
  props: {
      item: Object
  },
  subscriptions(){
    this.change$ = new Subject()
    this.change$.pipe(switchMap(() => timer(2000))).subscribe(()=>this.saveObservations(this.$refs['obs'].value))
  },
  computed: {
      flag(){
          return this.$store.state.observationsSaved[this.item._id]
      },
      newMessages() { return this.$store.getters.offererNewEvents(this.item._id)}, 
      status() { 
          const status = this.item.status
          if(status === 'open') return 'abierto'
          if(status === 'discarded') return 'descartado'
          },
      classObject() {
          const status = this.item.status
          return {
              discarded: status === 'discarded',
              open: status === 'open',
              right: true
          }
      },
      classBorder() {
          const status = this.item.status
          return {
              'green-border': status == 'open',
              'red-border': status == 'discarded'
          }
      }
  },
  methods: {
      reactivate(){
        this.$store.dispatch('savesPropAction', {id: this.item._id, prop: 'status', value: 'open'})            
      },
      discard(){
        this.$store.dispatch('savesPropAction', {id: this.item._id, prop: 'status', value: 'discarded'})  
      },
      saveObservations(value) {
        this.$store.dispatch('savesPropAction', {id: this.item._id, prop: 'offererObservations', value})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.green-border {
border: 2px solid green;
}

.red-border {
border: 2px solid red;
}

.card2 {
    width: 250px;
    margin: 5px;
    background-color: beige;
}

/* Add some padding inside the card container */
.container2 {
    padding: 2px 16px;
}

.discarded {
  color: red;
}

.open {
    color: green;
}

.right {
    float: right;
}

.textarea{
    display:inline-block;
    position:relative;
}

.flag{
    position:absolute;
    bottom:10px;
    right:10px;
}

</style>