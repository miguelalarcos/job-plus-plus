<template>
<span>
    <div v-bind:class="classBorder" class="card2">
        <div class="container2"> 
            <div>{{this.item.candidate}}
                <a v-if="newMessages" :href='"#/messages?candidature=" + this.item._id' variant="primary"><b-badge variant="success" style="float: right">{{ newMessages }}</b-badge></a>   
                <b-form-input class="mark" type="text" @input="set_mark($event)" :value="''+this.item.mark"></b-form-input>
            </div>
            <div class="textarea">
                <textarea placeholder="mis notas privadas" v-stream:input="change$" ref="obs" :rows="4" :value="this.item.offererObservations"></textarea>
                <b-alert v-if="this.flag !== '' && this.flag !== undefined" class="flag" variant="success" show>{{ flag }}</b-alert>
            </div>   
            <div>Ver <a :href='"#/messages?candidature=" + this.item._id' variant="primary">mensajes.</a></div>
            <div>Ver cuestionario</div>
            <div>
                <div v-if="read_all" v-bind:key=index v-for="(exp, index) in experiences">
                    <div><b>{{exp.tags}}</b></div>
                    <div>{{exp.description}}</div>
                </div>
                <span class="pointer" v-if="!read_all" @click="read_all=true; get_user_data()"><u>leer más</u></span>
                <span class="pointer" v-if="read_all" @click="read_all=false"><u>menos</u></span>
            </div>
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
  data: function(){
      return {
          read_all: false
      }
  },
  subscriptions(){
    this.change$ = new Subject()
    this.change$.pipe(switchMap(() => timer(2000))).subscribe(()=>this.saveObservations(this.$refs['obs'].value))
  },
  computed: {
      experiences(){
          const exps = this.$store.state.experiences[this.item.user_id]
          return exps && exps.experience
      },
      flag(){
          return this.$store.state.observationsSaved[this.item._id]
      },
      newMessages() { return this.$store.getters.candidateNewEvents(this.item._id)}, 
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
      get_user_data(){
          this.$store.dispatch('getUserExperienceAction', {user_id: this.item.user_id})
          this.$store.dispatch('setCandidatureReadAction', {candidature: this.item._id})
      },
      set_mark(event){
          console.log(event, typeof(event))
        let value = event
        const patt = /^[+-]?\d+(\.\d+)?$/
        if(value.match(patt))
            value = parseFloat(value)  
            this.$store.dispatch('savesPropAction', {id: this.item._id, prop: 'mark', value})              
      },
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

.mark{
    width: 50px;
}

.pointer{
    cursor: pointer;
}
</style>