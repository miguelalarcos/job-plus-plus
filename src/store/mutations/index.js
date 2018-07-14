import { newError } from './errors'

export default {
    setTotalActivesOffer(state, {aggr}){
        aggr.forEach((x)=>{
            const item = {...state.myOffers[x._id], actives: x.total}
            state.myOffers = {...state.myOffers, [x._id]: item}    
        })
        //state.myOffers = {...state.myOffers, ...helper}
    },
    setTotalActives(state, {candidature, total}){
        const item = {...state.myCandidatures[candidature], actives: total}
        state.myCandidatures = {...state.myCandidatures, [candidature]: item}
    },
    setMyOffers(state, {offers}){
        const o = {}
        offers.forEach(element => {
            o[element._id] = element
        });
        state.myOffers = o
    },
    setCandidaturesForOffer(state, {candidatures}){
        const c = {}
        candidatures.forEach(element => {
            c[element._id] = element
        });
        state.candidaturesForOfferer = c
    },
    setMyCandidatures(state, {candidatures}){
        const c = {}
        candidatures.forEach(element => {
            c[element._id] = element
        });
        state.myCandidatures = c
    },
    setLoading(state, {b}){
        state.loading = b
    },
    setNotifications(state, count){
        state.notifications = count
    },
    setNotificationObservation(state, {id, txt}){
        state.observationsSaved = {...state.observationsSaved, [id]: txt}
    },
    newError,
    appendMessage(state, msg) {
        const messages = [...state.candidatureSelected.messages, msg]
        state.candidatureSelected = {...state.candidatureSelected, messages}
    },
    setMessages(state, {messages}) {
        messages = [...messages]
        state.candidatureSelected = {...state.candidatureSelected, messages}
    },
    setCandidatureSelected(state, {candidature}){
        state.candidatureSelected = candidature
    },
    setMark(state, {index, mark}) {
        let array = state.evaluationForm
        state.evaluationForm = array.map((item, i) => {
            if(index !== i) return item
            return {...item, mark}
        })
    },
    savesCandidature(state, {_id, doc}){ 
        if(state.myCandidatures[_id]){
            let item = {...state.myCandidatures[_id], ...doc} 
            state.myCandidatures = {...state.myCandidatures, [_id]: item}
        }
        if(state.candidaturesForOfferer[_id]){
            let item = {...state.candidaturesForOfferer[_id], ...doc} 
            state.candidaturesForOfferer = {...state.candidaturesForOfferer, [_id]: item}
        }
    },
    candidateSetsCandidature(state, {id, payload}) {
        const item = {...state.myCandidatures[id], ...payload}
        state.myCandidatures = {...state.myCandidatures, [id]: item}
    },
    candidateMessageAggregation(state, {docs}){
        state.candidateNewEvents = docs
    },
    offererMessageAggregation(state, {docs}){
        state.offererNewEvents = docs
    }
}
