import { getFullCandidature, appendMessage, candidatureSave, 
    getCandidateMessageAggregation, setMessagesRead, getAllCandidatures,
getTotalActivesAggregation, getAllOffers, getCandidaturesForOffer,
getOffererMessageAggregation, getCandidateData, appendExperience, 
setExperience, getUserData, getSearchOffers, createCandidature,
getAlreadySubscribed, deleteExperience, getLogin, 
getTotalNewCandidatesAggregation, setCandidatureRead,
getUnreadMessagesForCandidatures } from '@/api'


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
    async appendExperienceAction(context, {user_id, experience}){
        const user = await appendExperience(user_id, experience)
        context.commit('setUser', {user})
    },
    async deleteExperienceAction(context, {user_id, experience}){
        const user = await deleteExperience(user_id, experience)
        context.commit('setUser', {user})
    },
    async setExperienceAction(context, {user_id, path, value, index}){
        const user = await setExperience(user_id, path, value)
        context.commit('setUser', {user})
        context.commit('setNotificationObservation', {id: index, txt: 'guardado'})
        setTimeout(() => {
            context.commit('setNotificationObservation', {id: index, txt: ''})
        }, 1500)
    },
    async getMessagesDataAction(context, {candidature}){
        //https://github.com/greyby/vue-spinner
        context.commit('setLoading', {b: true})
        const c = await getFullCandidature(candidature)
        context.commit('setCandidatureSelected', {candidature: c})
        context.commit('setLoading', {b:false})
        let props = []
        const indexes = c.messages.map((e, index) => {return {owner:e.owner, index, b: e.unread === true}}).filter((e) => e.owner !== context.state.user.email && e.b === true)
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
        let candidatures = await getCandidaturesForOffer(offer)
        context.commit('setCandidaturesForOffer', {candidatures})
        //const docs = await getOffererMessageAggregation()
        //context.commit('offererMessageAggregation', {docs})
        candidatures = candidatures.map(x=>x._id)
        const docs = await getUnreadMessagesForCandidatures(candidatures)
        context.commit('candidateMessageAggregation', {docs})

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
        const new_candidates = await getTotalNewCandidatesAggregation(ids)
        context.commit('setTotalNewCandidates', {new_candidates})

        const docs = await getOffererMessageAggregation()
        context.commit('offererMessageAggregation', {docs})

        context.commit('setLoading', {b:false})
    },
    async getSearchOfferDataAction(context, {tags}){
        context.commit('setLoading', {b: true})
        const offers = await getSearchOffers(tags)
        context.commit('setSearchOffers', {offers})
        const ids = offers.map((x)=>x._id)
        const aggr = await getTotalActivesAggregation(ids)
        context.commit('setTotalActivesSearchOffer', {aggr})
        const already = await getAlreadySubscribed(offers)
        context.commit('setAlreadySubscribed', {already})
        context.commit('setLoading', {b:false})
    },
    async suscribirseAction(context, {candidature}){
        await createCandidature(candidature)
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
    },
    async getUserDataAction(context, {user_id}){
        context.commit('setLoading', {b: true})
        const user = await getUserData(user_id)
        context.commit('setUser', {user})
        context.commit('setLoading', {b:false})
    },
    async getUserExperienceAction(context, {user_id}){
        console.log('llego has await get user data', user_id)
        const user = await getUserData(user_id)
        context.commit('setExperience', {_id: user_id, experience: user})
    },
    async getLoginAction(context, {name}){
        console.log('previo get login')
        const user = await getLogin(name)
        context.commit('setUser', {user})
    },
    async setCandidatureReadAction(context, {candidature}){
        await setCandidatureRead(candidature)
    }
}