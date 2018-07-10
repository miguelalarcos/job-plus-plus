<template>
<span>
    <div v-bind:class="classBorder" class="card2">
        <div class="container2"> 
            <h2>{{this.item.candidate}}
                <a v-if="newMessages" :href='"#/messages?candidature=" + this.item.id' variant="primary"><b-badge variant="success" style="float: right">{{ newMessages }}</b-badge></a>   
            </h2>
            <div class="textarea">
                <textarea :rows="4" :value="this.item.offererObservations"></textarea>
                <b-button class="button inside" :size="'sm'" :variant="'primary'">Guardar</b-button>
            </div>    
            <div>Ver <a :href='"#/messages?candidature=" + this.item.id' variant="primary">mensajes.</a>
            <b-button style="float: right" class="button" :size="'sm'" :variant="'danger'">Descartar</b-button>
            </div>   
        </div>
    </div>
</span>
</template>

<script>
export default {
  name: 'CandidatureForOffererCard',
  props: {
      item: Object
  },
  computed: {
      classBorder() {
          const status = this.item.status
          return {
              'green-border': status == 'open',
              'red-border': status == 'discarded'
          }
      },
      newMessages() { 
        return 1;
        //const name = this.item.name
        //return this.$store.state.events[this.item.id + '.MESSAGE.' + name] || 0
      },
  },
  methods: {
    saveObservations() {
        console.log('save observations:', this.observations)
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

.inside{
    position:absolute;
    bottom:10px;
    right:10px;
}

</style>
