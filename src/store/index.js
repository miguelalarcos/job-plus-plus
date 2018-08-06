import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import getters from '@/store/getters'
import mutations from '@/store/mutations'
import actions from '@/store/actions'

export default new Vuex.Store({
  state: {
    loading: false,
    //name: 'miguel',
    user: {
      //user_id: '5b4a116e2427e5423fcbfac4',
      //experience: []
    },
    errorMessage: "",
    successMessage: "",
    listOfTags: [],
    observationsSaved: {},
    myOffersSaved: {},
    myProjectsSaved: {},
    myProjects: {},
    messages: [],
    candidateNewEvents: [],
    offererNewEvents: [], //{},
    offererNewCandidates: {},
    candidate: {},
    experiences: {},
    evaluationForm: 
      [
        {id: '0', question: "sabes programar en react?", answer: "https://jsfiddle.net/", mark: 0, observations: ''},
        {id: '1', question: "sabes programar en vue?", answer: "no", mark: 0, observations: ''}
      ],
    fillForm: [
      {question: "sabes programar en react?", answer: ""},
      {question: "sabes programar en vue?", answer: ""}
    ],
    candidatureSelected: {},
    projectSelected: {},
    myCandidatures: {},
    candidaturesForOfferer: {},
    myOffers: {},
    searchOffers: {},
    searchProjects: {},
  },
  getters:{
    ...getters
  },
  mutations: {
    ...mutations
  },
  actions: {
    ...actions
  }
})
