import { getMessages } from '@/api'

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
    async getMessagesAction(context, {candidature}){
        //const messages = await getMessages(candidature)
        //context.commit('setMessages', {messages})
    }
}