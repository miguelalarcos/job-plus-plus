import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/MyOffers.vue'
import About from './views/About.vue'
import CandidatesPage from './views/CandidatesPage.vue'
import CandidaturePage from './views/MyCandidaturesPage.vue'
import MessagesPage from './views/Messages.vue'
import EvaluateForm from './views/EvaluateForm'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'my-offers',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/candidates-for-offer',
      name: 'candidates-for-offer',
      component: CandidatesPage
    },
    {
      path: '/my-candidatures',
      name: 'my-candidatures',
      component: CandidaturePage
    },
    {
      path: '/messages',
      name: 'messages',
      component: MessagesPage
    },
    {
      path: '/evaluate-form',
      name: 'evaluate-form',
      component: EvaluateForm
    }
  ]
})
