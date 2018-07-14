import { getFullCandidature, appendMessage, candidatureSave, 
    getCandidateMessageAggregation, setMessagesRead, getAllCandidatures,
getTotalActivesAggregation, getAllOffers, getCandidaturesForOffer,
getOffererMessageAggregation, getCandidateData } from '@/api'

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
    async getMessagesDataAction(context, {candidature}){
        //https://github.com/greyby/vue-spinner
        context.commit('setLoading', {b: true})
        const c = await getFullCandidature(candidature)
        context.commit('setCandidatureSelected', {candidature: c})
        context.commit('setLoading', {b:false})
        let props = []
        const indexes = c.messages.map((e, index) => {return {owner:e.owner, index, b: e.unread === true}}).filter((e) => e.owner !== context.state.name && e.b === true)
        props = indexes.map((x) => {return {path: 'messages.' + x.index + '.unread', value: false} })
        if(props.length > 0)
            await setMessagesRead(candidature, props)
    },
    async savesPropAction(context, {id, prop, value}){
        const doc = await candidatureSave(id, prop, value)
        context.commit('savesCandidature', {_id: doc._id, doc})
        if(prop === 'candidateObservations' || prop === 'offererObservations'){
            context.commit('setNotificationObservation', {id, txt: 'guardado'})
            setTimeout(() => {
                context.commit('setNotificationObservation', {id, txt: ''})
              }, 1500)
        }
    },
    async getCandidaturesForOfferAction(context, {offer}){
        context.commit('setLoading', {b: true})
        const candidatures = await getCandidaturesForOffer(offer)
        context.commit('setCandidaturesForOffer', {candidatures})
        const docs = await getOffererMessageAggregation()
        context.commit('offererMessageAggregation', {docs})
        context.commit('setLoading', {b:false})
    },
    async getCandidatureDataAction(context){
        context.commit('setLoading', {b: true})
        const candidatures = await getAllCandidatures()
        context.commit('setMyCandidatures', {candidatures})
        const docs = await getCandidateMessageAggregation()
        context.commit('candidateMessageAggregation', {docs})
        context.commit('setLoading', {b:false})
    },
    async getOfferDataAction(context, {offerer}){
        context.commit('setLoading', {b: true})
        const offers = await getAllOffers(offerer)
        context.commit('setMyOffers', {offers})
        const ids = offers.map((x)=>x._id)
        const aggr = await getTotalActivesAggregation(ids)
        context.commit('setTotalActivesOffer', {aggr})
        context.commit('setLoading', {b:false})
    },
    async getTotalActivesAction(context, {candidature, offer}){
        const aggr = await getTotalActivesAggregation(offer)
        const total = aggr[0]['total']
        context.commit('setTotalActives', {candidature, total})
    },
    async getTotalActivesOfferAction(context, {offers}){
        const aggr = await getTotalActivesAggregation(offers)
        context.commit('setTotalActivesOffer', {aggr})
    },
    async getCandidateDataAction(context, {candidate}){
        context.commit('setLoading', {b: true})
        candidate = await getCandidateData(candidate)
        context.commit('setCandidateData', {candidate})
        context.commit('setLoading', {b:false})
    }
}