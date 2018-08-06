<template>
<span>
    <div v-bind:class="classBorder" class="card2">
        <div class="container2"> 
            <h2>{{this.item.company}} 
                <a v-if="newMessages" :href='"/messages?candidature=" + this.item._id' variant="primary"><b-badge variant="success" style="float: right">{{ newMessages }}</b-badge></a>   
            </h2>
            <div><a :href='"/offer/" + this.item.offer'><b>{{this.item.title}}, {{ this.item.province }}</b></a></div> 
            <div>{{ date() }}</div>
            <div>{{this.item.description}}</div>
            <div class="textarea">
                <!--<textarea ref="obs" :rows="4" @input="saveObservations($event.target.value)" :value="this.item.candidateObservations"></textarea>-->
                <textarea v-stream:input="change$" ref="obs" :rows="4" :value="this.item.candidateObservations"></textarea>
                <b-alert v-if="this.flag !== '' && this.flag !== undefined" class="flag" variant="success" show>{{ flag }}</b-alert>
                <!--<b-button @click="pinta()" class="button" :size="'sm'" :variant="'primary'">Guardar</b-button>-->
            </div> 
            <div>
                <b-badge v-bind:key="tag" v-for="tag in item.tags" variant="success">{{ tag }}</b-badge>
            </div>   
            <div>Ver <a :href='"/messages?candidature=" + this.item._id' variant="primary">mensajes.</a></div>   
            <div>
                <span>activos: {{item.actives}}</span>
                <span v-bind:class="classObject"><u>{{ status }}</u></span>
            </div>
        </div>
    </div>
</span>
</template>

<script>
import { Subject, timer } from 'rxjs'
import { switchMap } from 'rxjs/operators'
import moment from 'moment'

export default {
  name: 'CandidatureForCandidateCard',
  props: {
      item: Object
  },
  subscriptions(){
    this.change$ = new Subject()
    this.change$.pipe(switchMap(() => timer(2000))).subscribe(()=>this.saveObservations(this.$refs['obs'].value))
  },
  created: function(){
      this.$store.dispatch('getTotalActivesAction', {candidature: this.item._id, offer: this.item.offer})
  },
  computed: {
      flag(){
          return this.$store.state.observationsSaved[this.item._id]
      },
      newMessages() { return this.$store.getters.candidateNewEvents(this.item._id)},  //totalMessageNotifications
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
    pinta(){
        //console.log(this.$refs['obs'].value)
    },
    saveObservations(value) {
        this.$store.dispatch('savesPropAction', {id: this.item._id, prop: 'candidateObservations', value})
    },
    date() {
        return moment.unix(this.item.date).format("DD-MM-YYYY")
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
    background-color: #ffb3ba;
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
