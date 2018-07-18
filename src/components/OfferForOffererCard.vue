<template>
<span>
    <div class="yellow-border card2">
        <div class="container2">
            <b-badge variant="danger" style="float: right">{{ newCandidates }}</b-badge>
            <b-badge variant="success" style="float: right">{{ newMessages }}</b-badge>    
            <div v-if="edit">
                <b-input type="text" v-model="title"></b-input>
                <b-textarea rows=10 v-model="description"></b-textarea>
                <b-input type="text" v-model="tags"></b-input>
                <b-button :variant="'primary'" :disabled="disabled()" @click="save()">guardar</b-button>
                <b-button @click="edit=false">no editar</b-button>
            </div>
            <div v-else>
                <b-button @click="edit=true">editar</b-button>
                <div><b>{{ title }}</b></div>
                <div>{{ description }}</div>
                <div><b>tags: {{ tags }}</b></div>
                <div>Ver <a :href='"#/candidates-for-offer?offer=" + this.item._id' variant="primary">candidaturas.</a></div>
                <div>Total de candidatos activos: <span>{{ item.actives }}</span>.</div>
            </div>
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
  data: function(){
      return {
          edit: false,
          title: this.item.title,
          description: this.item.description,
          tags: this.item.tags.join(',')
      }
  },
  computed: {
      newCandidates() { 
          const n = this.$store.state.offererNewCandidates[this.item._id]
          return n && n.new_candidates
          },
      newMessages() { return this.$store.getters.offererNewEvents(this.item._id)}
  },
  methods: {
    disabled(){
        if(this.title === '' || this.description === '')
            return true
        else
            return false
    },
    save(){
        let data = [
            {path: 'title', value: this.title},
            {path: 'description', value: this.description},
            {path: 'tags', value: this.tags.split(',').map(x=>x.trim())},
            {path: 'remote', value: false},
            {path: 'status', value: 'open'}
        ]
        this.$store.dispatch('updateOfferAction', {offer: this.item._id, data})
        this.edit = false
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
