<template>
<span>
    <div class="yellow-border card2">
        <div class="container2"> 
            <h2>{{this.item.title}}
                <b-badge variant="danger" style="float: right">{{ newCandidates }}</b-badge>
                <b-badge variant="success" style="float: right">{{ newMessages }}</b-badge>   
            </h2>
            <div>{{this.item.description}}</div>
            <div>Editar <a :href='"#/offer?id=" + this.item.id'>oferta</a></div>
            <div>Ver <a :href='"#/candidates-for-offer?offer=" + this.item._id' variant="primary">candidaturas.</a></div>
            <div>Total de candidatos activos: <span>{{ item.actives }}</span>.</div>
        </div>
    </div>
</span>
</template>

<script>
export default {
  name: 'OfferForOffererCard',
  props: {
      item: Object
  },
  computed: {
      newCandidates() { 
          return this.$store.state.offererNewCandidates[this.item._id]},
      newMessages() { return this.$store.getters.offererNewEvents(this.item._id)}
  },
  methods: {
    
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
}

.right {
    float: right;
}

</style>
