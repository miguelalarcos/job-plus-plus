import { newError } from './errors'
import axios from 'axios';

export default {
    setTotalActivesOffer(state, {aggr}){
        aggr.forEach((x)=>{
            const item = {...state.myOffers[x._id], actives: x.total}
            state.myOffers = {...state.myOffers, [x._id]: item}    
        })
        //state.myOffers = {...state.myOffers, ...helper}
    },
    setTotalNewCandidates(state, {new_candidates}){
        new_candidates.forEach(x => {
            const item = {...state.offererNewCandidates[x._id], new_candidates: x.total}
            state.offererNewCandidates = {...state.offererNewCandidates, [x._id]: item}
        })
    },
    setTotalActives(state, {candidature, total}){
        const item = {...state.myCandidatures[candidature], actives: total}
        state.myCandidatures = {...state.myCandidatures, [candidature]: item}
    },
    setTotalActivesSearchOffer(state, {aggr}){
        aggr.forEach((x)=>{
            const item = {...state.searchOffers[x._id], actives: x.total}
            state.searchOffers = {...state.searchOffers, [x._id]: item}    
        })
    },
    setUser(state, {user}){
        state.user = {...state.user, ...user}
        axios.defaults.headers.common['Authorization'] = state.user.jwt;
    },
    appendOffer(state, {offer}){
        state.myOffers = {...state.myOffers, [offer._id]: offer}
    },
    setMyOffers(state, {offers}){
        const o = {}
        offers.forEach(element => {
            o[element._id] = element
        });
        state.myOffers = {...state.myOffers, ...o}
    },
    resetMyOffers(state){
        state.myOffers = {}
    },
    addMyOffers(state, {offer}){
        state.myOffers = {...state.myOffers, [offer._id]: offer}
    },
    setSearchOffers(state, {offers}){
        const o = {}
        offers.forEach(element => {
            o[element._id] = element
        });
        state.searchOffers = o
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
    setNotificationOfferSaved(state, {id, txt}){
        state.myOffersSaved = {...state.myOffersSaved, [id]: txt}
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
    setCandidateData(state, {candidate}){
        state.candidate = {...candidate}
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
    },
    setAlreadySubscribed(state, {already}){
        already.forEach((x)=>{
            const item = {...state.searchOffers[x._id], already: true}
            state.searchOffers = {...state.searchOffers, [x._id]: item}    
        })
    },
    setExperience(state, {_id, experience}){
        state.experiences = {...state.experiences, [_id]: experience}
    },
    setListOfTags(state, {tags}){
        state.listOfTags = tags
    }
}
