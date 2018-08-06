<template>
  <div v-if="!loading" class="container">
    <h2>{{ title }}</h2>
    <span>Escribe un mensaje:</span>
    <textarea class="textarea-message" v-model="message" rows="5"></textarea>
    <b-button :disabled="message === ''" @click="append" :variant="'primary'">
      añadir mensaje
    </b-button>
    <span v-bind:key="item._id" v-for="item in messages">
      <MessageCard :item="item" />
    </span> 
  </div>
  <div v-else>
    loading...
  </div>
</template>

<script>
// @ is an alias to /src
import MessageCard from '@/components/MessageCard.vue'

export default {
  name: 'message',
  data: function(){
      return {
          message: ''
      }
  },
  created: function(){
    this.$store.dispatch('getProjectMessagesDataAction', {project: this.$route.query.project})
  },
  components: {
    MessageCard
  },
  computed: {
    loading() {
      return this.$store.state.loading
    },
    title() {
      return this.$store.state.projectSelected.title
    },
    messages() {
      return this.$store.state.projectSelected.messages.slice().reverse()
    }
  },
  methods:{
    append() {
        this.$store.dispatch('appendMessageAction', {id: this.$route.query.id, 
                                               msg: this.message})
        this.message = ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .textarea-message{
    width: 350px;
  }
</style>