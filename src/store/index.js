import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import getters from '@/store/getters'
import mutations from '@/store/mutations'
import actions from '@/store/actions'

export default new Vuex.Store({
  state: {
    name: 'miguel',
    errorMessage: "",
    successMessage: "",
    //messages: [
    //  {"candidature": "0", "owner": "maria", "msg": "he estudiado react.js, así como redux y las acciones", "date": 1531223634.618518},
    //  {"candidature": "0", "owner": "maria", "msg": "he estudiado vue.js, así como rxjs y el streaming de inputs.", "date": 1531223634.618518}
  //],
    candidateNewEvents: {'0': 2, '1': 3},
    offererNewEvents: {'0': 1},
    offererNewCandidates: {'0': 1},
    evaluationForm: 
      [
        {id: '0', question: "sabes programar en react?", answer: "https://jsfiddle.net/", mark: 0, observations: ''},
        {id: '1', question: "sabes programar en vue?", answer: "no", mark: 0, observations: ''}
      ],
    fillForm: [
      {question: "sabes programar en react?", answer: ""},
      {question: "sabes programar en vue?", answer: ""}
    ],
    candidatureSelected: {
      id: '0',
        company: 'acme',
        status: 'open',
        candidate: 'maria',
        mark: '5',
        offer: '0',
        offerer: 'acme',
        province: 'Murcia',
        title: 'oferta python',
        description: 'Se busca un programador en Python, tecnología API REST sobre Flask, y base de datos Mongodb...',
        candidateObservations: 'mis observaciones privadas',
        date: 1531223634.618518,
        tags: ['python', 'flask'],
        messages: [
          {"owner": "maria", "msg": "he estudiado react.js, así como redux y las acciones", "date": 1531223634.618518},
          {"owner": "maria", "msg": "he estudiado vue.js, así como rxjs y el streaming de inputs.", "date": 1531223634.618518}
      ]
    },
    myCandidatures: {
      '0':{
        id: '0',
        company: 'acme',
        status: 'open',
        candidate: 'maria',
        mark: '5',
        offer: '0',
        offerer: 'acme',
        province: 'Murcia',
        title: 'oferta python',
        description: 'Se busca un programador en Python, tecnología API REST sobre Flask, y base de datos Mongodb...',
        candidateObservations: 'mis observaciones privadas',
        date: 1531223634.618518,
        tags: ['python', 'flask']
      },
      '1':{
        id: '1',
        company: 'acme',
        status: 'discarded',
        candidate: 'maria',
        mark: '7',
        offer: '0',
        offerer: 'BP',
        province: 'Murcia',
        title: 'oferta react.js',
        description: 'Se busca un programador frontend en React.js...',
        candidateObservations: '',
        date: 1531223634.618518,
        tags: ['react.js']
      }
    },
    candidaturesForOfferer: {
      '0':{
        id: '0',
        company: 'acme',
        status: 'open',
        candidate: 'maria',
        mark: '5',
        offer: '0',
        offerer: 'acme',
        province: 'Murcia',
        title: 'oferta python',
        description: 'Se busca un programador en Python, tecnología API REST sobre Flask, y base de datos Mongodb...',
        offererObservations: 'mis observaciones privadas'
      }
    },
    myOffers: {
      '0': {
        id: '0',
        owner: 'acme',
        total:  5,
        active: 3,
        title: 'backend python',
        description: 'buscamos un developer backend python, basado en flask',
        date: 1531223634.618518
      },
      '1': {
        id: '1',
        owner: 'acme',
        total:  10,
        active: 7,
        title: 'front-end vue.js',
        description: 'buscamos un developer front-end basado en la tecnología vue.js',
        date: 1531223634.618518
      }
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
