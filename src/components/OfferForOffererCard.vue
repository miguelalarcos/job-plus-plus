<template>
<span>
    <div class="yellow-border card2">
        <div class="container2">
            <b-badge variant="danger" style="float: right">{{ newCandidates }}</b-badge>
            <b-badge variant="success" style="float: right">{{ newMessages }}</b-badge>    
            <div class="container3" v-if="edit">
                <!--<b-input v-stream:input="change$" placeholder="Título" type="text" v-model="title"></b-input>-->
                <b-input v-stream:input="changeTitle$" placeholder="Título" type="text" :value="item.title"></b-input>
                <textarea class="form-control" v-stream:input="changeDescription$" placeholder="Descripción" rows=10 :value="item.description"></textarea>
                <AutoComplete :action="'searchTagsAction'" placeholder="tags" v-on:added-tag="addTag($event)"></AutoComplete>
                <div>
                    <b-badge v-bind:key="tag" v-for="tag in item.tags" variant="success">{{ tag }} <span class="hand" @click="deleteTag(tag)">x</span></b-badge>
                </div> 
                <b-alert v-if="this.flag !== '' && this.flag !== undefined" class="flag" variant="success" show>{{ flag }}</b-alert>
                <b-button v-if="item.status === 'draft'" :variant="'primary'" :disabled="disabled()" @click="publish()">publicar</b-button>
                <b-button @click="edit=false">no editar</b-button>
                
            </div>
            <div v-else>
                <b-button @click="edit=true">editar</b-button>
                <div><b>{{ item.title }}</b></div>
                <div>{{ item.description }}</div>
                <div>
                    <b-badge v-bind:key="tag" v-for="tag in item.tags" variant="success">{{ tag }}</b-badge>
                </div> 
                <div>Ver <a :href='"#/candidates-for-offer?offer=" + this.item._id' variant="primary">candidaturas.</a></div>
                <div v-if="item.actives" >Total de candidatos activos: <span>{{ item.actives }}</span>.</div>
                <b-button @click="close()">cerrar</b-button>
            </div>
        </div>
    </div>
</span>
</template>

<script>
import { Subject, timer } from 'rxjs'
import { switchMap, skip, distinctUntilChanged } from 'rxjs/operators'
import AutoComplete from '@/components/AutoCompleteTagsInput'

export default {
  name: 'OfferForOffererCard',
  props: {
      item: Object
  },
  subscriptions(){
    this.changeTitle$ = new Subject()
    this.changeDescription$ = new Subject()
    this.changeTitle$.pipe(skip(1), switchMap(() => timer(2000), (outer)=>outer.event.msg), distinctUntilChanged()).subscribe((x)=> this.save({path: 'title', value: x}))
    this.changeDescription$.pipe(skip(1), switchMap(() => timer(2000), (outer)=> outer.event.target.value), distinctUntilChanged()).subscribe((x)=> this.save({path: 'description', value: x}))
  },
  components: {
    AutoComplete
  },
  data: function(){
      return {
          edit: this.item.title === undefined,
          //title: this.item.title || '',
          //description: this.item.description || '',
          tags: this.item.tags
      }
  },
  computed: {
      flag(){
          return this.$store.state.myOffersSaved[this.item._id]
      },
      newCandidates() { 
          const n = this.$store.state.offererNewCandidates[this.item._id]
          return n && n.new_candidates
          },
      newMessages() { return this.$store.getters.offererNewEvents(this.item._id)}
  },
  methods: {
    deleteTag(tag){
        const tags = this.item.tags.filter(x=>x !== tag)
        this.save({path: 'tags', value: tags})
    },
    addTag(tag){
          if(tag !== '' && !this.item.tags.includes(tag)){
              //this.tags = [...this.tags, tag]
              let tags = this.item.tags.slice()
              this.save({path: 'tags', value: [...tags, tag]})
              this.$store.dispatch('upsertTagAction', {tag})
          }
      },  
    disabled(){
        if(this.item.title === '' || this.item.description === '' || this.item.title === undefined || this.item.description === undefined)
            return true
        else
            return false
    },
    close(){
        let data = [
            {path: 'status', value: 'closed'}
        ]
        this.$store.dispatch('updateOfferAction', {offer: this.item._id, data})
    },
    publish(){
        let data = [
            {path: 'status', value: 'open'}
        ]
        this.$store.dispatch('updateOfferAction', {offer: this.item._id, data})
        this.edit = false
    },
    save(data){
        console.log(data)
        data = [data]
        /*let data = [
            {path: 'title', value: this.title},
            {path: 'description', value: this.description},
            {path: 'tags', value: this.tags},
            {path: 'remote', value: false}
        ]*/
        console.log('dispatch updateOfferAction')
        this.$store.dispatch('updateOfferAction', {offer: this.item._id, data})
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
    //height: 500px;
    background-color: beige;
    margin: 5px;
}

.container2 {
    padding: 2px 16px;
}

.right {
    float: right;
}

.container3{
    display:inline-block;
    position:relative;
}

.flag{
    position:absolute;
    bottom:10px;
    right:10px;
}

.hand {
    cursor: pointer;
}
</style>
