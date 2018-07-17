<template>
<span>
    <div class="yellow-border card2">
        <div class="container2"> 
            <h2>{{this.item.title}}</h2>
            <div>{{description()}} 
                <span class="pointer" v-if="!read_all" @click="read_all=true"><u>leer más</u></span>
                <span class="pointer" v-if="read_all" @click="read_all=false"><u>menos</u></span>
            </div>
            <div>
                <b-badge v-bind:key="tag" v-for="tag in item.tags" variant="success">{{ tag }}</b-badge>
            </div> 
            <div v-if="item.actives !== undefined" >Total de candidatos activos: <span>{{ item.actives }}</span>.</div>
            <div v-else>No hay candidatos activos.</div>
            <div>{{ already }} <b-button :variant="'success'" class="right" @click="subscribe()" v-if="!item.already">Suscríbete</b-button></div>
        </div>
    </div>
</span>
</template>

<script>
export default {
  name: 'OfferForCandidateCard',
  props: {
      item: Object
  },
  data: function(){
      return {
          read_all: false
      }
  },
  computed: {
    already(){
        if(this.item.already){
            return "Ya estás suscrito."
        }
    }
  },
  methods: {
    description(){
        if(this.read_all){
            return this.item.description
        }
        else{
            if(this.item.description.length > 100){
                return this.item.description.substring(0, 100) + '...'
            }else{
                return this.item.description.substring(0, 100)
            }
        }
    },  
    subscribe(){
        const candidature = { 
            title: this.item.title,
            company: this.item.name,
            description :this.item.description.substring(0, 100),
            status: 'open',
            tags: this.item.tags,
            offerer: this.item.offerer,
            offer: this.item._id,
            messages: []
        }
        this.$store.dispatch('suscribirseAction', {candidature})
        this.$store.commit('setAlreadySubscribed', {already: [{_id: this.item._id}] } )
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.yellow-border {
border: 2px solid yellow;
}

.card2 {
    width: 350px;
    background-color: beige;
    margin: 5px;
}

.container2 {
    padding: 2px 16px;
    
    display:inline-block;
    position:relative;
}

.right {
    position:absolute;
    bottom:10px;
    right:10px;
}

.pointer{
    cursor: pointer;
}

</style>
