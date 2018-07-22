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
    myCandidatures: {},
    candidaturesForOfferer: {},
    myOffers: {},
    searchOffers: {
      /*'"5b3d58088b4ae963d3656009': {
        "_id" : "5b3d58088b4ae963d3656009",
        "title" : "oferta python",
        "description" : "una oferta en python basada en bottle",
        "province" : "Murcia",
        "offerer" : "miguel",
        "remote" : false,
        "status" : "open",
        "tags" : [ 
            "python", 
            "vue.js"
        ]
    }*/
    },
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
