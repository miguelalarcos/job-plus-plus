<template>
    <div>
        <AutoComplete :action="action" :placeholder="placeholder" v-on:added-tag="addTag($event)"></AutoComplete>
        <div>
            <b-badge v-bind:key="tag" v-for="tag in tags" variant="success">{{ tag }} <span class="hand" @click="deleteTag(tag)">x</span></b-badge>
        </div> 
    </div>
</template>

<script>
import AutoComplete from '@/components/AutoCompleteInput'

export default {
  name: 'AutoCompleteTagsInput',
  props: {
      placeholder: String,
      action: String,
      tags: Array
  },
  data: function(){
      return {
          value: "",
          index: null
      }
  },
  computed: {
  },
  components: {
    AutoComplete
  },
  methods: {
    deleteTag(tag){
        const tags = this.tags.filter(x=>x !== tag)
        this.$emit('change-tags', tags)
    },
    addTag(tag){
          if(tag !== '' && !this.tags.includes(tag)){
              this.$emit('change-tags', [...this.tags, tag])
          }
      },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.hand{
    cursor: pointer;
}

</style>
