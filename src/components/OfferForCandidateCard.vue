<template>
<span>
    <div class="yellow-border card2">
        <div class="container2"> 
            <h2>{{this.item.title}}</h2>
            <div>{{this.item.description}}</div>
            <div>Ver <a :href='"#/view-offer?offer=" + this.item._id' variant="primary">oferta.</a></div>
            <div>
                <b-badge v-bind:key="tag" v-for="tag in item.tags" variant="success">{{ tag }}</b-badge>
            </div> 
            <div>Total de candidatos activos: <span>{{ item.actives }}</span>.</div>
            <div>{{ already }}</div>
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
  computed: {
    already(){
        if(this.item.already){
            return "Ya estás suscrito."
        }
    }
  },
  methods: {
    subscribe(){
        const candidature = { 
            title: this.item.title,
            description :this.item.description,
            status: 'open',
            tags: this.items.tags,
            offerer: this.item.offerer,
            offer: this.item._id
        }
        this.$store.dispatch('suscribirseAction', {candidature})
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
}

.right {
    float: right;
}

</style>
