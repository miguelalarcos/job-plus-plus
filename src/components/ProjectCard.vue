<template>
<span>
    <div class="yellow-border card2">
        <div class="container2">
            <!--
            <b-badge variant="danger" style="float: right">{{ newCandidates }}</b-badge>
            <b-badge variant="success" style="float: right">{{ newMessages }}</b-badge>    
            -->
            <div class="container3" v-if="isOwner() && edit">
                <b-input v-stream:input="changeTitle$" placeholder="Título" type="text" :value="item.title"></b-input>
                <textarea class="form-control" v-stream:input="changeDescription$" placeholder="Descripción" rows=10 :value="item.description"></textarea>
                <AutoCompleteTag :tags="item.tags" :action="'searchTagsAction'" :placeholder="'tags'" v-on:change-tags="changeTags($event)"></AutoCompleteTag> 
                <b-alert v-if="this.flag !== '' && this.flag !== undefined" class="flag" variant="success" show>{{ flag }}</b-alert>
                <b-button :variant="'link'" :size="'sm'" v-if="item.status === 'draft'" :disabled="disabled()" @click="publish()">publicar</b-button>
                <b-button :variant="'link'" :size="'sm'" @click="edit=false">no editar</b-button>                
            </div>
            <div v-else>
                <b-button :variant="'link'" :size="'sm'" v-if="isOwner" @click="edit=true">editar</b-button>
                <div><b>{{ item.title }}</b></div>
                <div>{{ item.description }}</div>
                <div>
                    <b-badge v-bind:key="tag" v-for="tag in item.tags" variant="success">{{ tag }}</b-badge>
                </div> 
                <div v-if="isParticipant">Ver <a :href='"/#/messages?id=" + this.item._id' variant="primary">mensajes.</a></div>
                <div v-if="isOwner"><b-input type="text" v-model="invited"></b-input><b-button :variant="'link'" :size="'sm'" @click="invite()">Invita</b-button></div>
                <div v-if="!isParticipant"><b-button :variant="'link'" :size="'sm'" @click="solicite()">Solicito participar</b-button></div>
                <b-button :variant="'link'" :size="'sm'" v-if="isOwner" @click="close()">cerrar</b-button>
            </div>
        </div>
    </div>
</span>
</template>

<script>
import { Subject, timer } from 'rxjs'
import { switchMap, skip, distinctUntilChanged } from 'rxjs/operators'
import AutoCompleteTag from '@/components/AutoCompleteTagsInput'

export default {
  name: 'ProjectCard',
  props: {
      item: Object
  },
  subscriptions(){
    this.changeTitle$ = new Subject()
    this.changeDescription$ = new Subject()
    this.changeTitle$.pipe(skip(1), switchMap(() => timer(2000), (outer)=>outer.event.msg), distinctUntilChanged()).subscribe((x)=> this.save({title: x}))
    this.changeDescription$.pipe(skip(1), switchMap(() => timer(2000), (outer)=> outer.event.target.value), distinctUntilChanged()).subscribe((x)=> this.save({description: x}))
  },
  components: {
    AutoCompleteTag
  },
  data: function(){
      return {
          edit: this.item.title === undefined,
          questions: [],
          invited: ""
      }
  },
  computed: {
      //isOwner(){
      //    return this.$store.state.user._id === this.item.__owners[0]
      //},
      isParticipant(){
          return this.item.participants.includes(this.$store.state.user.login)
      },
      flag(){
          return this.$store.state.myProjectsSaved[this.item._id]
      }
  },
  methods: {
      isOwner(){
          return this.$store.state.user.login === this.item.__owners[0]
      },
    solicite(){
        this.$store.dispatch("soliciteAction", {user: this.$store.state.user._id, project: this.item._id})
    },
    invite(){
        this.$store.dispatch("inviteAction", {project: this.item._id, user: this.invited})
    },  
    changeTags(tags){
        this.save({tags})
    },  
    disabled(){
        if(this.item.title === '' || this.item.description === '' || this.item.title === undefined || this.item.description === undefined)
            return true
        else
            return false
    },
    close(){
        let data = {status: 'closed'}
        this.$store.dispatch('updateProjectAction', {project: this.item._id, data})
    },
    publish(){
        let data = {status: 'open'}
        this.$store.dispatch('updateProjectAction', {project: this.item._id, data})
        this.edit = false
    },
    save(data){
        this.$store.dispatch('updateProjectAction', {project: this.item._id, data})
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
