<template>
<span>
    <div class="">
        <div class="container2"> 
            <div class="container3">
                <!--<div>
                    <b-form-input v-model="tags" placeholder="tags separated by ," type="text" v-stream:input="change$"></b-form-input>
                </div>
                -->
                <AutoComplete :action="'searchTagsAction'" placeholder="tags" v-on:added-tag="addTag($event)"></AutoComplete>
                <div>
                    <b-badge v-bind:key="tag" v-for="tag in item.tags" variant="success">{{ tag }} <span class="hand" @click="deleteTag(tag)">x</span></b-badge>
                </div> 
                <textarea v-model="description" class="textarea" v-stream:input="change$" :rows="6"></textarea>
                <b-alert v-if="this.flag !== '' && this.flag !== undefined" class="flag" variant="success" show>{{ flag }}</b-alert>
                <b-button class="flag" @click="deleteExperience()">eliminar</b-button> 
            </div>              
        </div>
    </div>
</span>
</template>

<script>
import { Subject, timer } from 'rxjs'
import { switchMap, skip } from 'rxjs/operators'
import AutoComplete from '@/components/AutoCompleteTagsInput'

export default {
  name: 'ExperienceCard',
  props: {
      item: Object,
      index: Number
  },
  data: function(){
      return {
          tags: this.item.tags,
          description: this.item.description
      }
  },
  components: {
    AutoComplete
  },
  created: function(){
      //setTimeout(()=>this.save=true, 3000)
  },
  subscriptions(){
    this.change$ = new Subject()
    this.change$.pipe(skip(1), switchMap(() => timer(2000))).subscribe(()=>this.saveExperience(this.tags, this.description))
  },
  computed: {
      flag(){
          return this.$store.state.observationsSaved[this.index]
      }
  },
  methods: {
    deleteTag(tag){
        const tags = this.item.tags.filter(x=>x !== tag)
        this.save(tags, this.description)
    },
    addTag(tag){
          if(tag !== '' && !this.item.tags.includes(tag)){
              let tags = this.item.tags.slice()
              this.saveExperience([...tags, tag], this.description)
              //this.$store.dispatch('upsertTagAction', {tag})
          }
      },    
    saveExperience(tags, exp) {
        const value = {tags, description: exp}  
        this.$store.dispatch('setExperienceAction', {user_id: this.$store.state.user._id, path: 'experience.' + this.index, value, index: this.index})
    },
    deleteExperience(){
        const value = {tags: this.tags, description: this.description}
        this.$store.dispatch('deleteExperienceAction', {user_id: this.$store.state.user._id, experience: value})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.card2 {
    width: 250px;
    margin: 5px;
    background-color: beige;
}

/* Add some padding inside the card container */
.container2 {
    padding: 2px 16px;
}

.container3{
    display:inline-block;
    position:relative;
}

.textarea{
    width: 300px;
}

.flag{
    position:absolute;
    bottom:10px;
    right:10px;
}

</style>