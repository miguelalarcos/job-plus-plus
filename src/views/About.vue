<template>
  <div class="about">
    <h1>This is an about page...</h1>
    <AutoComplete @change-tags="changeTags($event)" :tags="tags" :action="'searchTagsAction'" placeholder="tags" />
    <b-button @click="click()">send message</b-button>
    <div v-bind:class="{ active: flag }" class="send-message-box">
      <textarea ref="message" @blur="flag=false" rows="5"></textarea>
      <b-button>click</b-button>
    </div> 
  </div>
</template>

<script>
import AutoComplete from '@/components/AutoCompleteTagsInput'

export default {
  name: 'about',
  data: function(){
      return {
          flag: false,
          tags: []
      }
  },
  created: function(){
    
  },
  components: {
    AutoComplete
  },
  computed: {
    
  },
  methods:{
    changeTags(tags){
      this.tags = tags
    },
    click(){
      this.flag=true
      this.$refs.message.focus()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .send-message-box {
    display: block;
    //line-height:0;
    height: 0;
    overflow: hidden;
    
    -webkit-transition: height 0.3s; /* Safari */
    transition: height 0.3s;
  }
  .active {
    height: 200px;
  }
</style>