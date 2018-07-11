import { getFullCandidature } from '@/api'

export default {
    newError(context, msg) {
        context.commit('newError', msg)
        setTimeout(() => {
          context.commit('newError', '')
        }, 3000)
    },
    appendMessageAction(context, {candidature, msg}) {
        context.commit('appendMessage', {id: Math.random(), msg, candidature, owner: 'miguel'})
    },
    async getFullCandidatureAction(context, {candidature}){
        const c = await getFullCandidature(candidature)
        context.commit('setCandidatureSelected', {candidature: c})
    }
}