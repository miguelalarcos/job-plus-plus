import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/MyOffers.vue'
import About from './views/About.vue'
import CandidatesPage from './views/CandidatesPage.vue'
import CandidaturePage from './views/MyCandidaturesPage.vue'
import MessagesPage from './views/Messages.vue'
import EvaluateForm from './views/EvaluateForm'
import CandidatePage from './views/CandidatePage'
import ExperiencePage from './views/ExperiencePage'
import SearchOfferPage from './views/SearchOfferPage'
import LoginPage from './views/LoginPage'
import store from '@/store'

Vue.use(Router)

//export default new Router({
const router = new Router({
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
    },
    {
      path: '/view-candidate',
      name: 'view-candidate',
      component: CandidatePage
    },
    {
      path: '/user-experiencies',
      name: 'user-experiences',
      component: ExperiencePage
    },
    {
      path: '/search-offers',
      name: 'search-offers',
      component: SearchOfferPage
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (!store.state.user._id) {  
      if (to.path !== '/login') {
        next('/login?name=miguel.alarcos@gmail.com');
      }else{
        next()
      }
  } else {
      next()
  }
})

export default router