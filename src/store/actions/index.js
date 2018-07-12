import { getFullCandidature, appendMessage } from '@/api'

export default {
    newError(context, msg) {
        context.commit('newError', msg)
        setTimeout(() => {
          context.commit('newError', '')
        }, 3000)
    },
    async appendMessageAction(context, {candidature, msg}) {
        const messages = await appendMessage(candidature, msg)
        context.commit('setMessages', {messages})
    },
    async getMessagesData(context, {candidature}){
        //https://github.com/greyby/vue-spinner
        context.commit('setLoading', {b: true})
        const c = await getFullCandidature(candidature)
        context.commit('setCandidatureSelected', {candidature: c})
        context.commit('setLoading', {b:false})
    }
}