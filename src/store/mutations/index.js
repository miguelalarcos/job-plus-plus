import moment from 'moment'
import { newError } from './errors'

export default {
    setNotifications(state, count){
        state.notifications = count
    },
    newError,
    appendMessage(state, {id, msg, candidature, owner}) {
        msg = {date: moment().unix(), id, candidature, owner, msg}
        state.messages = [...state.messages, msg]
    },
    setMessages(state, {messages}) {
        state.messages = [...messages]
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
