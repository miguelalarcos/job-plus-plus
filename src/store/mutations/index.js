import { newError } from './errors'

export default {
    setLoading(state, {b}){
        state.loading = b
    },
    setNotifications(state, count){
        state.notifications = count
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
    candidateSavesObservation(state, {id, observations}){
        const item = {...state.myCandidatures[id], observations}
        state.myCandidatures = {...state.myCandidatures, [id]: item}
    },
    candidateSetsCandidature(state, {id, payload}) {
        const item = {...state.myCandidatures[id], ...payload}
        state.myCandidatures = {...state.myCandidatures, [id]: item}
    }
}
